/* The only file that knows where data comes from.
   Every function is async and returns plain objects, so replacing a body with fetch('/api/...') later
   needs no change in the pages. W.realtime mirrors the Socket.io events the chat will use. */
W.api = (function () {
  var d = W.data, s = W.store;
  var wait = function (v) { return new Promise(function (r) { setTimeout(function () { r(v); }, 120); }); };
  var norm = function (t) { return String(t || '').toLowerCase().trim(); };
  var dueIn = function (n) { var x = new Date(); x.setDate(x.getDate() + n); return x.toISOString().slice(0, 10); };
  return {
    listTemplates: function (f) {
      f = f || {};
      var q = norm(f.q);
      var out = d.templates.filter(function (t) {
        if (f.type && t.type !== f.type) return false;
        if (f.sector && t.sector !== f.sector) return false;
        if (!q) return true;
        var sec = d.sectors.find(function (x) { return x.id === t.sector; });
        var ty = d.types.find(function (x) { return x.id === t.type; });
        return norm(t.name + ' ' + t.desc + ' ' + sec.name + ' ' + ty.name + ' ' + ty.one).indexOf(q) > -1;
      });
      if (f.sort === 'low') out.sort(function (a, b) { return a.price - b.price; });
      else if (f.sort === 'high') out.sort(function (a, b) { return b.price - a.price; });
      else if (f.sort === 'rated') out.sort(function (a, b) { return b.rating - a.rating; });
      else out.sort(function (a, b) { return b.sold - a.sold; });
      return wait(out);
    },
    listCreators: function (f) {
      f = f || {};
      var q = norm(f.q);
      return wait(d.creators.filter(function (c) {
        if (f.skill && c.skills.indexOf(f.skill) < 0) return false;
        if (f.verified && !c.verified) return false;
        return !q || norm(c.name + ' ' + c.role + ' ' + c.city + ' ' + c.skills.join(' ') + ' ' + c.bio).indexOf(q) > -1;
      }));
    },
    checkout: function (method) {
      s.update(function (st) {
        st.cart.forEach(function (id) {
          if (st.licenses.every(function (l) { return l.id !== id; })) st.licenses.push({ id: id, method: method, at: Date.now() });
        });
        st.cart = [];
      });
      return wait(true);
    },
    createRequest: function (t, form) {
      var p = { id: 'p' + Date.now(), title: form.business + ': ' + t.name, template: t.name, creatorId: null, client: form.business, deadline: dueIn(21), note: form.changes, milestones: [
        { title: 'Webify matches you with a creator', due: dueIn(2), state: 'active' },
        { title: 'Creator sends your changes', due: dueIn(12), state: 'todo' },
        { title: 'Final check and hand-over', due: dueIn(21), state: 'todo' }
      ] };
      s.update(function (st) { st.projects.unshift(p); });
      return wait(p);
    },
    createBooking: function (b) {
      var booking = Object.assign({ id: 'b' + Date.now() }, b);
      s.update(function (st) { st.bookings.push(booking); });
      return wait(booking);
    },
    cancelBooking: function (id) {
      s.update(function (st) { st.bookings = st.bookings.filter(function (b) { return b.id !== id; }); });
      return wait(true);
    },
    setMilestone: function (projectId, index, patch) {
      s.update(function (st) {
        var p = st.projects.find(function (x) { return x.id === projectId; });
        Object.assign(p.milestones[index], patch);
        var next = p.milestones[index + 1];
        if (patch.state === 'done' && next && next.state === 'todo') next.state = 'active';
      });
      return wait(true);
    },
    signIn: function (u) { s.update(function (st) { st.user = u; if (u.role) st.role = u.role; }); return wait(u); },
    signOut: function () { s.update(function (st) { st.user = null; }); return wait(true); }
  };
})();

W.realtime = (function () {
  var handlers = {};
  function emit(ev, data) { (handlers[ev] || []).forEach(function (h) { h(data); }); }
  function reply(creator, text) {
    var t = text.toLowerCase(), first = creator.name.split(' ')[0];
    if (/price|how much|magkano|cost|budget|rate/.test(t)) return 'My rate is ' + creator.rate + '. A simple template setup usually takes 3 to 5 hours. May I know what kind of business you have?';
    if (/when|how long|gaano|deadline|schedule/.test(t)) return 'Most small projects take about one week. If you need it sooner, just tell me your date and I will check my schedule po.';
    if (/thank|salamat/.test(t)) return 'You are very welcome po! Message me anytime.';
    if (/website|logo|design|photo|page|banner|facebook/.test(t)) return 'Yes, I can help with that. Could you share your business name and a few photos? Do not worry if they are only from your phone.';
    if (/hello|hi\b|good|kumusta|magandang/.test(t)) return 'Hello po! This is ' + first + '. Thank you for messaging me. How can I help your business today?';
    return 'Thank you for the details po. I will review this and suggest the simplest next step for you.';
  }
  return {
    on: function (ev, h) {
      (handlers[ev] = handlers[ev] || []).push(h);
      return function () { handlers[ev] = handlers[ev].filter(function (x) { return x !== h; }); };
    },
    send: function (creatorId, text) {
      var creator = W.data.creators.find(function (c) { return c.id === creatorId; });
      W.store.update(function (st) {
        var th = st.threads[creatorId] = st.threads[creatorId] || { unread: 0, messages: [] };
        th.messages.push({ from: 'me', text: text, at: Date.now() });
      });
      emit('message', { creatorId: creatorId });
      setTimeout(function () { emit('typing', { creatorId: creatorId, on: true }); }, 500);
      setTimeout(function () {
        W.store.update(function (st) {
          var th = st.threads[creatorId];
          th.messages.push({ from: 'them', text: reply(creator, text), at: Date.now() });
          if (W.ui.currentThread !== creatorId) th.unread = (th.unread || 0) + 1;
        });
        emit('typing', { creatorId: creatorId, on: false });
        emit('message', { creatorId: creatorId });
      }, 2100);
    }
  };
})();
