/* Creator Match: searchable verified profiles and portfolio galleries. */
W.pages = W.pages || {};
(function () {
  var ui = W.ui, icon = ui.icon, e = ui.esc, d = W.data;
  var badge = function (c) { return c.verified ? '<span class="verified">' + icon('shield', 18) + '<span>Verified</span></span>' : ''; };

  function art(c, i, title) {
    var h = c.hue + i * 28, shapes = [
      '<circle cx="300" cy="50" r="110" fill="#fff" opacity=".14"/><rect x="40" y="130" width="170" height="16" rx="8" fill="#fff" opacity=".85"/><rect x="40" y="158" width="110" height="12" rx="6" fill="#fff" opacity=".55"/>',
      '<rect x="36" y="36" width="130" height="150" rx="14" fill="#fff" opacity=".2"/><rect x="186" y="36" width="130" height="70" rx="14" fill="#fff" opacity=".3"/><rect x="186" y="116" width="130" height="70" rx="14" fill="#fff" opacity=".14"/>',
      '<circle cx="176" cy="110" r="70" fill="#fff" opacity=".2"/><circle cx="176" cy="110" r="36" fill="#fff" opacity=".4"/>',
      '<path d="M0 170C60 120 110 190 180 130s120-30 170-80v180H0z" fill="#fff" opacity=".22"/><rect x="40" y="44" width="120" height="16" rx="8" fill="#fff" opacity=".8"/>'
    ][i % 4];
    return '<svg viewBox="0 0 352 220" role="img" aria-label="' + e(title) + '"><defs><linearGradient id="pa' + c.id + i + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(' + h + ',72%,42%)"/><stop offset="1" stop-color="hsl(' + (h + 48) + ',76%,58%)"/></linearGradient></defs><rect width="352" height="220" fill="url(#pa' + c.id + i + ')"/>' + shapes + '</svg>';
  }

  function card(c) {
    return '<article class="cr-card" data-spot><div class="cr-top">' + ui.avatar(c, 'lg') + '<div><h3><a href="#/creators/' + c.id + '">' + e(c.name) + '</a></h3><p class="muted">' + e(c.role) + '</p>' + badge(c) + '</div></div>' +
      '<p class="cr-bio">' + e(c.bio) + '</p>' +
      '<ul class="cr-facts"><li>' + icon('pin', 20) + '<span>' + e(c.city) + '</span></li><li>' + ui.stars(c.rating) + '<span>' + c.jobs + ' jobs done</span></li><li>' + icon('clock', 20) + '<span>' + e(c.rate) + '</span></li></ul>' +
      '<div class="cr-skills">' + c.skills.map(function (s) { return '<span class="tag">' + e(s) + '</span>'; }).join('') + '</div>' +
      '<div class="tpl-btns"><a class="btn btn-ghost btn-sm" href="#/creators/' + c.id + '">' + icon('user', 20) + '<span>View Profile</span></a><a class="btn btn-primary btn-sm" href="#/messages/' + c.id + '">' + icon('message', 20) + '<span>Send Message</span></a></div></article>';
  }

  W.pages.creators = {
    title: function () { return 'Creators'; },
    render: function () {
      return '<div class="wrap page-pad">' + ui.head('Local talent', 'Find a trusted creator', 'Hire a Filipino web developer or designer to do the work for you. Saying hello is free.') +
        '<div class="filters two" data-reveal><div class="field search-field"><label for="cq">Search by name, skill, or city</label><div class="input-icon">' + icon('search', 24) + '<input id="cq" type="search" placeholder="Example: logo, Cebu" autocomplete="off"></div></div>' +
        '<label class="switch"><input type="checkbox" id="only-v"><span class="switch-ui" aria-hidden="true"></span><span>Show Verified creators only</span></label></div>' +
        '<div class="chip-row" role="group" aria-label="Choose a skill" data-reveal><button type="button" class="chip" data-skill="" aria-pressed="true">All Skills</button>' + d.skills.map(function (s) { return '<button type="button" class="chip" data-skill="' + e(s) + '" aria-pressed="false">' + e(s) + '</button>'; }).join('') + '</div>' +
        '<p id="ccount" aria-live="polite" class="result-count"></p><div class="cr-grid" id="cgrid"></div></div>';
    },
    mount: function (root) {
      var f = { q: '', skill: '', verified: false }, grid = root.querySelector('#cgrid'), token = 0, timer;
      function load() {
        var mine = ++token;
        root.querySelectorAll('[data-skill]').forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.skill === f.skill)); });
        W.api.listCreators(f).then(function (list) {
          if (mine !== token) return;
          root.querySelector('#ccount').textContent = list.length === 1 ? 'Showing 1 creator' : 'Showing ' + list.length + ' creators';
          grid.innerHTML = list.length ? list.map(card).join('') : '<div class="empty"><span class="icon-tile">' + icon('search', 34) + '</span><h3>No creators match your choices</h3><p>Try a different word or choose All Skills.</p></div>';
          grid.classList.remove('fresh'); void grid.offsetWidth; grid.classList.add('fresh');
        });
      }
      var q = root.querySelector('#cq');
      q.oninput = function () { clearTimeout(timer); timer = setTimeout(function () { f.q = q.value; load(); }, 220); };
      root.querySelector('#only-v').onchange = function (ev) { f.verified = ev.target.checked; load(); };
      root.querySelectorAll('[data-skill]').forEach(function (c) { c.onclick = function () { f.skill = c.dataset.skill; load(); }; });
      grid.innerHTML = '<div class="skel"></div><div class="skel"></div><div class="skel"></div>';
      load();
      return function () { clearTimeout(timer); };
    }
  };

  W.pages.creator = {
    title: function (id) { var c = d.creators.find(function (x) { return x.id === id; }); return c ? c.name : 'Creator'; },
    render: function (id) {
      var c = d.creators.find(function (x) { return x.id === id; });
      if (!c) return W.pages.notfound.render();
      return '<div class="wrap page-pad">' + ui.back('#/creators', 'Back to All Creators') +
        '<section class="profile-hero" data-reveal><div class="horizon" aria-hidden="true"></div>' + ui.avatar(c, 'xl') + '<div class="profile-main"><h1 tabindex="-1">' + e(c.name) + '</h1><p>' + e(c.role) + ' · ' + e(c.city) + '</p>' + badge(c) + '</div>' +
        '<a class="btn btn-light btn-lg" href="#/messages/' + c.id + '">' + icon('message', 24) + '<span>Send Message</span></a></section>' +
        '<ul class="stat-row" data-stagger><li><b data-count="' + c.jobs + '">0</b><span>Jobs finished</span></li><li><b>' + c.rating.toFixed(1) + '</b><span>Star rating</span></li><li><b data-count="' + c.years + '">0</b><span>Years of experience</span></li><li><b>' + e(c.rate) + '</b><span>Hourly rate</span></li></ul>' +
        '<div class="profile-cols"><section data-reveal><h2>About ' + e(c.name.split(' ')[0]) + '</h2><p class="lead-sm">' + e(c.bio) + '</p><p class="reply-note">' + icon('clock', 22) + '<span>' + e(c.replyTime) + '</span></p></section>' +
        '<section data-reveal><h2>Skills</h2><div class="cr-skills">' + c.skills.map(function (s) { return '<span class="tag lg">' + e(s) + '</span>'; }).join('') + '</div></section></div>' +
        '<section class="section-sm"><h2 data-reveal>Past work</h2><p class="muted" data-reveal>Press a picture to see it larger.</p><div class="gallery" data-stagger>' + c.portfolio.map(function (p, i) { return '<button type="button" class="gal-item" data-gal="' + i + '">' + art(c, i, p) + '<span>' + e(p) + '</span></button>'; }).join('') + '</div></section></div>';
    },
    mount: function (root, id) {
      var c = d.creators.find(function (x) { return x.id === id; }); if (!c) return;
      root.querySelectorAll('[data-gal]').forEach(function (b) {
        b.onclick = function () {
          var i = +b.dataset.gal;
          ui.dialog({ title: e(c.portfolio[i]), cls: 'dlg-gal', html: '<div class="lightbox">' + art(c, i, c.portfolio[i]) + '</div><p class="muted">Made by ' + e(c.name) + '</p>' });
        };
      });
    }
  };
})();
