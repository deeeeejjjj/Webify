/* App shell: header, footer, phone tabs, Help panel, display settings, and the hash router. */
(function () {
  var ui = W.ui, s = W.store, icon = ui.icon, e = ui.esc;

  var NAV = [
    { href: '#/', key: 'home', label: 'Home', icon: 'home' },
    { href: '#/templates', key: 'templates', label: 'Templates', icon: 'grid' },
    { href: '#/creators', key: 'creators', label: 'Creators', icon: 'users' },
    { href: '#/advice', key: 'advice', label: 'Get Advice', icon: 'calendar' },
    { href: '#/check', key: 'check', label: 'Business Check', icon: 'gauge' },
    { href: '#/projects', key: 'projects', label: 'My Projects', icon: 'clipboard' }
  ];

  function logo(light) {
    return '<a class="logo" href="#/" aria-label="Webify home page"><img class="logo-mark" src="assets/logo-mark' + (light ? '-light' : '') + '.png" alt="" width="63" height="49"><img class="logo-word" src="assets/logo-word' + (light ? '-light' : '') + '.png" alt="" width="104" height="30"></a>';
  }

  function textButtons() {
    return [['1', 'A', 'Normal text size'], ['1.15', 'A+', 'Large text size'], ['1.3', 'A++', 'Largest text size']].map(function (o, i) {
      return '<button type="button" class="size-btn s' + i + '" data-text="' + o[0] + '" aria-label="' + o[2] + '">' + o[1] + '</button>';
    }).join('');
  }
  function settingsControls() {
    return '<div class="set-group" role="group" aria-label="Text size"><span class="set-label">Text size</span>' + textButtons() + '</div>' +
      '<button type="button" class="set-toggle" data-toggle="contrast" aria-pressed="false">' + icon('contrast', 20) + '<span>Clearer colors</span></button>' +
      '<button type="button" class="set-toggle" data-toggle="calm" aria-pressed="false">' + icon('pause', 20) + '<span>Stop movement</span></button>' +
      '<button type="button" class="set-toggle" data-speak aria-pressed="false">' + icon('volume', 20) + '<span>Read page aloud</span></button>';
  }

  ui.settingsControls = settingsControls; /* also shown on the Help Center page */

  function renderTop() {
    document.getElementById('site-top').innerHTML =
      '<header class="site-header" id="site-header"><div class="wrap head-inner">' + logo(false) +
      '<nav class="main-nav" aria-label="Main menu"><ul>' + NAV.map(function (n) { return '<li><a href="' + n.href + '" data-nav="' + n.key + '">' + n.label + '</a></li>'; }).join('') + '</ul></nav>' +
      '<div class="head-actions">' +
      '<a class="icon-btn" href="#/messages" aria-label="Messages" data-tip="Messages">' + icon('message', 24) + '<span class="count" data-count-msg hidden></span></a>' +
      '<a class="icon-btn" href="#/cart" aria-label="Cart" data-tip="Cart" data-cart-btn>' + icon('cart', 24) + '<span class="count" data-count-cart hidden></span></a>' +
      '<span data-account></span>' +
      '<button type="button" class="btn btn-ghost btn-sm menu-btn" data-open-menu aria-haspopup="dialog">' + icon('menu', 22) + '<span>Menu</span></button>' +
      '</div></div></header>';
    document.getElementById('site-footer').innerHTML = footer();
    document.getElementById('site-tabs').innerHTML = '<nav class="tabs" aria-label="Quick menu">' +
      [NAV[0], NAV[1], NAV[2], NAV[3]].map(function (n) { return '<a href="' + n.href + '" data-nav="' + n.key + '">' + icon(n.icon, 26) + '<span>' + (n.key === 'advice' ? 'Advice' : n.label) + '</span></a>'; }).join('') +
      '<button type="button" data-open-menu>' + icon('menu', 26) + '<span>Menu</span></button></nav>';
    var fab = document.createElement('button');
    fab.type = 'button'; fab.className = 'help-fab'; fab.setAttribute('aria-haspopup', 'dialog');
    fab.innerHTML = icon('help', 26) + '<span>Help</span>';
    fab.onclick = openHelp;
    document.body.appendChild(fab);
    var top = document.createElement('button');
    top.type = 'button'; top.className = 'to-top'; top.innerHTML = icon('arrowUp', 22) + '<span>Back to top</span>';
    top.onclick = function () { scrollTo({ top: 0, behavior: ui.calm() ? 'auto' : 'smooth' }); document.getElementById('main').focus({ preventScroll: true }); };
    document.body.appendChild(top);
  }

  function footer() {
    var col = function (title, links) {
      return '<div><h2 class="foot-h">' + title + '</h2><ul>' + links.map(function (l) { return '<li><a href="' + l[1] + '">' + l[0] + '</a></li>'; }).join('') + '</ul></div>';
    };
    return '<footer class="site-footer"><div class="foot-glow" aria-hidden="true"></div><div class="wrap foot-grid"><div class="foot-brand">' + logo(true) +
      '<p>Build. Grow. Scale. Your all-in-one digital service platform for Filipino small businesses.</p></div>' +
      col('Get Online', [['Templates', '#/templates'], ['Find a Creator', '#/creators'], ['Business Check', '#/check']]) +
      col('Get Help', [['Book an Adviser', '#/advice'], ['Help Center', '#/help'], ['What We Do Not Offer', '#/help?section=limits']]) +
      '<form class="foot-news" novalidate><h2 class="foot-h">Free tips by email</h2><p>One simple tip each month for growing your business.</p><div class="field"><label for="news-email">Your email address</label><div class="news-row"><input id="news-email" name="email" type="email" autocomplete="email" placeholder="name@example.com"><button class="btn btn-primary" type="submit">Sign Up</button></div></div></form>' +
      '</div><div class="wrap foot-base"><p>© 2026 Webify. Developed by Hexperts BSIT 3C.</p></div></footer>';
  }

  function sync() {
    var st = s.get(), root = document.documentElement, p = st.prefs;
    root.style.setProperty('--scale', p.text);
    root.classList.toggle('contrast', !!p.contrast);
    root.classList.toggle('calm', !!p.calm);
    document.querySelectorAll('[data-text]').forEach(function (b) { b.setAttribute('aria-pressed', String(+b.dataset.text === +p.text)); });
    document.querySelectorAll('[data-toggle]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(!!p[b.dataset.toggle]));
    });
    var setCount = function (sel, n) { document.querySelectorAll(sel).forEach(function (c) { c.textContent = n; c.hidden = !n; }); };
    setCount('[data-count-cart]', st.cart.length);
    var unread = Object.keys(st.threads).reduce(function (a, k) { return a + (st.threads[k].unread || 0); }, 0);
    setCount('[data-count-msg]', unread);
    document.querySelectorAll('[data-account]').forEach(function (a) {
      a.innerHTML = st.user
        ? '<a class="btn btn-ghost btn-sm acct" href="#/account">' + icon('user', 20) + '<span>' + e(st.user.name.split(' ')[0]) + '</span></a>'
        : '<a class="btn btn-primary btn-sm acct" href="#/signin">Sign In</a>';
    });
  }

  function openHelp() {
    var key = current.key, h = W.data.helpByRoute[key] || W.data.helpByRoute.default;
    ui.dialog({
      cls: 'drawer', title: 'How can we help?',
      html: '<section class="help-sec"><h3>' + e(h.title) + '</h3><ol class="steps-list">' + h.steps.map(function (t, i) { return '<li><span class="step-n">' + (i + 1) + '</span><span>' + e(t) + '</span></li>'; }).join('') + '</ol></section>' +
        '<section class="help-sec help-links"><a class="btn btn-primary btn-block" href="#/help">' + icon('book', 22) + '<span>Open the Help Center</span></a><a class="btn btn-ghost btn-block" href="#/advice">' + icon('calendar', 22) + '<span>Talk to an Adviser</span></a><a class="btn-link help-display" href="#/help?section=display">Change text size and colors</a></section>',
      onMount: function (d, api) { d.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', api.close); }); }
    });
  }
  function openMenu() {
    var st = s.get();
    ui.dialog({
      cls: 'drawer', title: 'Menu',
      html: '<nav aria-label="Full menu" class="menu-list">' + NAV.map(function (n) { return '<a href="' + n.href + '" data-nav="' + n.key + '">' + icon(n.icon, 26) + '<span>' + n.label + '</span>' + icon('chevronRight', 22) + '</a>'; }).join('') +
        '<a href="#/messages">' + icon('message', 26) + '<span>Messages</span>' + icon('chevronRight', 22) + '</a>' +
        '<a href="#/cart">' + icon('cart', 26) + '<span>Cart' + (st.cart.length ? ' (' + st.cart.length + ')' : '') + '</span>' + icon('chevronRight', 22) + '</a>' +
        '<a href="#/help">' + icon('help', 26) + '<span>Help Center</span>' + icon('chevronRight', 22) + '</a>' +
        '<a href="' + (st.user ? '#/account' : '#/signin') + '">' + icon('user', 26) + '<span>' + (st.user ? 'My Account' : 'Sign In') + '</span>' + icon('chevronRight', 22) + '</a></nav>' +
        '<section class="help-sec"><h3>Make this site easier to use</h3><div class="settings-stack">' + settingsControls() + '</div></section>',
      onMount: function (d, api) { sync(); d.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', api.close); }); }
    });
  }

  /* ---------- Router ---------- */
  var ROUTES = [
    [/^\/$/, 'home'], [/^\/templates$/, 'templates'], [/^\/cart$/, 'cart'],
    [/^\/creators$/, 'creators'], [/^\/creators\/(\w+)$/, 'creator'],
    [/^\/messages$/, 'messages'], [/^\/messages\/(\w+)$/, 'messages'],
    [/^\/advice$/, 'advice'], [/^\/check$/, 'check'], [/^\/projects$/, 'projects'],
    [/^\/help$/, 'help'], [/^\/signin$/, 'signin'], [/^\/account$/, 'account']
  ];
  var ACTIVE = { creator: 'creators', cart: 'templates' };
  var current = { key: 'home', cleanup: null }, firstLoad = true;

  function parse() {
    var raw = location.hash.replace(/^#/, '') || '/', parts = raw.split('?'), path = parts[0], query = {};
    (parts[1] || '').split('&').forEach(function (kv) { if (kv) { var p = kv.split('='); query[p[0]] = decodeURIComponent(p[1] || ''); } });
    return { path: path, query: query };
  }

  function route() {
    var loc = parse(), key = 'notfound', param = null;
    if (!/^\//.test(loc.path)) return; // in-page anchors such as the skip link
    for (var i = 0; i < ROUTES.length; i++) {
      var m = loc.path.match(ROUTES[i][0]);
      if (m) { key = ROUTES[i][1]; param = m[1]; break; }
    }
    if (typeof current.cleanup === 'function') current.cleanup();
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    setSpeaking(false);
    ui.currentThread = null;
    document.body.classList.toggle('in-chat', key === 'messages' && !!param);
    var page = W.pages[key] || W.pages.notfound, main = document.getElementById('main');
    main.innerHTML = '<div class="page">' + page.render(param, loc.query) + '</div>';
    document.title = page.title(param) + ' | Webify';
    current = { key: ACTIVE[key] || key, cleanup: page.mount ? page.mount(main, param, loc.query) : null };
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      var on = a.dataset.nav === current.key;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    sync();
    ui.animate(main);
    scrollTo(0, 0);
    if (!firstLoad) { var h = main.querySelector('h1'); (h || main).focus({ preventScroll: true }); }
    firstLoad = false;
  }

  function setSpeaking(on) {
    document.querySelectorAll('[data-speak]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(on));
      b.querySelector('span').textContent = on ? 'Stop reading' : 'Read page aloud';
    });
  }

  /* ---------- Global interactions ---------- */
  document.addEventListener('click', function (ev) {
    var t = ev.target.closest('button, a'); if (!t) return;
    if (t.matches('[data-open-menu]')) openMenu();
    else if (t.dataset.text) s.update(function (st) { st.prefs.text = +t.dataset.text; });
    else if (t.dataset.toggle) s.update(function (st) { st.prefs[t.dataset.toggle] = !st.prefs[t.dataset.toggle]; });
    else if (t.hasAttribute('data-speak')) {
      if (t.getAttribute('aria-pressed') === 'true') { speechSynthesis.cancel(); setSpeaking(false); }
      else if (ui.speak(function () { setSpeaking(false); })) setSpeaking(true);
    }
  });
  document.addEventListener('submit', function (ev) {
    if (!ev.target.matches('.foot-news')) return;
    ev.preventDefault();
    var input = ev.target.email;
    if (ui.required(ev.target, [['email', 'Please type your email address.', /.+@.+\..+/, 'That email looks incomplete. It should look like name@example.com.']])) {
      ui.toast('Thank you! You are signed up for our tips.'); input.value = '';
    }
  });
  document.querySelector('.skip-link').addEventListener('click', function (ev) {
    ev.preventDefault(); document.getElementById('main').focus();
  });
  addEventListener('scroll', function () {
    if (!document.getElementById('site-header')) return; /* still loading */
    var h = document.documentElement, max = h.scrollHeight - innerHeight;
    document.getElementById('scroll-progress').style.transform = 'scaleX(' + (max > 0 ? scrollY / max : 0) + ')';
    document.getElementById('site-header').classList.toggle('stuck', scrollY > 12);
    document.querySelector('.to-top').classList.toggle('show', scrollY > 900);
  }, { passive: true });

  /* Follow the device's reduced-motion setting on first visit. */
  if (matchMedia('(prefers-reduced-motion: reduce)').matches && !s.get().prefs.calmSet) {
    s.update(function (st) { st.prefs.calm = true; st.prefs.calmSet = true; });
  }

  /* Shown when the JSON files cannot load, most often because index.html was opened by double-click. */
  function showLoadError() {
    var fromFile = location.protocol === 'file:';
    document.getElementById('main').innerHTML = '<div class="wrap page-pad narrow"><div class="empty"><span class="icon-tile">' + icon('help', 34) + '</span>' +
      (fromFile
        ? '<h1>Webify needs to be started first</h1><p>Please open the webify folder in VS Code, then right-click <b>index.html</b> and choose <b>Open with Live Server</b>.</p>'
        : '<h1>We could not load this page</h1><p>Please check that the site is still running, then try again.</p><button class="btn btn-primary" type="button" id="reload">Try Again</button>') +
      '</div></div>';
    var again = document.getElementById('reload');
    if (again) again.onclick = function () { location.reload(); };
  }

  W.dataReady.then(function () {
    renderTop();
    ui.initEffects();
    s.on(sync);
    sync();
    addEventListener('hashchange', route);
    route();
  }, showLoadError);
})();
