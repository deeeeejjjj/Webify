/* Sample template photos, hosted by Wikimedia Commons and shown with credit. The lists are in data/photos.json.
   Each "files" entry is [file name on Commons, author, license]. Replace them with your own licensed photos before selling a template. */
W.photos = (function () {
  var list = function () { return W.data.photos; };

  function url(key, width) {
    return 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(list().files[key][0]).replace(/'/g, '%27') + '?width=' + (width || 960);
  }
  function pageUrl(key) { return 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(list().files[key][0].replace(/ /g, '_')).replace(/'/g, '%27'); }
  function used(t) {
    var keys = [list().hero[t.id]];
    if (t.layout !== 'poster') keys = keys.concat(list().items[t.sector]);
    return keys.filter(function (k, i) { return keys.indexOf(k) === i; });
  }
  function credits(t) {
    return used(t).map(function (k) {
      var f = list().files[k];
      return { title: f[0].replace(/\.[a-z]+$/i, ''), author: f[1], license: f[2], href: pageUrl(k) };
    });
  }
  return {
    url: url,
    hero: function (t) { return list().hero[t.id]; },
    items: function (t) { return list().items[t.sector]; },
    credits: credits,
    headline: function (t) { return list().headline[t.id] || ''; }
  };
})();
