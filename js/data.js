/* Loads the site's fixed content from the JSON files in the data folder. All of it is sample content.
   Things users create (cart, messages, bookings, projects) are saved in the browser by js/store.js.
   Pages keep a reference to W.data, so the files are merged into this same object. */
W.data = {};
W.dataReady = Promise.all(['categories', 'templates', 'creators', 'consultants', 'content', 'photos'].map(function (name) {
  return fetch('data/' + name + '.json').then(function (res) {
    if (!res.ok) throw new Error('Could not load data/' + name + '.json');
    return res.json();
  }).then(function (json) {
    return name === 'photos' ? { photos: json } : json;
  });
})).then(function (parts) {
  parts.forEach(function (part) { Object.assign(W.data, part); });
});
