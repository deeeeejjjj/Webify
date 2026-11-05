/* Digital Products Marketplace: search, filters, live preview, customization requests, cart, and checkout. */
W.pages = W.pages || {};
(function () {
  var ui = W.ui, icon = ui.icon, e = ui.esc, d = W.data;
  var sectorName = function (id) { return d.sectors.find(function (s) { return s.id === id; }).name; };
  var typeOne = function (id) { return d.types.find(function (t) { return t.id === id; }).one; };

  W.tplCard = function (t) {
    return '<article class="tpl-card" data-spot><button class="tpl-thumb" type="button" data-preview="' + t.id + '" aria-label="Preview ' + e(t.name) + '">' + W.preview.thumb(t) + '<span class="tpl-over">' + icon('eye', 22) + ' Preview</span></button>' +
      '<div class="tpl-body"><div class="tpl-meta"><span class="tag">' + e(typeOne(t.type)) + '</span>' + ui.stars(t.rating) + '</div><h3>' + e(t.name) + '</h3><p class="muted">' + e(sectorName(t.sector)) + '</p>' +
      '<div class="tpl-foot"><b class="price">' + ui.money(t.price) + '</b><span class="muted small">one-time</span></div>' +
      '<div class="tpl-btns"><button class="btn btn-ghost btn-sm" type="button" data-preview="' + t.id + '">' + icon('eye', 20) + '<span>Preview</span></button><button class="btn btn-primary btn-sm" type="button" data-add="' + t.id + '">' + icon('cart', 20) + '<span>Add to Cart</span></button></div></div></article>';
  };

  /* Preview window with real device sizes, plus the customization request form. */
  W.openPreview = function (id) {
    var t = d.templates.find(function (x) { return x.id === id; }), sizes = W.preview.sizes(t);
    ui.dialog({
      cls: 'dlg-wide', title: e(t.name),
      html: '<div class="pv"><div class="pv-main"><div class="seg" role="group" aria-label="Choose a screen size">' + sizes.map(function (s, i) { return '<button type="button" class="seg-btn" data-size="' + s.id + '" aria-pressed="' + (i === 0) + '">' + icon(s.icon, 20) + '<span>' + s.label + '</span></button>'; }).join('') + '</div>' +
        '<div class="pv-stage" id="pv-stage"><div class="pv-device" id="pv-device"><iframe title="Live preview of ' + e(t.name) + '" sandbox="allow-same-origin"></iframe></div></div></div>' +
        '<aside class="pv-side" id="pv-side"></aside></div>',
      onMount: function (dlg, api) {
        var stage = dlg.querySelector('#pv-stage'), dev = dlg.querySelector('#pv-device'), frame = dlg.querySelector('iframe'), side = dlg.querySelector('#pv-side'), cur = sizes[0];
        frame.srcdoc = W.preview.page(t);
        function fit() {
          var sw = stage.clientWidth - 16, sh = Math.max(stage.clientHeight - 16, 280), k = Math.min(1, sw / cur.w, sh / cur.h);
          dev.style.width = cur.w + 'px'; dev.style.height = cur.h + 'px'; dev.style.transform = 'scale(' + k + ')';
          dev.style.marginLeft = Math.max(0, (sw - cur.w * k) / 2) + 'px';
          dev.style.marginBottom = -(cur.h * (1 - k)) + 'px';
        }
        fit(); requestAnimationFrame(fit);
        var ro = new ResizeObserver(fit); ro.observe(stage);
        dlg.addEventListener('close', function () { ro.disconnect(); });
        dlg.querySelectorAll('[data-size]').forEach(function (b) {
          b.onclick = function () {
            cur = sizes.find(function (s) { return s.id === b.dataset.size; });
            dlg.querySelectorAll('[data-size]').forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
            fit();
          };
        });
        function details() {
          side.innerHTML = '<div class="tpl-meta"><span class="tag">' + e(typeOne(t.type)) + '</span>' + ui.stars(t.rating) + '</div><p class="muted">For ' + e(sectorName(t.sector)) + '</p><p>' + e(t.desc) + '</p><p class="price big">' + ui.money(t.price) + ' <small class="muted">one-time</small></p>' +
            '<ul class="ticks">' + ['Yours to use with no monthly fee', 'Add your own name, photos, and prices', 'Step-by-step guide included'].map(function (x) { return '<li>' + icon('check', 20) + '<span>' + x + '</span></li>'; }).join('') + '</ul>' +
            '<button class="btn btn-primary btn-block" type="button" id="pv-add">' + icon('cart', 22) + '<span>Add to Cart</span></button><button class="btn btn-ghost btn-block" type="button" id="pv-req">' + icon('pen', 22) + '<span>Ask Someone to Change It for Me</span></button>' +
            '<details class="pv-credits"><summary>About these sample photos</summary><p>These show how the design looks. Replace them with your own photos. They come from Wikimedia Commons:</p><ul>' + W.photos.credits(t).map(function (c) { return '<li><a href="' + c.href + '" target="_blank" rel="noopener">' + e(c.title) + '</a> by ' + e(c.author) + ', ' + e(c.license) + '</li>'; }).join('') + '</ul></details>';
          side.querySelector('#pv-add').onclick = function () { ui.addToCart(t.id); };
          side.querySelector('#pv-req').onclick = requestForm;
        }
        function requestForm() {
          var u = W.store.get().user;
          side.innerHTML = '<h3>Tell us what to change</h3><p class="muted">A verified creator will do this for you. You will see the progress under My Projects.</p><form id="req" novalidate>' +
            '<div class="field"><label for="r-biz">Your business name</label><input id="r-biz" name="business" autocomplete="organization" value="' + e(u && u.business || '') + '"></div>' +
            '<div class="field"><label for="r-chg">What should be changed?</label><textarea id="r-chg" name="changes" rows="4" placeholder="Example: Please use my photos and add my phone number."></textarea></div>' +
            '<button class="btn btn-primary btn-block" type="submit">' + icon('send', 22) + '<span>Send My Request</span></button><button class="btn btn-ghost btn-block" type="button" id="req-back">' + icon('arrowLeft', 22) + '<span>Go Back</span></button></form>';
          side.querySelector('#req-back').onclick = details;
          side.querySelector('#r-biz').focus();
          side.querySelector('#req').onsubmit = function (ev) {
            ev.preventDefault();
            var f = ev.target;
            if (!ui.required(f, [['business', 'Please type your business name.'], ['changes', 'Please tell us what to change. A short sentence is fine.']])) return;
            W.api.createRequest(t, { business: f.business.value.trim(), changes: f.changes.value.trim() }).then(function () {
              side.innerHTML = '<div class="done-box"><span class="done-check">' + icon('check', 40) + '</span><h3>Request sent!</h3><p>We will match you with a creator within 2 days. You can follow it under My Projects.</p><a class="btn btn-primary btn-block" href="#/projects"><span>Go to My Projects</span>' + icon('arrowRight', 22) + '</a></div>';
              side.querySelector('a').addEventListener('click', api.close);
              ui.confetti();
            });
          };
        }
        details();
      }
    });
  };

  /* Clicks on any Preview or Add button, wherever a template card appears. */
  document.addEventListener('click', function (ev) {
    var p = ev.target.closest('[data-preview]'); if (p) { W.openPreview(p.dataset.preview); return; }
    var a = ev.target.closest('[data-add]'); if (a) ui.addToCart(a.dataset.add);
  });

  W.pages.templates = {
    title: function () { return 'Templates'; },
    render: function () {
      return '<div class="wrap page-pad">' + ui.head('Digital products', 'Find the right design for your business', 'Ready-made websites, app designs, banners, and ads. Pay once and make it yours.') +
        '<div class="filters" data-reveal><div class="field search-field"><label for="q">Search by word</label><div class="input-icon">' + icon('search', 24) + '<input id="q" type="search" placeholder="Example: food, salon, banner" autocomplete="off"></div></div>' +
        '<div class="field"><label for="sector">Your type of business</label><select id="sector"><option value="">All businesses</option>' + d.sectors.map(function (s) { return '<option value="' + s.id + '">' + e(s.name) + '</option>'; }).join('') + '</select></div>' +
        '<div class="field"><label for="sort">Show first</label><select id="sort"><option value="popular">Most popular</option><option value="low">Lowest price</option><option value="high">Highest price</option><option value="rated">Highest rated</option></select></div></div>' +
        '<div class="chip-row" role="group" aria-label="Choose a product type" data-reveal><button type="button" class="chip" data-type="" aria-pressed="true">All Products</button>' + d.types.map(function (t) { return '<button type="button" class="chip" data-type="' + t.id + '" aria-pressed="false">' + icon(t.icon, 20) + '<span>' + e(t.name) + '</span></button>'; }).join('') + '</div>' +
        '<div class="result-bar"><p id="count" aria-live="polite" class="result-count"></p><button type="button" class="btn-link" id="clear" hidden>' + icon('x', 20) + '<span>Clear my choices</span></button></div>' +
        '<div class="tpl-grid" id="grid"></div></div>';
    },
    mount: function (root, _, query) {
      var f = { q: '', sector: query.sector || '', type: query.type || '', sort: 'popular' }, grid = root.querySelector('#grid'), token = 0;
      var qEl = root.querySelector('#q'), secEl = root.querySelector('#sector'), sortEl = root.querySelector('#sort'), clr = root.querySelector('#clear');
      secEl.value = f.sector;
      function skeleton() { grid.innerHTML = new Array(6).join('<div class="skel"></div>') + '<div class="skel"></div>'; }
      function load() {
        var mine = ++token;
        root.querySelectorAll('[data-type]').forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.type === f.type)); });
        clr.hidden = !(f.q || f.sector || f.type);
        W.api.listTemplates(f).then(function (list) {
          if (mine !== token) return;
          root.querySelector('#count').textContent = list.length === 1 ? 'Showing 1 design' : 'Showing ' + list.length + ' designs';
          grid.innerHTML = list.length ? list.map(W.tplCard).join('') :
            '<div class="empty"><span class="icon-tile">' + icon('search', 34) + '</span><h3>No designs match your choices</h3><p>Try a different word, or show all designs again.</p><button class="btn btn-primary" type="button" id="reset">Show All Designs</button></div>';
          grid.classList.remove('fresh'); void grid.offsetWidth; grid.classList.add('fresh');
          var r = grid.querySelector('#reset'); if (r) r.onclick = reset;
        });
      }
      function reset() { f.q = ''; f.sector = ''; f.type = ''; qEl.value = ''; secEl.value = ''; load(); }
      var timer;
      qEl.oninput = function () { clearTimeout(timer); timer = setTimeout(function () { f.q = qEl.value; load(); }, 220); };
      secEl.onchange = function () { f.sector = secEl.value; load(); };
      sortEl.onchange = function () { f.sort = sortEl.value; load(); };
      clr.onclick = reset;
      root.querySelectorAll('[data-type]').forEach(function (c) { c.onclick = function () { f.type = c.dataset.type; load(); }; });
      skeleton(); load();
      return function () { clearTimeout(timer); };
    }
  };

  /* ---------- Cart and checkout ---------- */
  W.pages.cart = {
    title: function () { return 'Cart'; },
    render: function () { return '<div class="wrap page-pad narrow">' + ui.back('#/templates', 'Back to Templates') + ui.head('Your cart', 'Review your cart') + '<div id="cart-body"></div></div>'; },
    mount: function (root) {
      var box = root.querySelector('#cart-body');
      function draw() {
        var ids = W.store.get().cart, items = ids.map(function (id) { return d.templates.find(function (t) { return t.id === id; }); });
        if (!items.length) {
          box.innerHTML = '<div class="empty"><span class="icon-tile">' + icon('cart', 34) + '</span><h3>Your cart is empty</h3><p>When you add a design, you will see it here.</p><a class="btn btn-primary" href="#/templates"><span>See Templates</span>' + icon('arrowRight', 22) + '</a></div>';
          return;
        }
        var total = items.reduce(function (a, t) { return a + t.price; }, 0);
        box.innerHTML = '<div class="cart-layout"><ul class="cart-list">' + items.map(function (t) {
          return '<li class="cart-item"><div class="cart-thumb">' + W.preview.thumb(t) + '</div><div class="cart-info"><h3>' + e(t.name) + '</h3><p class="muted">' + e(typeOne(t.type)) + ' for ' + e(sectorName(t.sector)) + '</p><b class="price">' + ui.money(t.price) + '</b></div><button class="btn btn-ghost btn-sm" type="button" data-rm="' + t.id + '">' + icon('trash', 20) + '<span>Remove</span></button></li>';
        }).join('') + '</ul>' +
          '<form class="card checkout" id="pay" novalidate><h2>Finish your order</h2><fieldset class="pay-opts"><legend>How would you like to pay?</legend>' +
          [['GCash', 'Pay with your GCash app'], ['Maya', 'Pay with your Maya app'], ['Bank transfer', 'Send from your bank'], ['Over the counter', 'Pay at a payment center']].map(function (m, i) {
            return '<label class="radio-card"><input type="radio" name="method" value="' + m[0] + '"' + (i === 0 ? ' checked' : '') + '><span><b>' + m[0] + '</b><small>' + m[1] + '</small></span></label>';
          }).join('') + '</fieldset>' +
          '<dl class="totals"><div><dt>Number of items</dt><dd>' + items.length + '</dd></div><div class="grand"><dt>Total to pay</dt><dd>' + ui.money(total) + '</dd></div></dl>' +
          '<button class="btn btn-primary btn-block btn-lg" type="submit">' + icon('checkCircle', 24) + '<span>Confirm My Order</span></button><p class="sample-note">This is a preview, so no real payment will be made.</p></form></div>';
        box.querySelectorAll('[data-rm]').forEach(function (b) {
          b.onclick = function () {
            var t = d.templates.find(function (x) { return x.id === b.dataset.rm; });
            W.store.update(function (st) { st.cart = st.cart.filter(function (id) { return id !== t.id; }); });
            ui.toast(t.name + ' was removed from your cart.', { kind: 'info' });
            draw();
          };
        });
        box.querySelector('#pay').onsubmit = function (ev) {
          ev.preventDefault();
          W.api.checkout(ev.target.method.value).then(function () {
            box.innerHTML = '<div class="empty success"><span class="done-check">' + icon('check', 44) + '</span><h3>Thank you! Your order is complete.</h3><p>Your designs are now saved under My Projects, in the section called My Designs.</p><a class="btn btn-primary btn-lg" href="#/projects?tab=designs"><span>See My Designs</span>' + icon('arrowRight', 22) + '</a></div>';
            ui.confetti();
          });
        };
      }
      draw();
    }
  };
})();
