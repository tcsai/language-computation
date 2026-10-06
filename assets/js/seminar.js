// Lists the talks in schedule.md: upcoming talks first (soonest first), then
// past talks (most recent first). A talk counts as upcoming until the end of
// its day, judged by the visitor's clock.
(function () {
  var box = document.getElementById("seminar-talks");
  if (!box) return;

  var FIELD = /^(Date|Time|Room|Speaker|Title|Abstract):[ \t]*(.*)$/i;
  var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Each talk starts at a "Date:" line; anything before the first one is
  // ignored. Lines that do not start a field continue the previous field.
  function parse(text) {
    var talks = [], talk = null, key = null;
    text.split(/\r?\n/).forEach(function (line) {
      var m = line.match(FIELD);
      if (m) {
        key = m[1].toLowerCase();
        if (key === "date") talks.push(talk = {});
        if (talk) talk[key] = m[2];
      } else if (talk && key) {
        talk[key] += "\n" + line;
      }
    });
    return talks;
  }

  // YYYY-MM-DD, or D-M-YYYY as a fallback. Returns a local Date or null.
  function parseDate(s) {
    var m = s.trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/), y, mo, d;
    if (m) { y = +m[1]; mo = +m[2]; d = +m[3]; }
    else if ((m = s.trim().match(/^(\d{1,2})[-./](\d{1,2})[-./](\d{4})$/))) { y = +m[3]; mo = +m[2]; d = +m[1]; }
    else return null;
    var date = new Date(y, mo - 1, d);
    return date.getMonth() === mo - 1 && date.getDate() === d ? date : null;
  }

  function oneLine(s) {
    return (s || "").replace(/\s+/g, " ").trim();
  }

  function paragraphs(s) {
    return (s || "").trim().split(/\n\s*\n/).map(oneLine).filter(Boolean);
  }

  function renderTalk(talk) {
    var d = talk.date, title = oneLine(talk.title), abstract = paragraphs(talk.abstract);
    var when = [DAYS[d.getDay()] + " " + d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear(),
      oneLine(talk.time).replace(/\s*-\s*/, "–"), oneLine(talk.room)].filter(Boolean).join(", ");
    return '<li class="talk">' +
      '<p class="talk-date">' + escapeHtml(when) + "</p>" +
      '<p class="talk-speaker">' + escapeHtml(oneLine(talk.speaker)) + "</p>" +
      (title ? '<p class="talk-title">' + escapeHtml(title) + "</p>"
             : '<p class="talk-title talk-tba">Title to be announced</p>') +
      (abstract.length ? "<details><summary>Abstract</summary>" +
        abstract.map(function (p) { return "<p>" + escapeHtml(p) + "</p>"; }).join("") +
        "</details>" : "") +
      "</li>";
  }

  function section(heading, talks) {
    return "<h2>" + heading + "</h2>" +
      '<ul class="talks">' + talks.map(renderTalk).join("") + "</ul>";
  }

  var talks = parse(JSON.parse(box.dataset.schedule || '""')).filter(function (talk) {
    talk.date = parseDate(talk.date);
    if (!talk.date) console.warn("Seminar: skipping talk with unreadable date", talk);
    return talk.date;
  });
  talks.sort(function (a, b) { return a.date - b.date; });

  var now = new Date();
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var upcoming = talks.filter(function (talk) { return talk.date >= today; });
  var past = talks.filter(function (talk) { return talk.date < today; }).reverse();

  box.innerHTML = (upcoming.length ? section("Upcoming", upcoming)
      : "<h2>Upcoming</h2><p>No upcoming talks scheduled yet.</p>") +
    (past.length ? section("Past", past) : "");
})();
