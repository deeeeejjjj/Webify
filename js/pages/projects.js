/* User Dashboard & Project Tracker: works for both business owners and creators. */
W.pages = W.pages || {};
W.pages.projects = (function () {
  var ui = W.ui, icon = ui.icon, e = ui.esc, d = W.data;
  var STATE = {
    done: ['Finished', 'done', 'check'],
    review: ['Waiting for your approval', 'review', 'eye'],
    active: ['In progress', 'active', 'clock'],
    todo: ['Not started yet', 'todo', 'clock']
  };
  function daysLeft(iso) {
    var p = iso.split('-'), then = new Date(+p[0], +p[1] - 1, +p[2]), now = new Date(); now.setHours(0, 0, 0, 0);
    return Math.round((then - now) / 86400000);
  }
  function leftLabel(n) { return n < 0 ? Math.abs(n) + (n === -1 ? ' day late' : ' days late') : n === 0 ? 'Due today' : n === 1 ? '1 day left' : n + ' days left'; }
  function percent(p) {
    var v = p.milestones.reduce(function (t, m) { return t + (m.state === 'done' ? 1 : m.state === 'review' ? .6 : m.state === 'active' ? .25 : 0); }, 0);
    return Math.round(v / p.milestones.length * 100);
  }
  function ring(pct) {
    return '<div class="pj-ring" role="img" aria-label="' + pct + ' percent finished"><svg viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="33" fill="none" stroke="#E6EBF8" stroke-width="9"/><circle class="pj-val" cx="40" cy="40" r="33" fill="none" stroke="url(#pjg)" stroke-width="9" stroke-linecap="round" pathLength="100" style="--v:' + (100 - pct) + '" transform="rotate(-90 40 40)"/></svg><b>' + pct + '%</b></div>';
  }
  function actions(p, m, i, role) {
    if (role === 'client') {
      if (m.state === 'review') return '<div class="ms-acts"><button type="button" class="btn btn-primary btn-sm" data-approve="' + p.id + ':' + i + '">' + icon('check', 20) + '<span>Approve</span></button><button type="button" class="btn btn-ghost btn-sm" data-changes="' + p.id + ':' + i + '">' + icon('pen', 20) + '<span>Ask for Changes</span></button></div>';
      return '';
    }
    if (m.state === 'active') return '<div class="ms-acts"><label class="btn btn-primary btn-sm file-btn">' + icon('upload', 20) + '<span>Upload My Work</span><input type="file" class="sr-only" data-upload="' + p.id + ':' + i + '"></label></div>';
    return '';
  }
  function milestone(p, m, i, role) {
    var st = STATE[m.state], label = role === 'creator' && m.state === 'review' ? 'Waiting for client approval' : st[0];
    return '<li class="ms ' + st[1] + '"><span class="ms-dot">' + icon(st[2], 18) + '</span><div class="ms-body"><div class="ms-line"><h4>' + e(m.title) + '</h4><span class="state-chip ' + st[1] + '">' + label + '</span></div><p class="muted small">Due ' + ui.date(m.due, { month: 'long', day: 'numeric' }) + '</p>' +
      (m.file ? '<p class="ms-file">' + icon('file', 18) + '<span>' + e(m.file) + '</span></p>' : '') + actions(p, m, i, role) + '</div></li>';
  }
  function projectCard(p, role) {
    var c = p.creatorId && d.creators.find(function (x) { return x.id === p.creatorId; }), left = daysLeft(p.deadline), pct = percent(p);
    var who = role === 'creator' ? 'Client: ' + e(p.client) : c ? 'Creator: ' + e(c.name) : 'Finding your creator';
    return '<article class="pj-card" data-reveal><header class="pj-head">' + ring(pct) + '<div class="pj-title"><h3>' + e(p.title) + '</h3><p class="muted">' + who + '</p><p class="pj-due ' + (left < 7 ? 'soon' : '') + '">' + icon('calendar', 20) + '<span>' + ui.date(p.deadline, { month: 'long', day: 'numeric' }) + ' · <b>' + leftLabel(left) + '</b></span></p></div>' +
      (c ? '<a class="btn btn-ghost btn-sm" href="#/messages/' + c.id + '">' + icon('message', 20) + '<span>Message</span></a>' : '') + '</header>' +
      (p.note ? '<p class="pj-note"><b>Your request:</b> ' + e(p.note) + '</p>' : '') +
      '<ol class="ms-list">' + p.milestones.map(function (m, i) { return milestone(p, m, i, role); }).join('') + '</ol></article>';
  }

  return {
    title: function () { return 'My Projects'; },
    render: function () {
      return '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="pjg" x1="0" x2="1"><stop offset="0" stop-color="#2563EB"/><stop offset="1" stop-color="#34D399"/></linearGradient></defs></svg><div class="wrap page-pad" id="dash"></div>';
    },
    mount: function (root, _, query) {
      var box = root.querySelector('#dash'), tab = query.tab || 'projects';
      function draw(rise) {
        var st = W.store.get(), role = st.role, name = st.user ? st.user.name.split(' ')[0] : '';
        var active = st.projects.filter(function (p) { return p.milestones.some(function (m) { return m.state !== 'done'; }); }).length;
        var waiting = st.projects.reduce(function (t, p) { return t + p.milestones.filter(function (m) { return role === 'client' ? m.state === 'review' : m.state === 'active'; }).length; }, 0);
        var tabs = [['projects', 'Projects', 'clipboard', st.projects.length], ['appointments', 'Appointments', 'calendar', st.bookings.length], ['designs', 'My Designs', 'grid', st.licenses.length]];
        box.innerHTML = ui.head('My projects', name ? 'Welcome back, ' + e(name) + '!' : 'Your projects at a glance', 'See what is finished and what comes next.') +
          '<div class="role-row" data-reveal><span id="role-l">I am viewing as:</span><div class="seg" role="group" aria-labelledby="role-l"><button type="button" class="seg-btn" data-role="client" aria-pressed="' + (role === 'client') + '">' + icon('store', 20) + '<span>Business Owner</span></button><button type="button" class="seg-btn" data-role="creator" aria-pressed="' + (role === 'creator') + '">' + icon('pen', 20) + '<span>Creator</span></button></div></div>' +
          '<ul class="stat-row" data-stagger><li><b data-count="' + active + '">0</b><span>Active projects</span></li><li class="' + (waiting ? 'attn' : '') + '"><b data-count="' + waiting + '">0</b><span>' + (role === 'client' ? 'Waiting for your approval' : 'Waiting for your upload') + '</span></li><li><b data-count="' + st.bookings.length + '">0</b><span>Appointments</span></li><li><b data-count="' + (st.assessment ? st.assessment.score : 0) + '" data-suf="%">0</b><span>' + (st.assessment ? 'Business Check score' : '<a href="#/check">Take the Business Check</a>') + '</span></li></ul>' +
          '<div class="tab-row" role="tablist" aria-label="Sections">' + tabs.map(function (t) { return '<button type="button" role="tab" class="tab-btn" id="tab-' + t[0] + '" data-tab="' + t[0] + '" aria-selected="' + (tab === t[0]) + '">' + icon(t[2], 22) + '<span>' + t[1] + '</span><span class="tab-n">' + t[3] + '</span></button>'; }).join('') + '</div>' +
          '<div role="tabpanel" aria-labelledby="tab-' + tab + '" id="panel">' + panel(st, role) + '</div>';
        ui.animate(box);
        if (rise === false) box.querySelectorAll('[data-reveal]').forEach(function (r) { r.classList.add('in', 'no-anim'); });
        wire();
      }
      function panel(st, role) {
        if (tab === 'appointments') {
          if (!st.bookings.length) return emptyState('calendar', 'No appointments yet', 'Book a session with a business adviser whenever you are ready.', '#/advice', 'Book a Session');
          return '<ul class="bk-list">' + st.bookings.slice().sort(function (a, b) { return a.date < b.date ? -1 : 1; }).map(function (b) {
            var p = b.date.split('-');
            return '<li class="bk-card" data-reveal><span class="bk-date"><b>' + +p[2] + '</b><small>' + new Date(+p[0], +p[1] - 1, 1).toLocaleDateString('en-PH', { month: 'short' }) + '</small></span><div class="bk-info"><h3>' + e(b.topic) + '</h3><p class="muted">With ' + e(b.consultant) + '</p><p>' + ui.date(b.date) + ' at ' + e(b.time) + '</p></div><div class="ms-acts"><button type="button" class="btn btn-ghost btn-sm" data-ics="' + b.id + '">' + icon('download', 20) + '<span>Add to Calendar</span></button><button type="button" class="btn btn-ghost btn-sm danger" data-cancel="' + b.id + '">' + icon('x', 20) + '<span>Cancel</span></button></div></li>';
          }).join('') + '</ul>';
        }
        if (tab === 'designs') {
          if (!st.licenses.length) return emptyState('grid', 'No designs yet', 'Designs you buy will be saved here, ready to use.', '#/templates', 'See Templates');
          return '<div class="tpl-grid">' + st.licenses.map(function (l) {
            var t = d.templates.find(function (x) { return x.id === l.id; });
            return '<article class="tpl-card" data-reveal><div class="tpl-thumb static">' + W.preview.thumb(t) + '</div><div class="tpl-body"><span class="state-chip done">Licensed</span><h3>' + e(t.name) + '</h3><p class="muted small">Bought on ' + new Date(l.at).toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' }) + ' by ' + e(l.method) + '</p><div class="tpl-btns"><button type="button" class="btn btn-ghost btn-sm" data-preview="' + t.id + '">' + icon('eye', 20) + '<span>Open</span></button><a class="btn btn-primary btn-sm" href="#/creators">' + icon('users', 20) + '<span>Get Help Setting Up</span></a></div></div></article>';
          }).join('') + '</div>';
        }
        return '<div class="pj-list">' + st.projects.map(function (p) { return projectCard(p, role); }).join('') + '</div><div class="pj-foot"><p class="sample-note">Sample projects are shown so you can try how this works.</p><button type="button" class="btn-link" id="reset-demo">' + icon('refresh', 20) + '<span>Start over with sample data</span></button></div>';
      }
      function emptyState(ic, title, text, href, label) {
        return '<div class="empty"><span class="icon-tile">' + icon(ic, 34) + '</span><h3>' + title + '</h3><p>' + text + '</p><a class="btn btn-primary" href="' + href + '"><span>' + label + '</span>' + icon('arrowRight', 22) + '</a></div>';
      }
      function parts(v) { var p = v.split(':'); return [p[0], +p[1]]; }
      function wire() {
        box.querySelectorAll('[data-role]').forEach(function (b) { b.onclick = function () { W.store.update(function (st) { st.role = b.dataset.role; }); draw(false); }; });
        box.querySelectorAll('[data-tab]').forEach(function (b) { b.onclick = function () { tab = b.dataset.tab; draw(false); box.querySelector('#tab-' + tab).focus(); }; });
        box.querySelectorAll('[data-approve]').forEach(function (b) {
          b.onclick = function () { var v = parts(b.dataset.approve); W.api.setMilestone(v[0], v[1], { state: 'done' }).then(function () { ui.toast('Approved! The creator has been told.'); ui.confetti(); draw(false); }); };
        });
        box.querySelectorAll('[data-changes]').forEach(function (b) {
          b.onclick = function () {
            var v = parts(b.dataset.changes);
            ui.dialog({
              title: 'What should be changed?', cls: 'dlg-sm',
              html: '<form id="chg" novalidate><div class="field"><label for="chg-t">Tell the creator in your own words</label><textarea id="chg-t" name="text" rows="4"></textarea></div><button class="btn btn-primary btn-block" type="submit">' + icon('send', 22) + '<span>Send to Creator</span></button></form>',
              onMount: function (dlg, api) {
                dlg.querySelector('textarea').focus();
                dlg.querySelector('#chg').onsubmit = function (ev) {
                  ev.preventDefault();
                  if (!ui.required(ev.target, [['text', 'Please type what should be changed.']])) return;
                  W.api.setMilestone(v[0], v[1], { state: 'active', file: null }).then(function () { api.close(); ui.toast('Your request was sent to the creator.'); draw(false); });
                };
              }
            });
          };
        });
        box.querySelectorAll('[data-upload]').forEach(function (inp) {
          inp.onchange = function () {
            if (!inp.files.length) return;
            var v = parts(inp.dataset.upload);
            W.api.setMilestone(v[0], v[1], { state: 'review', file: inp.files[0].name }).then(function () { ui.toast('Your work was uploaded and sent for approval.'); draw(false); });
          };
        });
        box.querySelectorAll('[data-ics]').forEach(function (b) { b.onclick = function () { W.bookingIcs(W.store.get().bookings.find(function (x) { return x.id === b.dataset.ics; })); }; });
        box.querySelectorAll('[data-cancel]').forEach(function (b) {
          b.onclick = function () {
            ui.dialog({
              title: 'Cancel this appointment?', cls: 'dlg-sm',
              html: '<p>Your adviser will be told. You can always book another session.</p><div class="btn-row"><button class="btn btn-ghost" type="button" id="keep">Keep It</button><button class="btn btn-danger" type="button" id="yes">Yes, Cancel It</button></div>',
              onMount: function (dlg, api) {
                dlg.querySelector('#keep').onclick = api.close;
                dlg.querySelector('#yes').onclick = function () { W.api.cancelBooking(b.dataset.cancel).then(function () { api.close(); ui.toast('Your appointment was cancelled.', { kind: 'info' }); draw(false); }); };
              }
            });
          };
        });
        var r = box.querySelector('#reset-demo');
        if (r) r.onclick = function () { W.store.reset(); ui.toast('Sample data has been restored.', { kind: 'info' }); draw(false); };
      }
      draw();
    }
  };
})();
