/* Business Consultation Portal: a 4-step booking wizard that logs to My Projects and exports to a calendar. */
W.pages = W.pages || {};
W.pages.advice = (function () {
  var ui = W.ui, icon = ui.icon, e = ui.esc, d = W.data;
  var SLOTS = ['9:00 AM', '10:30 AM', '1:00 PM', '2:30 PM', '4:00 PM'];
  var STEPS = ['Topic', 'Adviser', 'Day & Time', 'Your Details'];
  var iso = function (dt) { return dt.getFullYear() + '-' + String(dt.getMonth() + 1).padStart(2, '0') + '-' + String(dt.getDate()).padStart(2, '0'); };

  /* Stable pseudo-availability until the real schedule comes from the backend. */
  function freeSlots(consultantId, date) {
    var taken = W.store.get().bookings.filter(function (b) { return b.consultantId === consultantId && b.date === date; }).map(function (b) { return b.time; });
    var seed = 0; (consultantId + date).split('').forEach(function (ch) { seed = (seed * 31 + ch.charCodeAt(0)) % 9973; });
    return SLOTS.filter(function (s, i) { return (seed >> i) % 3 !== 0 && taken.indexOf(s) < 0; });
  }

  W.bookingIcs = function (b) {
    var m = b.time.match(/(\d+):(\d+) (AM|PM)/), h = (+m[1] % 12) + (m[3] === 'PM' ? 12 : 0), day = b.date.replace(/-/g, '');
    var pad = function (n) { return String(n).padStart(2, '0'); }, start = day + 'T' + pad(h) + m[2] + '00', end = day + 'T' + pad(h + 1) + m[2] + '00';
    var ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Webify//Booking//EN', 'BEGIN:VEVENT', 'UID:' + b.id + '@webify', 'DTSTART;TZID=Asia/Manila:' + start, 'DTEND;TZID=Asia/Manila:' + end, 'SUMMARY:Webify session: ' + b.topic, 'DESCRIPTION:With ' + b.consultant, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    a.download = 'webify-session.ics'; a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
    ui.toast('Your calendar file was saved. Open it to add the session to your calendar.');
  };

  return {
    title: function () { return 'Get Advice'; },
    render: function () {
      return '<div class="wrap page-pad narrow">' + ui.head('Business advice', 'Talk to a business adviser', 'Book a one-hour session in four easy steps. Sessions follow DTI-aligned guidance for small businesses.') + '<div id="wizard"></div></div>';
    },
    mount: function (root) {
      var box = root.querySelector('#wizard'), now = new Date(), S = { step: 0, cat: null, consultant: null, date: null, time: null, view: new Date(now.getFullYear(), now.getMonth(), 1) };
      function progress() {
        return '<ol class="stepper" aria-label="Booking steps">' + STEPS.map(function (t, i) {
          var cls = i < S.step ? 'done' : i === S.step ? 'now' : '';
          return '<li class="' + cls + '"' + (i === S.step ? ' aria-current="step"' : '') + '><span class="st-dot">' + (i < S.step ? icon('check', 20) : i + 1) + '</span><span class="st-label">' + t + '</span></li>';
        }).join('') + '</ol>';
      }
      function nav(nextLabel, canNext) {
        return '<div class="wiz-nav">' + (S.step ? '<button type="button" class="btn btn-ghost" id="wiz-back">' + icon('arrowLeft', 22) + '<span>Go Back</span></button>' : '<span></span>') +
          (nextLabel ? '<button type="button" class="btn btn-primary" id="wiz-next"' + (canNext ? '' : ' disabled') + '><span>' + nextLabel + '</span>' + icon('arrowRight', 22) + '</button>' : '') + '</div>';
      }
      function go(n) { S.step = n; draw(); var h = box.querySelector('h2'); if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); } box.scrollIntoView({ block: 'nearest' }); }
      function wire() {
        var b = box.querySelector('#wiz-back'), n = box.querySelector('#wiz-next');
        if (b) b.onclick = function () { go(S.step - 1); };
        if (n) n.onclick = function () { go(S.step + 1); };
      }
      function stepTopic() {
        box.innerHTML = progress() + '<section class="wiz-card"><h2>What would you like help with?</h2><div class="pick-grid">' + d.consultCategories.map(function (c) {
          return '<button type="button" class="pick-card" data-cat="' + c.id + '" aria-pressed="' + (S.cat === c.id) + '"><span class="icon-tile">' + icon(c.icon, 32) + '</span><b>' + e(c.name) + '</b><span class="muted">' + e(c.desc) + '</span><span class="pick-tick">' + icon('check', 20) + '</span></button>';
        }).join('') + '</div>' + nav('Next: Choose an Adviser', !!S.cat) + '</section>';
        box.querySelectorAll('[data-cat]').forEach(function (b) { b.onclick = function () { if (S.cat !== b.dataset.cat) S.consultant = null; S.cat = b.dataset.cat; go(1); }; });
        wire();
      }
      function stepAdviser() {
        var list = d.consultants.filter(function (a) { return a.cats.indexOf(S.cat) > -1; });
        box.innerHTML = progress() + '<section class="wiz-card"><h2>Who would you like to talk to?</h2><div class="adv-list">' + list.map(function (a) {
          return '<button type="button" class="adv-card" data-adv="' + a.id + '" aria-pressed="' + (S.consultant === a.id) + '">' + ui.avatar(a, 'lg') + '<span class="adv-text"><b>' + e(a.name) + '</b><span class="muted">' + e(a.title) + '</span><span class="adv-bio">' + e(a.bio) + '</span><span class="adv-facts">' + ui.stars(a.rating) + '<span>' + a.years + ' years of experience</span><span>Speaks ' + e(a.langs) + '</span></span></span><span class="pick-tick">' + icon('check', 20) + '</span></button>';
        }).join('') + '</div>' + nav('Next: Choose a Day', !!S.consultant) + '</section>';
        box.querySelectorAll('[data-adv]').forEach(function (b) { b.onclick = function () { if (S.consultant !== b.dataset.adv) { S.date = null; S.time = null; } S.consultant = b.dataset.adv; go(2); }; });
        wire();
      }
      function stepDate() {
        var v = S.view, first = new Date(v.getFullYear(), v.getMonth(), 1), days = new Date(v.getFullYear(), v.getMonth() + 1, 0).getDate(), today = iso(now), cells = '';
        for (var i = 0; i < first.getDay(); i++) cells += '<span></span>';
        for (var n = 1; n <= days; n++) {
          var dt = new Date(v.getFullYear(), v.getMonth(), n), key = iso(dt), off = key <= today || dt.getDay() === 0 || !freeSlots(S.consultant, key).length;
          cells += '<button type="button" class="cal-day' + (S.date === key ? ' sel' : '') + '" data-day="' + key + '"' + (off ? ' disabled' : '') + ' aria-label="' + dt.toLocaleDateString('en-PH', { weekday: 'long', month: 'long', day: 'numeric' }) + (off ? ', not available' : '') + '" aria-pressed="' + (S.date === key) + '">' + n + '</button>';
        }
        var canPrev = v > new Date(now.getFullYear(), now.getMonth(), 1);
        var slots = S.date ? freeSlots(S.consultant, S.date) : [];
        box.innerHTML = progress() + '<section class="wiz-card"><h2>Choose a day and time</h2><div class="cal-wrap"><div class="cal"><div class="cal-head"><button type="button" class="round-btn" id="cal-prev" aria-label="Previous month"' + (canPrev ? '' : ' disabled') + '>' + icon('chevronLeft', 24) + '</button><b aria-live="polite">' + v.toLocaleDateString('en-PH', { month: 'long', year: 'numeric' }) + '</b><button type="button" class="round-btn" id="cal-next" aria-label="Next month">' + icon('chevronRight', 24) + '</button></div>' +
          '<div class="cal-week" aria-hidden="true">' + ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(function (w) { return '<span>' + w + '</span>'; }).join('') + '</div><div class="cal-grid">' + cells + '</div></div>' +
          '<div class="slots"><h3>' + (S.date ? ui.date(S.date, { weekday: 'long', month: 'long', day: 'numeric' }) : 'First, press a day') + '</h3>' +
          (S.date ? '<div class="slot-grid">' + slots.map(function (t) { return '<button type="button" class="slot' + (S.time === t ? ' sel' : '') + '" data-time="' + t + '" aria-pressed="' + (S.time === t) + '">' + icon('clock', 20) + '<span>' + t + '</span></button>'; }).join('') + '</div>' : '<p class="muted">Days you can pick are shown in dark text. All times are Philippine time.</p>') +
          '</div></div>' + nav('Next: Your Details', !!(S.date && S.time)) + '</section>';
        box.querySelector('#cal-prev').onclick = function () { S.view = new Date(v.getFullYear(), v.getMonth() - 1, 1); draw(); };
        box.querySelector('#cal-next').onclick = function () { S.view = new Date(v.getFullYear(), v.getMonth() + 1, 1); draw(); };
        box.querySelectorAll('[data-day]').forEach(function (b) { b.onclick = function () { S.date = b.dataset.day; S.time = null; draw(); }; });
        box.querySelectorAll('[data-time]').forEach(function (b) { b.onclick = function () { S.time = b.dataset.time; draw(); var n = box.querySelector('#wiz-next'); n.focus({ preventScroll: true }); n.scrollIntoView({ block: 'center', behavior: ui.calm() ? 'auto' : 'smooth' }); }; });
        wire();
      }
      function stepDetails() {
        var a = d.consultants.find(function (x) { return x.id === S.consultant; }), c = d.consultCategories.find(function (x) { return x.id === S.cat; }), u = W.store.get().user || {};
        box.innerHTML = progress() + '<section class="wiz-card"><h2>Almost done! Check your booking.</h2><dl class="summary"><div><dt>Topic</dt><dd>' + e(c.name) + '</dd></div><div><dt>Adviser</dt><dd>' + e(a.name) + '</dd></div><div><dt>When</dt><dd>' + ui.date(S.date) + ' at ' + S.time + '</dd></div><div><dt>Length</dt><dd>1 hour, by video or phone call</dd></div></dl>' +
          '<form id="bk" novalidate><div class="field"><label for="b-name">Your full name</label><input id="b-name" name="name" autocomplete="name" value="' + e(u.name || '') + '"></div>' +
          '<div class="field"><label for="b-contact">Your mobile number or email</label><input id="b-contact" name="contact" autocomplete="email" value="' + e(u.email || '') + '"><p class="hint">We will send your reminder here.</p></div>' +
          '<div class="field"><label for="b-note">Anything the adviser should know? (You can skip this.)</label><textarea id="b-note" name="note" rows="3"></textarea></div>' +
          '<div class="wiz-nav"><button type="button" class="btn btn-ghost" id="wiz-back">' + icon('arrowLeft', 22) + '<span>Go Back</span></button><button type="submit" class="btn btn-primary btn-lg">' + icon('checkCircle', 24) + '<span>Confirm Booking</span></button></div></form></section>';
        wire();
        box.querySelector('#bk').onsubmit = function (ev) {
          ev.preventDefault();
          var f = ev.target;
          if (!ui.required(f, [['name', 'Please type your name.'], ['contact', 'Please type your mobile number or email.']])) return;
          W.api.createBooking({ consultantId: a.id, consultant: a.name, topic: c.name, date: S.date, time: S.time, name: f.name.value.trim(), contact: f.contact.value.trim(), note: f.note.value.trim() }).then(function (b) {
            box.innerHTML = '<section class="wiz-card empty success"><span class="done-check">' + icon('check', 44) + '</span><h2 tabindex="-1">Your session is booked!</h2><p class="lead-sm">' + e(a.name) + ' will talk with you on <b>' + ui.date(b.date) + ' at ' + b.time + '</b>.</p><div class="btn-row"><button type="button" class="btn btn-primary btn-lg" id="ics">' + icon('calendar', 24) + '<span>Add to My Calendar</span></button><a class="btn btn-ghost btn-lg" href="#/projects?tab=appointments"><span>See My Appointments</span>' + icon('arrowRight', 22) + '</a></div></section>';
            box.querySelector('#ics').onclick = function () { W.bookingIcs(b); };
            box.querySelector('h2').focus();
            ui.confetti();
          });
        };
      }
      function draw() { [stepTopic, stepAdviser, stepDate, stepDetails][S.step](); }
      draw();
    }
  };
})();
