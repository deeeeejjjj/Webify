/* Shared helpers: escaping, icons, dialogs, toasts, and the motion effects. */
W.ui = (function () {
  var ui = {};
  ui.currentThread = null;

  ui.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  ui.icon = function (name, size) {
    var s = size || 24;
    return '<svg class="ic" width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (W.icons[name] || '') + '</svg>';
  };
  ui.money = function (n) { return '₱' + Number(n).toLocaleString('en-PH'); };
  ui.calm = function () { return document.documentElement.classList.contains('calm'); };
  ui.initials = function (name) { return name.split(' ').map(function (p) { return p[0]; }).slice(0, 2).join(''); };
  ui.avatar = function (p, cls) {
    return '<span class="avatar ' + (cls || '') + '" style="--h:' + p.hue + '" aria-hidden="true">' + ui.esc(ui.initials(p.name)) + '</span>';
  };
  ui.stars = function (r) {
    return '<span class="stars" aria-label="Rated ' + r.toFixed(1) + ' out of 5">' + ui.icon('star', 18) + '<b>' + r.toFixed(1) + '</b></span>';
  };
  ui.date = function (iso, opts) {
    var p = iso.split('-');
    return new Date(+p[0], +p[1] - 1, +p[2]).toLocaleDateString('en-PH', opts || { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };
  ui.back = function (href, label) {
    return '<a class="back-link" href="' + href + '">' + ui.icon('arrowLeft', 22) + '<span>' + ui.esc(label) + '</span></a>';
  };
  ui.head = function (eyebrow, title, sub) {
    return '<header class="page-head" data-reveal><span class="eyebrow">' + ui.esc(eyebrow) + '</span><h1 tabindex="-1">' + title + '</h1>' + (sub ? '<p class="lead">' + sub + '</p>' : '') + '</header>';
  };

  /* Toast: stays on screen for a long while, because many readers need more than 2 seconds. */
  ui.toast = function (msg, opts) {
    opts = opts || {};
    var box = document.getElementById('toasts'), el = document.createElement('div'), openDlg = document.querySelector('dialog[open]');
    /* An open dialog sits in the top layer, so the message must live inside it to be seen. */
    (openDlg || document.body).appendChild(box);
    el.className = 'toast ' + (opts.kind || '');
    el.innerHTML = ui.icon(opts.kind === 'info' ? 'help' : 'checkCircle', 26) + '<span>' + ui.esc(msg) + '</span>' +
      (opts.action ? '<a class="toast-act" href="' + opts.action.href + '">' + ui.esc(opts.action.label) + '</a>' : '') +
      '<button class="toast-x" aria-label="Close this message">' + ui.icon('x', 20) + '</button>';
    box.appendChild(el);
    var gone = function () { el.classList.add('out'); setTimeout(function () { el.remove(); }, 300); };
    el.querySelector('.toast-x').onclick = gone;
    var link = el.querySelector('.toast-act'); if (link) link.addEventListener('click', gone);
    setTimeout(gone, opts.ms || 7000);
  };

  /* Dialogs use the native <dialog>: it handles the focus trap, Escape key, and top layer for us. */
  ui.dialog = function (o) {
    var d = document.createElement('dialog');
    d.className = 'dlg ' + (o.cls || '');
    d.setAttribute('aria-labelledby', 'dlg-title');
    d.innerHTML = '<div class="dlg-head"><h2 id="dlg-title">' + o.title + '</h2><button class="btn btn-ghost btn-sm dlg-close" type="button">' + ui.icon('x', 20) + '<span>Close</span></button></div><div class="dlg-body">' + o.html + '</div>';
    document.body.appendChild(d);
    var closed = false;
    var api = {
      el: d,
      setTitle: function (t) { d.querySelector('#dlg-title').textContent = t; },
      close: function () {
        if (closed) return; closed = true;
        d.classList.add('closing');
        setTimeout(function () { var box = document.getElementById('toasts'); if (d.contains(box)) document.body.appendChild(box); d.close(); d.remove(); if (o.onClose) o.onClose(); }, ui.calm() ? 0 : 200);
      }
    };
    d.querySelector('.dlg-close').onclick = api.close;
    d.addEventListener('cancel', function (e) { e.preventDefault(); api.close(); });
    d.addEventListener('click', function (e) { if (e.target === d) api.close(); });
    d.showModal();
    if (o.onMount) o.onMount(d, api);
    return api;
  };

  ui.fieldError = function (input, msg) {
    var wrap = input.closest('.field'), err = wrap.querySelector('.field-err');
    if (!err) { err = document.createElement('p'); err.className = 'field-err'; err.id = 'err-' + input.id; wrap.appendChild(err); }
    err.innerHTML = msg ? ui.icon('help', 20) + '<span>' + ui.esc(msg) + '</span>' : '';
    err.hidden = !msg;
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (msg) input.setAttribute('aria-describedby', err.id); else input.removeAttribute('aria-describedby');
    return !msg;
  };
  ui.required = function (form, rules) {
    var ok = true, first = null;
    rules.forEach(function (r) {
      var el = form.querySelector('[name="' + r[0] + '"]'), v = el.value.trim();
      var msg = !v ? r[1] : (r[2] && !r[2].test(v) ? r[3] : '');
      if (!ui.fieldError(el, msg)) { ok = false; first = first || el; }
    });
    if (first) first.focus();
    return ok;
  };

  /* ---------- Motion ---------- */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); runCount(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }) : null;

  function runCount(root) {
    var els = root.matches && root.matches('[data-count]') ? [root] : [].slice.call(root.querySelectorAll ? root.querySelectorAll('[data-count]') : []);
    els.forEach(function (el) {
      var to = +el.dataset.count, pre = el.dataset.pre || '', suf = el.dataset.suf || '';
      if (el.dataset.done) return; el.dataset.done = 1;
      if (ui.calm()) { el.textContent = pre + to.toLocaleString() + suf; return; }
      var start = performance.now(), dur = 1300;
      (function step(now) {
        var t = Math.min(1, (now - start) / dur), e = 1 - Math.pow(1 - t, 3);
        el.textContent = pre + Math.round(to * e).toLocaleString() + suf;
        if (t < 1) requestAnimationFrame(step);
      })(start);
    });
  }

  /* Elements with data-reveal rise into view; children of a data-stagger parent follow one by one. */
  ui.animate = function (root) {
    root = root || document;
    root.querySelectorAll('[data-stagger]').forEach(function (g) {
      [].forEach.call(g.children, function (c, i) { c.setAttribute('data-reveal', ''); c.style.setProperty('--d', Math.min(i, 8) * 70 + 'ms'); });
    });
    root.querySelectorAll('[data-reveal], [data-count], [data-draw]').forEach(function (el) {
      if (!io || ui.calm()) { el.classList.add('in'); runCount(el); }
      else io.observe(el);
    });
  };

  ui.confetti = function () {
    if (ui.calm()) return;
    var c = document.createElement('canvas'), x = c.getContext('2d');
    c.className = 'confetti'; c.width = innerWidth; c.height = innerHeight;
    (document.querySelector('dialog[open]') || document.body).appendChild(c);
    var colors = ['#2563EB', '#8B5CF6', '#34D399', '#0A0F2D', '#60A5FA'];
    var ps = []; for (var i = 0; i < 110; i++) ps.push({ x: innerWidth / 2 + (Math.random() - .5) * 240, y: innerHeight * .42, vx: (Math.random() - .5) * 12, vy: -Math.random() * 13 - 3, s: Math.random() * 7 + 5, r: Math.random() * 6, vr: (Math.random() - .5) * .3, c: colors[i % 5] });
    var start = performance.now();
    (function frame(now) {
      var t = now - start;
      x.clearRect(0, 0, c.width, c.height);
      x.globalAlpha = Math.max(0, 1 - t / 2000);
      ps.forEach(function (p) { p.vy += .3; p.x += p.vx; p.y += p.vy; p.r += p.vr; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * .6); x.restore(); });
      if (t < 2000) requestAnimationFrame(frame); else c.remove();
    })(start);
  };

  /* Reusable pointer effects, wired once for the entire document. */
  ui.initEffects = function () {
    document.addEventListener('pointerdown', function (e) {
      var b = e.target.closest('.btn'); if (!b || ui.calm()) return;
      var r = b.getBoundingClientRect(), s = document.createElement('span');
      s.className = 'ripple'; s.style.left = e.clientX - r.left + 'px'; s.style.top = e.clientY - r.top + 'px';
      b.appendChild(s); setTimeout(function () { s.remove(); }, 650);
    });
    document.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      var c = e.target.closest && e.target.closest('[data-spot]'); if (!c) return;
      var r = c.getBoundingClientRect();
      c.style.setProperty('--mx', e.clientX - r.left + 'px');
      c.style.setProperty('--my', e.clientY - r.top + 'px');
    }, { passive: true });
  };

  /* Read the current page aloud with the browser's built-in voice. */
  ui.speak = function (onEnd) {
    if (!('speechSynthesis' in window)) { ui.toast('Your browser cannot read pages aloud.', { kind: 'info' }); return false; }
    speechSynthesis.cancel();
    var main = document.getElementById('main');
    var text = [].map.call(main.querySelectorAll('h1,h2,h3,p,li'), function (n) { return n.offsetParent ? n.textContent.trim() : ''; }).filter(Boolean).join('. ').slice(0, 3000);
    var u = new SpeechSynthesisUtterance(text);
    u.rate = .92; u.lang = 'en-PH'; u.onend = onEnd; u.onerror = onEnd;
    speechSynthesis.speak(u);
    return true;
  };

  /* Cart actions are shared by the marketplace, preview, and assessment results. */
  ui.addToCart = function (id) {
    var st = W.store.get(), t = W.data.templates.find(function (x) { return x.id === id; });
    if (st.cart.indexOf(id) > -1) { ui.toast(t.name + ' is already in your cart.', { kind: 'info', action: { href: '#/cart', label: 'View Cart' } }); return; }
    W.store.update(function (s) { s.cart.push(id); });
    document.querySelectorAll('[data-cart-btn]').forEach(function (b) { b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); });
    ui.toast(t.name + ' was added to your cart.', { action: { href: '#/cart', label: 'View Cart' } });
  };

  return ui;
})();
