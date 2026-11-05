/* Draws each template with real photos: a light picture for catalog cards, and a full responsive page for the preview window.
   If a photo cannot load (for example, when offline), the template's colors show in its place. */
W.preview = (function () {
  var e = function (s) { return W.ui.esc(s); };
  var P = W.photos;
  var content = function (t) { return W.data.sectorContent[t.sector]; };

  /* ---------- Catalog picture: real text and photos, sized with CSS so it scales with the card ---------- */
  function shotImg(key, cls) {
    return '<span class="shot-ph ' + (cls || '') + '"><img src="' + P.url(key, 640) + '" alt="" loading="lazy" onerror="this.remove()"></span>';
  }
  function thumb(t) {
    var c = content(t), biz = e(c.biz), hero = P.hero(t), items = P.items(t), o = '';
    var bar = '<span class="shot-bar"><i></i><i></i><i></i><u></u></span>';
    var row = '<span class="shot-row">' + c.items.map(function (it, i) {
      return '<span class="shot-card">' + shotImg(items[i]) + '<b>' + e(it[0]) + '</b><em>' + e(it[1]) + '</em></span>';
    }).join('') + '</span>';
    var nav = '<span class="shot-nav"><b>' + biz + '</b><span class="shot-links"><i>' + e(c.itemsTitle) + '</i><i>About</i><i>Contact</i></span></span>';
    if (t.layout === 'split') {
      o = bar + nav + '<span class="shot-split"><span class="shot-copy"><b class="shot-h">' + e(c.tagline) + '</b><span class="shot-cta">Message Us</span></span>' + shotImg(hero, 'shot-round') + '</span>' + row;
    } else if (t.layout === 'center') {
      o = bar + nav + '<span class="shot-center">' + shotImg(hero, 'shot-fill') + '<span class="shot-veil"></span><span class="shot-copy"><b class="shot-h">' + e(c.tagline) + '</b><span class="shot-cta w">Message Us</span></span></span>' + row;
    } else if (t.layout === 'mag') {
      var other = P.items(t).filter(function (k) { return k !== hero; });
      o = bar + nav + '<span class="shot-mag"><span class="shot-big">' + shotImg(hero, 'shot-fill') + '<span class="shot-veil"></span><b class="shot-h">' + e(c.tagline) + '</b></span><span class="shot-side"><span class="shot-box"><b>This week</b><em>' + e(c.offer) + '</em></span><span class="shot-two">' + shotImg(other[0], 'shot-round') + shotImg(other[1], 'shot-round') + '</span></span></span>';
    } else if (t.layout === 'app') {
      var rows = c.items.map(function (it, i) { return '<span class="shot-li">' + shotImg(items[i]) + '<span><b>' + e(it[0]) + '</b><em>' + e(it[1]) + '</em></span></span>'; }).join('');
      o = '<span class="shot-app"><span class="shot-phone back">' + shotImg(items[1], 'shot-top') + '<span class="shot-list">' + rows + '</span></span><span class="shot-phone">' + shotImg(hero, 'shot-top') + '<b class="shot-apph">' + biz + '</b><span class="shot-list">' + rows + '</span></span></span>';
    } else {
      o = shotImg(hero, 'shot-fill') + '<span class="shot-tint"></span><span class="shot-poster"><b class="who">' + biz + '</b><b class="big">' + e(P.headline(t)) + '</b><em>' + e(c.offer) + '</em><span class="shot-cta w">Visit us today</span></span>';
    }
    var v = '--a:' + t.pal[0] + ';--b:' + t.pal[1] + ';--bg:' + t.pal[2] + ';--ink:' + t.pal[3];
    return '<span class="shot" style="' + v + '" role="img" aria-label="Picture of the ' + e(t.name) + ' design">' + o + '</span>';
  }

  /* ---------- The full template page, with real media queries for the screen-size buttons ---------- */
  function bg(key, grad, w) {
    return 'background-image:' + (grad ? grad + ',' : '') + "url('" + P.url(key, w || 1280) + "')";
  }
  var tick = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

  function head(t, css) {
    var a = t.pal[0], b = t.pal[1], s = t.pal[2], ink = t.pal[3];
    return '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"><style>*{box-sizing:border-box;margin:0}html{scroll-behavior:smooth}body{font-family:Poppins,system-ui,sans-serif;background:' + s + ';color:' + ink + ';line-height:1.6;font-size:17px}a{color:inherit;text-decoration:none}.ph{background-color:' + a + ';background-image:linear-gradient(135deg,' + a + ',' + b + ');background-size:cover;background-position:center}.btn{display:inline-block;padding:14px 30px;border-radius:40px;font-weight:700;background:' + a + ';color:#fff}.btn.w{background:#fff;color:' + a + '}' + css + '</style></head><body>';
  }

  function poster(t) {
    var c = content(t), a = t.pal[0], hero = P.hero(t);
    return head(t, 'html,body{height:100%}body{overflow:hidden;background:' + a + ';color:#fff}main{height:100%;background-size:cover;background-position:center;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:2.4vmin;padding:7vmin}.big{font-size:clamp(34px,12vmin,110px);font-weight:800;line-height:1.05;max-width:9em}.who{font-size:clamp(16px,4.4vmin,36px);font-weight:700}.off{font-size:clamp(16px,4.6vmin,36px);font-weight:500;max-width:18em;line-height:1.3}.btn{font-size:clamp(14px,3.8vmin,28px);padding:.6em 1.4em;margin-top:1vmin}main{position:relative}main>*{position:relative}main::before{content:"";position:absolute;inset:0;background:linear-gradient(100deg,' + a + 'F2 0%,' + a + 'CC 48%,' + a + '22 82%)}@media(max-aspect-ratio:1/1){main{justify-content:flex-end}main::before{background:linear-gradient(' + a + '00 25%,' + a + 'E6 62%,' + a + 'FA 100%)}}') +
      '<main class="poster" style="' + bg(hero) + '"><div class="who">' + e(c.biz) + '</div><div class="big">' + e(P.headline(t)) + '</div><div class="off">' + e(c.offer) + '</div><a class="btn w">Visit us today</a></main></body></html>';
  }

  function app(t, bizName) {
    var c = content(t), a = t.pal[0], ink = t.pal[3], biz = e(bizName || c.biz), photos = P.items(t);
    var label = { t12: 'Add', t13: 'Book', t14: 'Get' }[t.id] || 'Add', tabs = { t12: 'Orders', t13: 'Bookings', t14: 'Rewards' }[t.id] || 'Orders';
    var stamps = t.id === 't14' ? '<section class="stamp"><h2>Your suki card</h2><p>Buy 10 times, and your next item is free.</p><div class="dots">' + [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (n) { return '<span class="' + (n <= 6 ? 'on' : '') + '">' + (n <= 6 ? tick : n) + '</span>'; }).join('') + '</div></section>' : '';
    return head(t, 'body{max-width:560px;margin:auto;min-height:100vh;padding-bottom:88px;position:relative;background-color:' + t.pal[2] + '}.top{padding:56px 24px 54px;color:#fff;border-radius:0 0 28px 28px;background-size:cover;background-position:center}.top small{font-size:15px;font-weight:600}.top h1{font-size:30px;line-height:1.15;margin:4px 0 8px}.top p{font-size:16px;line-height:1.4}.offer{margin:-30px 18px 0;position:relative;background:#fff;border-radius:18px;padding:14px 18px;font-weight:700;box-shadow:0 8px 22px rgba(0,0,0,.12);color:' + a + '}h2{font-size:21px;line-height:1.25}.list{padding:22px 18px;display:grid;gap:14px}.it{background:#fff;border-radius:18px;padding:12px;display:flex;align-items:center;gap:14px;box-shadow:0 6px 18px rgba(0,0,0,.07)}.ib{width:84px;height:84px;border-radius:14px;flex:none}.it b{display:block;font-size:17px;line-height:1.25}.it span{color:' + a + ';font-weight:700;font-size:18px}.add{margin-left:auto;background:' + a + ';color:#fff;border-radius:12px;padding:12px 18px;font-weight:700}.stamp{margin:22px 18px 0;background:#fff;border-radius:18px;padding:18px;box-shadow:0 6px 18px rgba(0,0,0,.07)}.stamp p{margin:4px 0 12px;font-size:15px}.dots{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}.dots span{aspect-ratio:1;border-radius:50%;border:2px dashed ' + a + ';display:grid;place-items:center;font-weight:700;color:' + a + '}.dots .on{background:' + a + ';color:#fff;border-style:solid}.tabs{position:fixed;bottom:0;left:0;right:0;max-width:560px;margin:auto;background:#fff;display:flex;justify-content:space-around;padding:18px 10px;font-weight:600;font-size:15px;box-shadow:0 -4px 16px rgba(0,0,0,.08)}.tabs b{color:' + a + '}') +
      '<header class="top ph" style="' + bg(P.hero(t), 'linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.72))', 960) + '"><small>Welcome to</small><h1>' + biz + '</h1><p>' + e(c.tagline) + '</p></header><div class="offer">' + e(c.offer) + '</div>' + stamps +
      '<div class="list"><h2>' + e(c.itemsTitle) + '</h2>' + c.items.map(function (i, n) { return '<div class="it"><div class="ib ph" style="' + bg(photos[n], '', 320) + '"></div><div><b>' + e(i[0]) + '</b><span>' + e(i[1]) + '</span></div><div class="add">' + label + '</div></div>'; }).join('') + '</div><nav class="tabs"><b>Home</b><span>' + tabs + '</span><span>Messages</span><span>Profile</span></nav></body></html>';
  }

  function page(t, bizName) {
    if (t.layout === 'poster') return poster(t);
    if (t.layout === 'app') return app(t, bizName);
    var c = content(t), a = t.pal[0], ink = t.pal[3], biz = e(bizName || c.biz), hero = P.hero(t), photos = P.items(t), others = photos.filter(function (k) { return k !== hero; }), dark = 'linear-gradient(rgba(0,0,0,.48),rgba(0,0,0,.68))';
    var nav = '<nav><b>' + biz + '</b><div class="links"><a href="#items">' + e(c.itemsTitle) + '</a><a href="#about">About</a><a href="#contact">Contact</a></div></nav>';
    var heroes = {
      split: '<section class="hero split"><div><h1>' + e(c.tagline) + '</h1><p>' + e(c.about) + '</p><a class="btn" href="#contact">Message Us</a></div><div class="art ph" style="' + bg(hero) + '" role="img" aria-label="Photo of ' + biz + '"></div></section>',
      center: '<section class="hero center ph" style="' + bg(hero, dark, 1920) + '"><h1>' + e(c.tagline) + '</h1><p>' + e(c.about) + '</p><a class="btn w" href="#contact">Message Us</a></section>',
      mag: '<section class="hero mag"><div class="art big ph" style="' + bg(hero, 'linear-gradient(rgba(0,0,0,.05) 30%,rgba(0,0,0,.78))') + '"><h1>' + e(c.tagline) + '</h1></div><div class="stack"><div class="box"><p>' + e(c.about) + '</p><a class="btn" href="#contact">Message Us</a></div><div class="box tint"><b>This week</b><p>' + e(c.offer) + '</p></div></div></section>'
    };
    return head(t, 'nav{display:flex;justify-content:space-between;align-items:center;gap:12px 24px;padding:18px 5vw;background:#fff;flex-wrap:wrap;position:sticky;top:0;z-index:2;box-shadow:0 1px 0 rgba(0,0,0,.06)}nav b{font-size:21px;color:' + a + '}.links{display:flex;gap:22px;font-weight:500;flex-wrap:wrap}.hero{padding:56px 5vw}.hero h1{font-size:clamp(32px,5vw,56px);line-height:1.12;margin-bottom:16px}.hero p{font-size:18px;margin-bottom:24px;max-width:36em}.split{display:grid;grid-template-columns:1.1fr 1fr;gap:44px;align-items:center}.art{border-radius:24px;min-height:360px}.center{text-align:center;color:#fff;padding-block:110px}.center p{margin-inline:auto}.mag{display:grid;grid-template-columns:1.4fr 1fr;gap:24px}.art.big{padding:36px;display:flex;align-items:flex-end;color:#fff;min-height:470px}.art.big h1{margin:0}.stack{display:grid;gap:24px}.box{background:#fff;border-radius:24px;padding:30px;align-content:center;display:grid;justify-items:start}.box.tint{background:' + a + ';color:#fff}.box.tint p{margin:6px 0 0}.box b{font-size:20px}.trust{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:0 5vw}.trust div{display:flex;align-items:center;gap:10px;font-weight:600;background:#fff;border-radius:16px;padding:16px 18px}.trust svg{color:' + a + ';flex:none}.sec{padding:56px 5vw}.sec h2{font-size:clamp(26px,3vw,34px);margin-bottom:24px;line-height:1.2}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}.card{background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.07)}.pic{height:210px}.ct{padding:18px 20px 22px}.card b{display:block;font-size:19px;line-height:1.3}.card span{display:block;font-weight:700;color:' + a + ';font-size:22px;margin-top:4px}.about{display:grid;grid-template-columns:1fr 1.1fr;gap:44px;align-items:center;padding:0 5vw 56px}.about .art{min-height:340px}.about ul{list-style:none;padding:0;display:grid;gap:10px;margin-top:16px}.about li{display:flex;gap:10px;align-items:center;font-weight:500}.about svg{color:' + a + ';flex:none}.band{margin:0 5vw;border-radius:24px;padding:64px 32px;font-size:clamp(22px,3vw,34px);font-weight:700;text-align:center;color:#fff;line-height:1.25}.quote{padding:56px 5vw 8px;text-align:center}.quote p{font-size:clamp(19px,2.3vw,25px);font-weight:500;max-width:30em;margin:auto}.quote small{display:block;margin-top:10px;font-size:15px}footer{margin-top:48px;padding:52px 5vw;background:' + ink + ';color:#fff;display:grid;grid-template-columns:1.2fr 1fr;gap:28px;align-items:center}footer h2{font-size:30px;line-height:1.2;margin-bottom:10px}@media(max-width:820px){.split,.mag,.about{grid-template-columns:1fr}.cards{grid-template-columns:1fr 1fr}.art{min-height:280px}.art.big{min-height:360px}.trust{grid-template-columns:1fr}footer{grid-template-columns:1fr}}@media(max-width:520px){.cards{grid-template-columns:1fr}.hero{padding:30px 5vw}.center{padding-block:70px}.links{gap:14px;font-size:15px}.band{padding:44px 22px}}') +
      nav + heroes[t.layout] +
      '<div class="trust"><div>' + tick + '<span>Trusted by neighbors</span></div><div>' + tick + '<span>Clear, fair prices</span></div><div>' + tick + '<span>Message us anytime</span></div></div>' +
      '<section class="sec" id="items"><h2>' + e(c.itemsTitle) + '</h2><div class="cards">' + c.items.map(function (i, n) { return '<div class="card"><div class="pic ph" style="' + bg(photos[n], '', 640) + '" role="img" aria-label="' + e(i[0]) + '"></div><div class="ct"><b>' + e(i[0]) + '</b><span>' + e(i[1]) + '</span></div></div>'; }).join('') + '</div></section>' +
      '<section class="about" id="about"><div class="art ph" style="' + bg(others[others.length - 1], '', 960) + '" role="img" aria-label="More from ' + biz + '"></div><div><h2>About ' + biz + '</h2><p>' + e(c.about) + '</p><ul><li>' + tick + '<span>Run by a local family</span></li><li>' + tick + '<span>Open Monday to Saturday</span></li><li>' + tick + '<span>Easy to reach by phone or message</span></li></ul></div></section>' +
      '<div class="band ph" style="' + bg(others[0], dark, 1280) + '">' + e(c.offer) + '</div>' +
      '<section class="quote"><p>"Friendly service and good value. I tell all my neighbors to come here."</p><small>Sample customer review</small></section>' +
      '<footer id="contact"><div><h2>Visit or message us</h2><p>Open Monday to Saturday, 8:00 AM to 6:00 PM<br>0917 000 0000 · Your barangay, your city</p></div><div><a class="btn w" href="#contact">Send a Message</a></div></footer></body></html>';
  }

  /* Which screen sizes make sense for each product type. */
  function sizes(t) {
    if (t.type === 'website') return [{ id: 'd', label: 'Computer', icon: 'monitor', w: 1200, h: 800 }, { id: 't', label: 'Tablet', icon: 'tablet', w: 768, h: 960 }, { id: 'p', label: 'Phone', icon: 'phone', w: 390, h: 780 }];
    if (t.type === 'app') return [{ id: 'p', label: 'Phone', icon: 'phone', w: 390, h: 780 }, { id: 't', label: 'Tablet', icon: 'tablet', w: 768, h: 960 }];
    return [{ id: 'w', label: 'Wide cover', icon: 'monitor', w: 1200, h: 450 }, { id: 's', label: 'Square post', icon: 'image', w: 800, h: 800 }, { id: 'p', label: 'Tall story', icon: 'phone', w: 450, h: 800 }];
  }
  return { thumb: thumb, page: page, sizes: sizes };
})();
