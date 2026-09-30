// Shows the most recent Bluesky posts by the accounts listed under
// bluesky_feed in _config.yml, newest first. Reposts, replies and posts
// quoting someone outside the unit are skipped.
(function () {
  var list = document.getElementById("feed");
  if (!list) return;

  var API = "https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed";
  var MAX_POSTS = 20;
  var accounts = JSON.parse(list.dataset.accounts || "[]");
  var memberHandles = accounts.map(function (a) { return a.handle; });
  var dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function link(href, label) {
    if (!/^https?:\/\//.test(href)) return label;
    return '<a href="' + escapeHtml(href) + '">' + label + "</a>";
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

  // A quoted post or a link card attached to the post, if any.
  function renderEmbed(embed) {
    if (!embed) return "";
    if (embed.$type === "app.bsky.embed.recordWithMedia#view") embed = embed.record;
    if (embed.$type === "app.bsky.embed.record#view" && embed.record && embed.record.value) {
      var quoted = embed.record;
      return "<blockquote><p class=\"feed-meta\">" +
        escapeHtml(quoted.author.displayName || quoted.author.handle) + "</p><p>" +
        renderText(quoted.value) + "</p></blockquote>";
    }
    if (embed.$type === "app.bsky.embed.external#view" && embed.external) {
      var ext = embed.external;
      return "<p>" + link(ext.uri, escapeHtml(ext.title || ext.uri)) + "</p>";
    }
    return "";
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
            return !item.reason && (!quoted || memberHandles.indexOf(quoted) !== -1);
          })
          .map(function (item) { return { post: item.post, name: account.name }; });
      })
      .catch(function () { return []; });
  }

  function renderPost(item) {
    var post = item.post;
    var profile = "https://bsky.app/profile/" + post.author.handle;
    var url = profile + "/post/" + post.uri.split("/").pop();
    var date = dateFormat.format(new Date(post.record.createdAt));
    return "<li><p class=\"feed-meta\">" + link(profile, escapeHtml(item.name)) + " · " +
      link(url, date) + "</p><p>" + renderText(post.record) + "</p>" +
      renderEmbed(post.embed) + "</li>";
  }

  Promise.all(accounts.map(fetchPosts)).then(function (results) {
    var posts = [].concat.apply([], results)
      .sort(function (a, b) {
        return new Date(b.post.record.createdAt) - new Date(a.post.record.createdAt);
      })
      .slice(0, MAX_POSTS);
    list.innerHTML = posts.length
      ? posts.map(renderPost).join("")
      : '<li class="feed-meta">No posts to show right now.</li>';
  });
})();
