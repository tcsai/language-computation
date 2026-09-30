// Shows the most recent Bluesky posts by the accounts listed under
// bluesky_feed in _config.yml, newest first, laid out like a Bluesky timeline.
// Reposts, replies and posts quoting someone outside the unit are skipped.
(function () {
  var list = document.getElementById("feed");
  if (!list) return;

  var API = "https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed";
  var MAX_POSTS = 20;
  var accounts = JSON.parse(list.dataset.accounts || "[]");
  var names = {};
  accounts.forEach(function (a) { names[a.handle] = a.name; });

  var ICONS = {
    reply: '<path d="M3 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-4 3v-3a2 2 0 0 1-2-2z"/>',
    repost: '<path d="M13 2l3 3-3 3M16 5H6a2 2 0 0 0-2 2v2M7 18l-3-3 3-3M4 15h10a2 2 0 0 0 2-2v-2"/>',
    like: '<path d="M10 17s-6.5-4-6.5-8.5A3.5 3.5 0 0 1 10 6a3.5 3.5 0 0 1 6.5 2.5C16.5 13 10 17 10 17z"/>'
  };
  var fullDate = new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeStyle: "short" });

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function isWebUrl(url) {
    return /^https?:\/\//.test(url || "");
  }

  function link(href, label, className) {
    if (!isWebUrl(href)) return label;
    return '<a href="' + escapeHtml(href) + '"' +
      (className ? ' class="' + className + '"' : "") + ">" + label + "</a>";
  }

  function profileUrl(author) {
    return "https://bsky.app/profile/" + author.handle;
  }

  function postUrl(post) {
    return profileUrl(post.author) + "/post/" + post.uri.split("/").pop();
  }

  // Short time as Bluesky shows it: 5m, 3h, 2d, then "Sep 5" (with the year
  // if it is not this year).
  function shortTime(date) {
    var seconds = (Date.now() - date.getTime()) / 1000;
    if (seconds < 3600) return Math.max(1, Math.floor(seconds / 60)) + "m";
    if (seconds < 86400) return Math.floor(seconds / 3600) + "h";
    if (seconds < 7 * 86400) return Math.floor(seconds / 86400) + "d";
    var options = { month: "short", day: "numeric" };
    if (date.getFullYear() !== new Date().getFullYear()) options.year = "numeric";
    return date.toLocaleDateString("en-US", options);
  }

  // Post text as HTML, with links, mentions and hashtags taken from the post's
  // facets (which index the text by UTF-8 byte offsets).
  function renderText(record) {
    var bytes = new TextEncoder().encode(record.text || "");
    var decoder = new TextDecoder();
    var slice = function (a, b) { return escapeHtml(decoder.decode(bytes.slice(a, b))); };
    var facets = (record.facets || []).slice().sort(function (a, b) {
      return a.index.byteStart - b.index.byteStart;
    });
    var html = "", pos = 0;
    facets.forEach(function (facet) {
      var start = facet.index.byteStart, end = facet.index.byteEnd;
      if (start < pos) return;
      var f = facet.features[0] || {};
      var href = f.uri ||
        (f.did && "https://bsky.app/profile/" + f.did) ||
        (f.tag && "https://bsky.app/hashtag/" + encodeURIComponent(f.tag)) || "";
      html += slice(pos, start) + link(href, slice(start, end));
      pos = end;
    });
    return (html + slice(pos, bytes.length)).replace(/\n/g, "<br>");
  }

  function avatar(author, className) {
    return isWebUrl(author.avatar)
      ? '<img class="' + className + '" src="' + escapeHtml(author.avatar) + '" alt="" loading="lazy">'
      : '<span class="' + className + '"></span>';
  }

  // Name, handle and time. Quoted posts get a small avatar in front.
  function header(author, date, url, withAvatar) {
    var name = names[author.handle] || author.displayName || author.handle;
    var time = '<time datetime="' + date.toISOString() + '" title="' +
      escapeHtml(fullDate.format(date)) + '">' + shortTime(date) + "</time>";
    return '<div class="post-header">' +
      (withAvatar ? avatar(author, "post-quote-avatar") : "") +
      link(profileUrl(author),
        '<span class="post-name">' + escapeHtml(name) + "</span>" +
        '<span class="post-handle">@' + escapeHtml(author.handle) + "</span>", "post-author") +
      '<span class="post-dot">·</span>' + link(url, time, "post-time") + "</div>";
  }

  function renderImages(images) {
    images = images.filter(function (img) { return isWebUrl(img.thumb); });
    if (!images.length) return "";
    return '<div class="post-images" data-count="' + images.length + '">' +
      images.map(function (img) {
        var ratio = img.aspectRatio ? ' style="aspect-ratio: ' + img.aspectRatio.width + " / " +
          img.aspectRatio.height + '"' : "";
        return link(img.fullsize, '<img src="' + escapeHtml(img.thumb) + '" alt="' +
          escapeHtml(img.alt || "") + '"' + ratio + ' loading="lazy">');
      }).join("") + "</div>";
  }

  function renderCard(ext) {
    if (!isWebUrl(ext.uri)) return "";
    var domain = ext.uri.replace(/^https?:\/\//, "").split("/")[0].replace(/^www\./, "");
    return '<a class="post-card" href="' + escapeHtml(ext.uri) + '">' +
      (isWebUrl(ext.thumb) ? '<img src="' + escapeHtml(ext.thumb) + '" alt="" loading="lazy">' : "") +
      '<span class="post-card-text"><span class="post-card-title">' +
      escapeHtml(ext.title || ext.uri) + "</span>" +
      (ext.description ? '<span class="post-card-description">' + escapeHtml(ext.description) + "</span>" : "") +
      '<span class="post-card-domain">' + escapeHtml(domain) + "</span></span></a>";
  }

  function renderVideo(video, url) {
    if (!isWebUrl(video.thumbnail)) return "";
    return link(url, '<span class="post-video"><img src="' + escapeHtml(video.thumbnail) +
      '" alt="' + escapeHtml(video.alt || "Video") + '" loading="lazy"></span>');
  }

  function renderMedia(embed, url) {
    if (!embed) return "";
    if (embed.$type === "app.bsky.embed.images#view") return renderImages(embed.images);
    if (embed.$type === "app.bsky.embed.external#view") return renderCard(embed.external);
    if (embed.$type === "app.bsky.embed.video#view") return renderVideo(embed, url);
    return "";
  }

  function renderQuote(record) {
    if (!record || !record.value || !record.author) return "";
    var url = postUrl(record);
    var media = (record.embeds || []).map(function (e) { return renderMedia(e, url); }).join("");
    return '<div class="post-quote" data-url="' + escapeHtml(url) + '">' +
      header(record.author, new Date(record.value.createdAt), url, true) +
      '<div class="post-text">' + renderText(record.value) + "</div>" + media + "</div>";
  }

  function renderEmbed(embed, url) {
    if (!embed) return "";
    if (embed.$type === "app.bsky.embed.record#view") return renderQuote(embed.record);
    if (embed.$type === "app.bsky.embed.recordWithMedia#view") {
      return renderMedia(embed.media, url) + renderQuote(embed.record.record);
    }
    return renderMedia(embed, url);
  }

  function action(icon, count, label) {
    count = count || 0;
    return '<span class="post-action" title="' + count + " " + label + '">' +
      '<svg viewBox="0 0 20 20" aria-hidden="true">' + ICONS[icon] + "</svg>" +
      (count ? count : "") + "</span>";
  }

  function renderPost(post) {
    var url = postUrl(post);
    return '<li class="post" data-url="' + escapeHtml(url) + '">' +
      link(profileUrl(post.author), avatar(post.author, "post-avatar"), "post-avatar-link") +
      '<div class="post-body">' +
      header(post.author, new Date(post.record.createdAt), url, false) +
      '<div class="post-text">' + renderText(post.record) + "</div>" +
      renderEmbed(post.embed, url) +
      '<div class="post-actions">' +
      action("reply", post.replyCount, "replies") +
      action("repost", (post.repostCount || 0) + (post.quoteCount || 0), "reposts") +
      action("like", post.likeCount, "likes") +
      "</div></div></li>";
  }

  // Handle of the account whose post this post quotes, if any.
  function quotedHandle(embed) {
    if (embed && embed.$type === "app.bsky.embed.recordWithMedia#view") embed = embed.record;
    if (embed && embed.$type === "app.bsky.embed.record#view" && embed.record && embed.record.author) {
      return embed.record.author.handle;
    }
    return null;
  }

  function fetchPosts(account) {
    var url = API + "?filter=posts_no_replies&limit=30&actor=" + encodeURIComponent(account.handle);
    return fetch(url)
      .then(function (response) { return response.ok ? response.json() : { feed: [] }; })
      .then(function (data) {
        return data.feed
          .filter(function (item) {
            var quoted = quotedHandle(item.post.embed);
            return !item.reason && (!quoted || quoted in names);
          })
          .map(function (item) { return item.post; });
      })
      .catch(function () { return []; });
  }

  // Clicking anywhere on a post (or quoted post) opens it on Bluesky.
  list.addEventListener("click", function (event) {
    if (event.target.closest("a") || String(window.getSelection())) return;
    var target = event.target.closest("[data-url]");
    if (target) window.location.href = target.dataset.url;
  });

  Promise.all(accounts.map(fetchPosts)).then(function (results) {
    var posts = [].concat.apply([], results)
      .sort(function (a, b) { return new Date(b.record.createdAt) - new Date(a.record.createdAt); })
      .slice(0, MAX_POSTS);
    list.innerHTML = posts.length
      ? posts.map(renderPost).join("")
      : '<li class="feed-status">No posts to show right now.</li>';
  });
})();
