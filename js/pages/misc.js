/* Help Center, sign in, account, and the not-found page. */
W.pages = W.pages || {};
(function () {
  var ui = W.ui, icon = ui.icon, e = ui.esc, d = W.data;

  W.pages.help = {
    title: function () { return 'Help Center'; },
    render: function () {
      return '<div class="wrap page-pad narrow">' + ui.head('Help center', 'We are happy to help', 'Press a question to read the answer.') +
        '<div class="faq" data-stagger>' + d.faqs.map(function (f) { return '<details class="faq-item"><summary><span>' + e(f[0]) + '</span><span class="faq-ic">' + icon('plus', 22) + '</span></summary><p>' + e(f[1]) + '</p></details>'; }).join('') + '</div>' +
        '<section class="section-sm" id="display"><h2 data-reveal>Make this site easier to use</h2><p class="muted" data-reveal>Your choices are remembered the next time you visit.</p><div class="card display-card" data-reveal><div class="settings-stack">' + ui.settingsControls() + '</div></div></section>' +
        '<section class="section-sm" id="limits"><h2 data-reveal>What Webify does not offer</h2><p class="muted" data-reveal>We want to be clear, so you know what to expect from us.</p><div class="limit-grid" data-stagger>' + d.boundaries.map(function (b) { return '<article class="limit-card"><span class="icon-tile sm">' + icon(b.icon, 26) + '</span><h3>' + e(b.title) + '</h3><p>' + e(b.text) + '</p></article>'; }).join('') + '</div></section>' +
        '<section class="section-sm" data-reveal><div class="contact-card"><div><h2>Send us a question</h2><p class="muted">Our team usually replies within one working day.</p></div><form id="ask" novalidate><div class="field"><label for="a-c">Your mobile number or email</label><input id="a-c" name="contact" autocomplete="email"></div><div class="field"><label for="a-q">Your question</label><textarea id="a-q" name="question" rows="3"></textarea></div><button class="btn btn-primary" type="submit">' + icon('send', 22) + '<span>Send My Question</span></button></form></div></section></div>';
    },
    mount: function (root, _, q) {
      root.querySelector('#ask').onsubmit = function (ev) {
        ev.preventDefault();
        if (!ui.required(ev.target, [['contact', 'Please type your mobile number or email so we can reply.'], ['question', 'Please type your question.']])) return;
        ev.target.reset(); ui.toast('Thank you! We received your question.');
      };
      if (q.section === 'limits' || q.section === 'display') setTimeout(function () { root.querySelector('#' + q.section).scrollIntoView(); }, 60);
    }
  };

  W.pages.signin = {
    title: function () { return 'Sign In'; },
    render: function () {
      return '<div class="wrap page-pad auth-wrap"><section class="auth-card" data-reveal><img src="assets/logo-full.png" alt="Webify" class="auth-logo" width="146" height="144"><h1 tabindex="-1" id="auth-title">Welcome back</h1><p class="muted" id="auth-sub">Sign in to see your projects and messages.</p>' +
        '<div class="seg full" role="group" aria-label="Choose an option"><button type="button" class="seg-btn" data-mode="in" aria-pressed="true">Sign In</button><button type="button" class="seg-btn" data-mode="up" aria-pressed="false">New Account</button></div>' +
        '<form id="auth" novalidate><div class="field" id="f-name" hidden><label for="s-name">Your full name</label><input id="s-name" name="name" autocomplete="name"></div>' +
        '<div class="field"><label for="s-email">Your email address</label><input id="s-email" name="email" type="email" autocomplete="email" placeholder="name@example.com"></div>' +
        '<div class="field"><label for="s-pass">Your password</label><div class="pass-row"><input id="s-pass" name="password" type="password" autocomplete="current-password"><button type="button" class="btn btn-ghost btn-sm" id="show-pass">' + icon('eye', 20) + '<span>Show</span></button></div></div>' +
        '<fieldset class="pay-opts" id="f-role" hidden><legend>I am a:</legend><label class="radio-card"><input type="radio" name="role" value="client" checked><span><b>Business Owner</b><small>I want to get my business online</small></span></label><label class="radio-card"><input type="radio" name="role" value="creator"><span><b>Creator</b><small>I build websites or make designs</small></span></label></fieldset>' +
        '<button class="btn btn-primary btn-block btn-lg" type="submit"><span id="auth-go">Sign In</span>' + icon('arrowRight', 24) + '</button></form>' +
        '<p class="sample-note">This is a preview. Your password is not saved anywhere.</p></section></div>';
    },
    mount: function (root) {
      var mode = 'in', form = root.querySelector('#auth'), pass = root.querySelector('#s-pass');
      root.querySelectorAll('[data-mode]').forEach(function (b) {
        b.onclick = function () {
          mode = b.dataset.mode;
          root.querySelectorAll('[data-mode]').forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
          var up = mode === 'up';
          root.querySelector('#f-name').hidden = !up; root.querySelector('#f-role').hidden = !up;
          root.querySelector('#auth-title').textContent = up ? 'Create your account' : 'Welcome back';
          root.querySelector('#auth-sub').textContent = up ? 'It only takes a minute, and it is free.' : 'Sign in to see your projects and messages.';
          root.querySelector('#auth-go').textContent = up ? 'Create My Account' : 'Sign In';
          pass.autocomplete = up ? 'new-password' : 'current-password';
        };
      });
      root.querySelector('#show-pass').onclick = function (ev) {
        var show = pass.type === 'password'; pass.type = show ? 'text' : 'password';
        ev.currentTarget.innerHTML = icon(show ? 'eyeOff' : 'eye', 20) + '<span>' + (show ? 'Hide' : 'Show') + '</span>';
      };
      form.onsubmit = function (ev) {
        ev.preventDefault();
        var rules = [['email', 'Please type your email address.', /.+@.+\..+/, 'That email looks incomplete. It should look like name@example.com.'], ['password', 'Please type your password.', /.{6,}/, 'Your password needs at least 6 letters or numbers.']];
        if (mode === 'up') rules.unshift(['name', 'Please type your full name.']);
        if (!ui.required(form, rules)) return;
        var email = form.email.value.trim(), nm = mode === 'up' ? form.name.value.trim() : email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); });
        W.api.signIn({ name: nm, email: email, role: mode === 'up' ? form.role.value : undefined }).then(function () {
          ui.toast('Welcome, ' + nm.split(' ')[0] + '! You are signed in.');
          location.hash = '#/projects';
        });
      };
    }
  };

  W.pages.account = {
    title: function () { return 'My Account'; },
    render: function () {
      var u = W.store.get().user;
      if (!u) return '<div class="wrap page-pad narrow"><div class="empty"><span class="icon-tile">' + icon('user', 34) + '</span><h1 tabindex="-1">You are not signed in</h1><a class="btn btn-primary" href="#/signin">Sign In</a></div></div>';
      return '<div class="wrap page-pad narrow">' + ui.head('My account', 'Hello, ' + e(u.name.split(' ')[0]) + '!') + '<div class="card account-card" data-reveal><dl class="summary"><div><dt>Name</dt><dd>' + e(u.name) + '</dd></div><div><dt>Email</dt><dd>' + e(u.email) + '</dd></div></dl><div class="btn-row"><a class="btn btn-primary" href="#/projects">' + icon('clipboard', 22) + '<span>Go to My Projects</span></a><button class="btn btn-ghost" type="button" id="out">' + icon('logout', 22) + '<span>Sign Out</span></button></div></div></div>';
    },
    mount: function (root) {
      var o = root.querySelector('#out');
      if (o) o.onclick = function () { W.api.signOut().then(function () { ui.toast('You are signed out. See you soon!', { kind: 'info' }); location.hash = '#/'; }); };
    }
  };

  W.pages.notfound = {
    title: function () { return 'Page not found'; },
    render: function () {
      return '<div class="wrap page-pad narrow"><div class="empty"><span class="icon-tile">' + icon('help', 34) + '</span><h1 tabindex="-1">We could not find that page</h1><p>It may have moved. Do not worry, nothing is broken.</p><a class="btn btn-primary" href="#/">' + icon('home', 22) + '<span>Go to the Home Page</span></a></div></div>';
    }
  };
})();
