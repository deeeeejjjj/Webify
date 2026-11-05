/* Direct messaging. The UI only talks to W.realtime, which will wrap Socket.io once the server exists. */
W.pages = W.pages || {};
W.pages.messages = (function () {
  var ui = W.ui, icon = ui.icon, e = ui.esc, d = W.data;
  var QUICK = ['Hello! I need help with my business.', 'How much would a simple website cost?', 'How long will it take?', 'Thank you!'];
  var creator = function (id) { return d.creators.find(function (c) { return c.id === id; }); };
  var time = function (ts) {
    var dt = new Date(ts), today = new Date().toDateString() === dt.toDateString();
    return today ? dt.toLocaleTimeString('en-PH', { hour: 'numeric', minute: '2-digit' }) : dt.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' });
  };

  function list(active) {
    var st = W.store.get(), ids = Object.keys(st.threads).sort(function (a, b) {
      var A = st.threads[a].messages, B = st.threads[b].messages;
      return (B.length ? B[B.length - 1].at : 0) - (A.length ? A[A.length - 1].at : 0);
    });
    if (active && ids.indexOf(active) < 0) ids.unshift(active);
    if (!ids.length) return '<div class="empty small"><p>No conversations yet.</p><a class="btn btn-primary btn-sm" href="#/creators">Find a Creator</a></div>';
    return '<ul class="th-list">' + ids.map(function (id) {
      var c = creator(id), th = st.threads[id] || { messages: [] }, last = th.messages[th.messages.length - 1];
      return '<li><a class="th-item' + (id === active ? ' active' : '') + '" href="#/messages/' + id + '"' + (id === active ? ' aria-current="true"' : '') + '>' + ui.avatar(c) + '<span class="th-text"><b>' + e(c.name) + '</b><small>' + (last ? e(last.text) : e(c.role)) + '</small></span>' + (th.unread && id !== active ? '<span class="count static">' + th.unread + '</span>' : '') + '</a></li>';
    }).join('') + '</ul>';
  }

  function bubbles(id) {
    var th = W.store.get().threads[id];
    if (!th || !th.messages.length) return '<p class="chat-start">' + icon('message', 28) + '<span>Say hello! Press a ready-made message below, or type your own.</span></p>';
    return th.messages.map(function (m) {
      return '<div class="bubble ' + m.from + '"><p>' + e(m.text) + '</p><time>' + time(m.at) + '</time></div>';
    }).join('');
  }

  return {
    title: function (id) { var c = id && creator(id); return c ? 'Message ' + c.name : 'Messages'; },
    render: function (id) {
      var c = id && creator(id);
      return '<div class="wrap page-pad">' + (c ? '<div class="only-phone">' + ui.back('#/messages', 'Back to All Messages') + '</div>' : '') +
        ui.head('Messages', c ? 'Talking with ' + e(c.name) : 'Your messages', c ? '' : 'Choose a person from the list to read and reply.') +
        '<div class="chat-shell' + (c ? ' has-thread' : '') + '" data-reveal><aside class="chat-list" aria-label="Conversations" id="th-list"></aside>' +
        (c ? '<section class="chat-pane" aria-label="Conversation with ' + e(c.name) + '"><header class="chat-head">' + ui.avatar(c) + '<div><b>' + e(c.name) + '</b><small>' + e(c.role) + ' · ' + e(c.replyTime) + '</small></div><a class="btn btn-ghost btn-sm" href="#/creators/' + c.id + '">View Profile</a></header>' +
          '<div class="chat-log" id="log" aria-live="polite"></div><div class="typing" id="typing" hidden><span></span><span></span><span></span><small>' + e(c.name.split(' ')[0]) + ' is typing</small></div>' +
          '<div class="quick" role="group" aria-label="Ready-made messages">' + QUICK.map(function (q) { return '<button type="button" class="chip" data-q="' + e(q) + '">' + e(q) + '</button>'; }).join('') + '</div>' +
          '<form class="chat-form" id="chat-form" novalidate><label for="msg" class="sr-only">Type your message</label><textarea id="msg" rows="1" placeholder="Type here"></textarea><button class="btn btn-primary" type="submit">' + icon('send', 22) + '<span>Send</span></button></form></section>'
          : '<section class="chat-pane empty-pane"><span class="icon-tile">' + icon('message', 34) + '</span><h2>Choose a conversation</h2><p>Or find someone new to talk to.</p><a class="btn btn-primary" href="#/creators"><span>Find a Creator</span>' + icon('arrowRight', 22) + '</a></section>') +
        '</div><p class="sample-note">Replies are simulated in this preview.</p></div>';
    },
    mount: function (root, id) {
      var listEl = root.querySelector('#th-list');
      function drawList() { listEl.innerHTML = list(id && creator(id) ? id : null); }
      if (!id || !creator(id)) { drawList(); return; }
      ui.currentThread = id;
      W.store.update(function (st) { if (st.threads[id]) st.threads[id].unread = 0; });
      drawList();
      var log = root.querySelector('#log'), typing = root.querySelector('#typing'), input = root.querySelector('#msg');
      function drawLog() {
        log.innerHTML = bubbles(id); log.scrollTop = log.scrollHeight;
        var th = W.store.get().threads[id];
        log.parentNode.classList.toggle('has-msgs', !!(th && th.messages.length));
      }
      drawLog();
      function send(text) {
        text = text.trim(); if (!text) { input.focus(); return; }
        W.realtime.send(id, text);
        input.value = ''; input.style.height = ''; input.focus();
      }
      root.querySelector('#chat-form').onsubmit = function (ev) { ev.preventDefault(); send(input.value); };
      input.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' && !ev.shiftKey) { ev.preventDefault(); send(input.value); } });
      input.addEventListener('input', function () { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 160) + 'px'; });
      root.querySelectorAll('[data-q]').forEach(function (b) { b.onclick = function () { send(b.dataset.q); }; });
      var off1 = W.realtime.on('message', function (m) { if (m.creatorId === id) drawLog(); drawList(); });
      var off2 = W.realtime.on('typing', function (t) { if (t.creatorId === id) { typing.hidden = !t.on; log.scrollTop = log.scrollHeight; } });
      return function () { off1(); off2(); };
    }
  };
})();
