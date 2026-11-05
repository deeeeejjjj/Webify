/* Digital Readiness Self-Assessment: one question per screen, then an automated recommendation. */
W.pages = W.pages || {};
W.pages.check = (function () {
  var ui = W.ui, icon = ui.icon, e = ui.esc, d = W.data;
  var SCORED = ['presence', 'discovery', 'assets', 'comfort', 'payment'];

  function level(score) {
    if (score < 35) return { name: 'Getting Started', text: 'You are at the best place to begin. A simple page will make a big difference for your business.' };
    if (score < 70) return { name: 'Growing', text: 'You already have a good base. A few improvements can help more customers find and trust you.' };
    return { name: 'Ready to Scale', text: 'Your business is well prepared. Now it is time to reach more customers and make things easier for them.' };
  }
  function steps(a) {
    var out = [];
    if (a.presence === 0) out.push(['grid', 'Get your first website', 'Start with an affordable template that fits your business.', '#/templates?sector=' + a.sector + '&type=website', 'See Templates']);
    else if (a.presence === 1) out.push(['grid', 'Add a simple website', 'A website helps customers who search on Google find you, in addition to Facebook.', '#/templates?sector=' + a.sector + '&type=website', 'See Templates']);
    else out.push(['megaphone', 'Promote what you have', 'Use banners and ads to bring more people to your website.', '#/templates?sector=' + a.sector + '&type=ad', 'See Ads']);
    if (a.assets < 2) out.push(['camera', 'Get good photos and a logo', 'Clear pictures build trust. A local creator can help at a fair price.', '#/creators', 'Find a Creator']);
    if (a.comfort < 2 || a.budget === 'high') out.push(['users', 'Let a creator set it up', 'You do not need to do it alone. A verified creator can do the technical work.', '#/creators', 'Find a Creator']);
    if (a.goal === 'orders') out.push(['phone', 'Make ordering easy', 'See mobile app designs that let customers order or book from their phones.', '#/templates?type=app', 'See App Designs']);
    if (a.goal === 'unsure' || a.discovery < 2) out.push(['calendar', 'Talk to an adviser', 'Book a session to make a simple plan for reaching more customers.', '#/advice', 'Book a Session']);
    return out.slice(0, 3);
  }
  function compute(a) {
    var sum = SCORED.reduce(function (t, k) { return t + a[k]; }, 0);
    return Math.round(sum / (SCORED.length * 3) * 100);
  }

  return {
    title: function () { return 'Business Check'; },
    render: function () { return '<div class="wrap page-pad narrow" id="chk"></div>'; },
    mount: function (root) {
      var Q = d.checkQuestions, box = root.querySelector('#chk'), i = -1, ans = {}, saved = W.store.get().assessment;
      function intro() {
        box.innerHTML = ui.head('Free business check', 'How ready is your business to go online?', 'Answer 8 easy questions in about 2 minutes. There are no wrong answers.') +
          '<div class="intro-card" data-reveal><ul class="ticks">' + ['Free, and no account needed', 'One question at a time', 'Get clear suggestions at the end'].map(function (x) { return '<li>' + icon('check', 22) + '<span>' + x + '</span></li>'; }).join('') + '</ul><button class="btn btn-primary btn-lg" type="button" id="begin"><span>Begin the Check</span>' + icon('arrowRight', 24) + '</button>' +
          (saved ? '<button class="btn btn-ghost btn-lg" type="button" id="last">' + icon('eye', 24) + '<span>See My Last Result</span></button>' : '') + '</div>';
        box.querySelector('#begin').onclick = function () { i = 0; question(); };
        if (saved) box.querySelector('#last').onclick = function () { ans = saved.answers; result(false); };
        ui.animate(box);
      }
      function question() {
        var q = Q[i], opts = q.opts || d.sectors.map(function (s) { return [s.name, s.id, s.icon]; });
        box.innerHTML = '<div class="q-top"><p class="q-count">Question ' + (i + 1) + ' of ' + Q.length + '</p><div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="' + Q.length + '" aria-valuenow="' + (i + 1) + '" aria-label="Your progress"><span style="width:' + (i / Q.length * 100) + '%"></span></div></div>' +
          '<section class="q-card"><h1 tabindex="-1">' + e(q.q) + '</h1><p class="lead-sm muted">' + e(q.hint) + '</p><div class="q-opts' + (q.opts ? '' : ' two') + '">' + opts.map(function (o) {
            return '<button type="button" class="q-opt" data-v="' + e(o[1]) + '" aria-pressed="' + (String(ans[q.id]) === String(o[1])) + '">' + (o[2] ? '<span class="icon-tile sm">' + icon(o[2], 24) + '</span>' : '<span class="q-radio"></span>') + '<span>' + e(o[0]) + '</span></button>';
          }).join('') + '</div>' + (i ? '<button type="button" class="btn btn-ghost q-back" id="q-back">' + icon('arrowLeft', 22) + '<span>Go Back</span></button>' : '') + '</section>';
        requestAnimationFrame(function () { var bar = box.querySelector('.bar span'); if (bar) bar.style.width = (i + 1) / Q.length * 100 + '%'; });
        box.querySelector('h1').focus({ preventScroll: true });
        box.querySelectorAll('.q-opt').forEach(function (b) {
          b.onclick = function () {
            var raw = b.dataset.v;
            ans[q.id] = /^\d+$/.test(raw) ? +raw : raw;
            b.setAttribute('aria-pressed', 'true');
            setTimeout(function () { i++; if (i < Q.length) question(); else result(true); }, ui.calm() ? 0 : 240);
          };
        });
        var bk = box.querySelector('#q-back'); if (bk) bk.onclick = function () { i--; question(); };
        scrollTo(0, 0);
      }
      function result(isNew) {
        var score = compute(ans), lv = level(score), list = steps(ans);
        if (isNew) W.store.update(function (st) { st.assessment = { answers: ans, score: score, level: lv.name, at: Date.now() }; });
        saved = W.store.get().assessment;
        W.api.listTemplates({ sector: ans.sector, type: 'website' }).then(function (tpls) {
          var sector = d.sectors.find(function (s) { return s.id === ans.sector; });
          box.innerHTML = '<section class="res-hero"><div class="horizon" aria-hidden="true"></div><div class="res-ring"><svg viewBox="0 0 120 120" aria-hidden="true"><defs><linearGradient id="rr" x1="0" x2="1"><stop offset="0" stop-color="#60A5FA"/><stop offset=".6" stop-color="#8B5CF6"/><stop offset="1" stop-color="#34D399"/></linearGradient></defs><circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="12"/><circle class="rr-val" cx="60" cy="60" r="50" fill="none" stroke="url(#rr)" stroke-width="12" stroke-linecap="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100" transform="rotate(-90 60 60)"/></svg><b data-count="' + score + '" data-suf="%">0%</b></div>' +
            '<div><span class="eyebrow dark">Your result</span><h1 tabindex="-1">' + lv.name + '</h1><p>' + e(lv.text) + '</p></div></section>' +
            '<h2 class="res-h">Your next steps</h2><ol class="next-steps" data-stagger>' + list.map(function (s, n) { return '<li class="next-card" data-spot><span class="how-num">' + (n + 1) + '</span><span class="icon-tile sm">' + icon(s[0], 26) + '</span><div><h3>' + s[1] + '</h3><p>' + s[2] + '</p></div><a class="btn btn-primary btn-sm" href="' + s[3] + '"><span>' + s[4] + '</span>' + icon('arrowRight', 20) + '</a></li>'; }).join('') + '</ol>' +
            (tpls.length ? '<h2 class="res-h">Designs for ' + e(sector.name) + '</h2><div class="tpl-grid" data-stagger>' + tpls.slice(0, 3).map(W.tplCard).join('') + '</div>' : '') +
            '<div class="btn-row res-actions"><button type="button" class="btn btn-ghost" id="print">' + icon('printer', 22) + '<span>Print My Result</span></button><button type="button" class="btn btn-ghost" id="again">' + icon('refresh', 22) + '<span>Take the Check Again</span></button></div>';
          ui.animate(box);
          box.querySelector('#print').onclick = function () { print(); };
          box.querySelector('#again').onclick = function () { ans = {}; i = 0; question(); };
          requestAnimationFrame(function () { requestAnimationFrame(function () { box.querySelector('.rr-val').style.strokeDashoffset = 100 - score; }); });
          box.querySelector('h1').focus({ preventScroll: true });
          scrollTo(0, 0);
          if (isNew && score >= 0) ui.confetti();
        });
      }
      intro();
    }
  };
})();
