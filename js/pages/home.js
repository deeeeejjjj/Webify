W.pages = W.pages || {};
W.pages.home = (function () {
  var ui = W.ui, icon = ui.icon, e = ui.esc, d = W.data;

  var ROCKET = '<svg viewBox="0 0 200 320" class="rocket-svg" aria-hidden="true"><defs>' +
    '<linearGradient id="rb" x1="0" x2="1"><stop offset="0" stop-color="#fff"/><stop offset=".65" stop-color="#EAF0FF"/><stop offset="1" stop-color="#B9C8F5"/></linearGradient>' +
    '<linearGradient id="rf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2563EB"/><stop offset="1" stop-color="#8B5CF6"/></linearGradient>' +
    '<linearGradient id="rn" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#34D399"/><stop offset="1" stop-color="#2563EB"/></linearGradient>' +
    '<linearGradient id="rfl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#34D399"/><stop offset=".55" stop-color="#60A5FA"/><stop offset="1" stop-color="#8B5CF6" stop-opacity="0"/></linearGradient></defs>' +
    '<path class="flame" d="M82 232c-3 34 10 56 18 78 8-22 21-44 18-78z" fill="url(#rfl)"/>' +
    '<path d="M58 150 22 204c-5 8-2 20 8 20l34-8z" fill="url(#rf)"/><path d="m142 150 36 54c5 8 2 20-8 20l-34-8z" fill="url(#rf)"/>' +
    '<path d="M100 8c34 28 50 72 50 118 0 40-8 74-16 104H66c-8-30-16-64-16-104C50 80 66 36 100 8z" fill="url(#rb)" stroke="#D6E0FA" stroke-width="1.5"/>' +
    '<path d="M100 8c20 16 33 38 41 62H59c8-24 21-46 41-62z" fill="url(#rn)"/>' +
    '<circle cx="100" cy="112" r="25" fill="#0A0F2D"/><circle cx="100" cy="112" r="25" fill="none" stroke="#C9D5F5" stroke-width="6"/><circle cx="92" cy="104" r="7" fill="#60A5FA" opacity=".85"/>' +
    '<path d="M92 170h16l4 62H88z" fill="url(#rf)"/></svg>';

  function hero() {
    return '<section class="hero wrap">' +
      '<div class="hero-copy"><span class="eyebrow rise" style="--d:0ms">Your digital growth partner</span>' +
      '<h1 class="hero-title rise" style="--d:80ms" tabindex="-1">We Help Your Small Business Get <span class="grad-text">Online<svg class="underline" viewBox="0 0 300 18" preserveAspectRatio="none" aria-hidden="true"><path d="M3 13C70 3 180 2 297 9" pathLength="1"/></svg></span></h1>' +
      '<p class="lead rise" style="--d:160ms">Affordable website designs, trusted local creators, and friendly advisers. No computer skills needed. We guide you one step at a time.</p>' +
      '<div class="hero-cta rise" style="--d:240ms"><a class="btn btn-primary btn-lg" href="#/check"><span>Start the Business Check</span>' + icon('arrowRight', 24) + '</a><a class="btn btn-ghost btn-lg" href="#/templates">' + icon('grid', 24) + '<span>See Templates</span></a></div>' +
      '<ul class="hero-chips rise" style="--d:320ms">' + [['shield', 'Verified Creators'], ['trending', 'Affordable Prices'], ['message', 'Plain, Simple Words'], ['help', 'Help on Every Page']].map(function (c) { return '<li>' + icon(c[0], 22) + '<span>' + c[1] + '</span></li>'; }).join('') + '</ul></div>' +
      '<div class="hero-stage" id="hero-stage" aria-hidden="true">' +
      '<div class="hs-blob" data-depth="6"></div><div class="hs-dots d1" data-depth="10"></div><div class="hs-dots d2" data-depth="14"></div>' +
      '<div class="hs-panel" data-depth="10"><div class="hs-bar"><i></i><i></i><i></i></div><small>Sales this month</small><div class="hs-big"><span data-count="58480" data-pre="₱">₱0</span><em>' + icon('trending', 16) + ' +27%</em></div>' +
      '<svg viewBox="0 0 300 110" class="hs-line"><defs><linearGradient id="hl" x1="0" x2="1"><stop offset="0" stop-color="#2563EB"/><stop offset=".6" stop-color="#8B5CF6"/><stop offset="1" stop-color="#34D399"/></linearGradient><linearGradient id="ha" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2563EB" stop-opacity=".22"/><stop offset="1" stop-color="#2563EB" stop-opacity="0"/></linearGradient></defs><path class="hs-area" d="M0 90C30 84 44 62 74 66s44 16 72-6 38-12 66-22 50-8 88-30v102H0z" fill="url(#ha)"/><path class="hs-stroke" pathLength="1" d="M0 90C30 84 44 62 74 66s44 16 72-6 38-12 66-22 50-8 88-30" fill="none" stroke="url(#hl)" stroke-width="5" stroke-linecap="round"/><circle class="hs-node n1" cx="74" cy="66" r="6.5"/><circle class="hs-node n2" cx="146" cy="60" r="6.5"/><circle class="hs-node n3" cx="212" cy="38" r="6.5"/></svg></div>' +
      '<div class="hs-card hs-ring" data-depth="22"><small>Online Ready</small><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="32" fill="none" stroke="#E8EDFB" stroke-width="10"/><circle class="ring-val" cx="40" cy="40" r="32" fill="none" stroke="url(#hl)" stroke-width="10" stroke-linecap="round" pathLength="100" transform="rotate(-90 40 40)"/></svg><b data-count="72" data-suf="%">0%</b></div>' +
      '<div class="hs-card hs-bars" data-depth="26"><small>Website visitors</small><b data-count="8620">0</b><em>' + icon('trending', 14) + ' +36%</em><div class="bars">' + [34, 50, 42, 66, 58, 82, 100].map(function (h, i) { return '<i style="--h:' + h + '%;--i:' + i + '"></i>'; }).join('') + '</div></div>' +
      '<div class="hs-rocket" data-depth="34">' + ROCKET + '<span class="puff p1"></span><span class="puff p2"></span><span class="puff p3"></span></div>' +
      '</div></section>';
  }

  function sectors() {
    return '<section class="wrap sector-strip" data-reveal><h2 class="strip-title">Made for every kind of Filipino small business</h2><ul data-stagger>' +
      d.sectors.map(function (s) { return '<li><a href="#/templates?sector=' + s.id + '"><span class="icon-tile sm">' + icon(s.icon, 24) + '</span><span>' + e(s.short) + '</span></a></li>'; }).join('') + '</ul></section>';
  }

  function services() {
    var items = [
      ['grid', 'Pick a Website Design', 'Browse ready-made designs for your type of business, and see how each one looks on a phone.', '#/templates', 'See Templates'],
      ['users', 'Find a Trusted Creator', 'Message verified local web developers and graphic designers who can do it for you.', '#/creators', 'Find a Creator'],
      ['calendar', 'Talk to an Adviser', 'Book a one-on-one session on marketing, technology, or building your brand.', '#/advice', 'Book a Session'],
      ['gauge', 'Check Your Business', 'Answer 8 easy questions in about 2 minutes and get clear suggestions for what to do first.', '#/check', 'Start the Check'],
      ['clipboard', 'Follow Your Project', 'See what is finished, what is next, and when your website will be ready.', '#/projects', 'Open My Projects'],
      ['help', 'Get Help Anytime', 'Stuck on something? Our Help pages explain every step in simple words.', '#/help', 'Open Help Center']
    ];
    return '<section class="wrap section" id="services"><header class="sec-head" data-reveal><span class="eyebrow">Start here</span><h2>What would you like to do today?</h2><p>Press any card below. You can always come back to this page.</p></header>' +
      '<div class="svc-grid" data-stagger>' + items.map(function (s) {
        return '<a class="svc-card" href="' + s[3] + '" data-spot><span class="icon-tile">' + icon(s[0], 34) + '</span><h3>' + s[1] + '</h3><p>' + s[2] + '</p><span class="more"><span>' + s[4] + '</span><span class="more-dot">' + icon('arrowRight', 18) + '</span></span></a>';
      }).join('') + '</div></section>';
  }

  function banner() {
    return '<section class="wrap" data-reveal><div class="cta-band"><div class="horizon" aria-hidden="true"></div>' +
      '<div class="cta-art" aria-hidden="true"><img src="assets/logo-mark-light.png" alt=""></div>' +
      '<div class="cta-text"><h2>Not sure where to begin?</h2><p>Take the free Business Check. It takes about 2 minutes, and there are no wrong answers.</p></div>' +
      '<div class="cta-act"><a class="btn btn-light btn-lg" href="#/check"><span>Start the Business Check</span>' + icon('arrowRight', 24) + '</a><small>' + icon('checkCircle', 18) + ' Free. No account needed.</small></div></div></section>';
  }

  function how() {
    var steps = [
      ['Tell us about your business', 'Answer a few easy questions so we can suggest what fits you and your budget.'],
      ['Choose a design or a person', 'Pick a ready-made design, or message a verified creator to do the work for you.'],
      ['Watch your business grow', 'Follow your project here and see your business online, ready for new customers.']
    ];
    return '<section class="wrap section how"><header class="sec-head" data-reveal><span class="eyebrow">How it works</span><h2>Three simple steps</h2></header>' +
      '<div class="how-track" id="how-track"><div class="how-path" aria-hidden="true"><span class="how-rail"></span><span class="how-fill"></span><i class="how-dot"></i><i class="how-dot"></i><i class="how-dot"></i>' +
      '<span class="how-rocket"><span class="rk"><svg viewBox="0 0 64 40" width="64" height="40"><g class="rk-flame"><path d="M15 12 1 20l14 8c-1-5-1-11 0-16z" fill="#FB923C"/><path d="M15 15.5 8 20l7 4.5c-.5-3-.5-6 0-9z" fill="#FDE047"/></g><path d="M20 10 11 1h11l11 9zM20 30l-9 9h11l11-9z" fill="#8B5CF6"/><path d="M15 9h22c10 0 18 5 25 11-7 6-15 11-25 11H15c-2-7-2-15 0-22z" fill="#2563EB"/><path d="M15 25h35c-4 3-8 6-13 6H15c-.4-2-.6-4-.6-6z" fill="#1E3A8A"/><circle cx="40" cy="19" r="6" fill="#fff" stroke="#0A0F2D" stroke-width="2"/><circle cx="42" cy="17.5" r="1.8" fill="#34D399"/></svg></span>' +
      '<span class="rk-spark"><i></i><i></i><i></i><i></i><i></i><i></i></span></span></div>' +
      '<ol class="how-steps" data-stagger>' + steps.map(function (s, i) { return '<li><span class="how-num">' + (i + 1) + '</span><h3>' + s[0] + '</h3><p>' + s[1] + '</p></li>'; }).join('') + '</ol></div>' +
      '<p class="how-again"><button type="button" class="btn-link" id="how-again" hidden>' + icon('rocket', 22) + '<span>Show the steps again</span></button></p></section>';
  }

  /* The rocket stops at each step in order and lights it up, then points upward at "grow". It plays once, then rests. */
  function howFlight(root) {
    var track = root.querySelector('#how-track'), path = track.querySelector('.how-path'), rocket = track.querySelector('.how-rocket'), again = root.querySelector('#how-again');
    var cards = [].slice.call(track.querySelectorAll('.how-steps li')), dots = [].slice.call(track.querySelectorAll('.how-dot')), points = [], stage = 0, timers = [];
    function measure() {
      var ol = track.querySelector('.how-steps'), vert = cards[1].offsetTop > cards[0].offsetTop + 10;
      track.classList.toggle('vert', vert);
      points = cards.map(function (c) { return vert ? c.offsetTop + c.offsetHeight / 2 : c.offsetLeft + c.offsetWidth / 2; });
      dots.forEach(function (dot, i) { dot.style.setProperty('--at', points[i] + 'px'); });
      path.style.setProperty('--s', points[0] + 'px');
      path.style.setProperty('--e', points[2] + 'px');
      path.style.setProperty('--pos', points[stage] + 'px');
    }
    function light(n) {
      cards.forEach(function (c, i) { c.classList.toggle('on', i <= n); });
      dots.forEach(function (dot, i) { dot.classList.toggle('on', i <= n); });
    }
    function flyTo(n) { stage = n; rocket.classList.add('fly'); path.style.setProperty('--pos', points[n] + 'px'); }
    function at(ms, fn) { timers.push(setTimeout(fn, ms)); }
    function play() {
      timers.forEach(clearTimeout); timers = [];
      again.hidden = true; stage = 0;
      path.classList.add('no-move'); rocket.classList.remove('fly', 'up', 'burst'); light(-1); measure();
      void path.offsetWidth; path.classList.remove('no-move');
      at(300, function () { light(0); });
      at(1400, function () { flyTo(1); });
      at(2600, function () { rocket.classList.remove('fly'); light(1); });
      at(3500, function () { flyTo(2); });
      at(4700, function () { rocket.classList.remove('fly'); rocket.classList.add('up', 'burst'); light(2); });
      at(5900, function () { again.hidden = false; });
    }
    function rest() { stage = 2; path.classList.add('no-move'); measure(); rocket.classList.add('up'); light(2); }
    measure();
    var ro = new ResizeObserver(measure); ro.observe(track);
    var io = null;
    if (ui.calm() || !('IntersectionObserver' in window)) rest();
    else if (track.classList.contains('vert')) {
      /* On phones the cards are too tall to fit together, so the rocket follows as each card scrolls into view. */
      var seen = -1;
      io = new IntersectionObserver(function (en) {
        en.forEach(function (x) {
          var n = cards.indexOf(x.target);
          if (!x.isIntersecting || n <= seen) return;
          seen = n; flyTo(n);
          at(n ? 1200 : 0, function () {
            rocket.classList.remove('fly'); light(n);
            if (n === 2) { rocket.classList.add('up', 'burst'); at(1200, function () { again.hidden = false; }); }
          });
        });
      }, { threshold: .6 });
      cards.forEach(function (c) { io.observe(c); });
    } else {
      io = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { io.disconnect(); play(); } }, { threshold: .3 });
      io.observe(track);
    }
    again.onclick = play;
    return function () { timers.forEach(clearTimeout); ro.disconnect(); if (io) io.disconnect(); };
  }

  function results() {
    return '<section class="wrap section"><div class="sec-row" data-reveal><div class="sec-head left"><span class="eyebrow">Success stories</span><h2>Real growth for small businesses</h2></div><p class="sample-note">Example stories shown for this preview.</p></div>' +
      '<div class="story-grid" data-stagger>' + d.stories.map(function (s) {
        return '<article class="story-card" data-spot><span class="icon-tile">' + icon(s.icon, 32) + '</span><div><h3>' + e(s.sector) + '</h3><p class="story-num"><span data-count="' + s.value + '" data-pre="+" data-suf="%">+0%</span></p><p>' + e(s.label) + '</p></div></article>';
      }).join('') + '</div>' +
      '<div class="quote-box" data-reveal><button class="round-btn" type="button" id="q-prev" aria-label="Previous story">' + icon('chevronLeft', 26) + '</button><div class="quote-slide" id="q-slide" aria-live="polite"></div><button class="round-btn" type="button" id="q-next" aria-label="Next story">' + icon('chevronRight', 26) + '</button></div></section>';
  }

  return {
    title: function () { return 'Home'; },
    render: function () { return hero() + sectors() + services() + banner() + how() + results(); },
    mount: function (root) {
      var i = 0, slide = root.querySelector('#q-slide');
      function show() {
        var t = d.testimonials[i];
        slide.innerHTML = '<div class="quote-in"><span class="quote-mark">' + icon('quote', 52) + '</span><blockquote>' + e(t.text) + '</blockquote><div class="quote-by"><span class="avatar" style="--h:' + (220 + i * 40) + '" aria-hidden="true">' + e(ui.initials(t.name)) + '</span><div><b>' + e(t.name) + '</b><small>' + e(t.biz) + '</small></div></div></div>';
      }
      show();
      root.querySelector('#q-prev').onclick = function () { i = (i + d.testimonials.length - 1) % d.testimonials.length; show(); };
      root.querySelector('#q-next').onclick = function () { i = (i + 1) % d.testimonials.length; show(); };

      /* Gentle depth effect on the hero when a mouse moves over it. */
      var stage = root.querySelector('#hero-stage'), layers = [].slice.call(stage.querySelectorAll('[data-depth]')), raf = 0;
      function move(ev) {
        if (ev.pointerType !== 'mouse' || ui.calm()) return;
        var r = stage.getBoundingClientRect(), x = (ev.clientX - r.left) / r.width - .5, y = (ev.clientY - r.top) / r.height - .5;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          layers.forEach(function (l) { var k = +l.dataset.depth; l.style.translate = (-x * k).toFixed(1) + 'px ' + (-y * k).toFixed(1) + 'px'; });
        });
      }
      addEventListener('pointermove', move, { passive: true });
      var stopFlight = howFlight(root);
      return function () { removeEventListener('pointermove', move); cancelAnimationFrame(raf); stopFlight(); };
    }
  };
})();
