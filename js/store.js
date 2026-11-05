/* Client-side state saved in localStorage. Stands in for the database until the backend exists. */
W.store = (function () {
  var KEY = 'webify.v1', listeners = [], mem = null;
  function daysFromNow(n) { var d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); }
  function seed() {
    return {
      prefs: { text: 1, contrast: false, calm: false },
      user: null, role: 'client', cart: [], licenses: [], bookings: [], assessment: null,
      projects: [{
        id: 'p1', sample: true, title: 'Bakery Website', template: 'Karinderya Classic', creatorId: 'c1', client: 'Your Business', deadline: daysFromNow(16),
        milestones: [
          { title: 'Share your photos and prices', due: daysFromNow(-9), state: 'done' },
          { title: 'First design of your website', due: daysFromNow(-2), state: 'done', file: 'first-design.pdf' },
          { title: 'Add your menu and contact details', due: daysFromNow(4), state: 'review', file: 'website-draft-2.pdf' },
          { title: 'Final check and go live', due: daysFromNow(16), state: 'todo' }
        ]
      }, {
        id: 'p2', sample: true, title: 'New Logo and Tarpaulin', template: 'Grand Opening Banner', creatorId: 'c2', client: 'Your Business', deadline: daysFromNow(27),
        milestones: [
          { title: 'Tell the designer about your business', due: daysFromNow(2), state: 'active' },
          { title: 'Choose from 3 logo designs', due: daysFromNow(10), state: 'todo' },
          { title: 'Receive print-ready tarpaulin file', due: daysFromNow(27), state: 'todo' }
        ]
      }],
      threads: {
        c1: { unread: 1, messages: [
          { from: 'me', text: 'Good morning! Is the design of my website ready?', at: Date.now() - 86400000 },
          { from: 'them', text: 'Good morning po! Yes, I have uploaded the second draft to My Projects. Please take a look when you are free.', at: Date.now() - 3600000 }
        ] }
      }
    };
  }
  function load() {
    if (mem) return mem;
    try { var raw = localStorage.getItem(KEY); mem = raw ? JSON.parse(raw) : seed(); } catch (e) { mem = seed(); }
    return mem;
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) { /* private mode: keep working from memory */ } }
  function notify() { listeners.forEach(function (l) { l(mem); }); }
  return {
    get: load,
    update: function (fn) { fn(load()); save(); notify(); },
    on: function (fn) { listeners.push(fn); },
    reset: function () { var prefs = load().prefs; mem = seed(); mem.prefs = prefs; save(); notify(); }
  };
})();
