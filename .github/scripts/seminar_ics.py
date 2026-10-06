"""Write seminar.ics, a calendar of the talks in schedule.md.

Run from the repository root: python3 .github/scripts/seminar_ics.py
The file is only rewritten when a talk changed, so repeated runs do not
produce new commits. Times are Dutch local time; a talk without a time is an
all-day event, and one without an end time lasts an hour.
"""

import datetime
import hashlib
import re
from pathlib import Path

SCHEDULE = Path("schedule.md")
OUTPUT = Path("seminar.ics")
FIELD = re.compile(r"^(Date|Time|Room|Speaker|Title|Abstract):[ \t]*(.*)$", re.I)

TIMEZONE = [
    "BEGIN:VTIMEZONE", "TZID:Europe/Amsterdam",
    "BEGIN:DAYLIGHT", "TZOFFSETFROM:+0100", "TZOFFSETTO:+0200", "TZNAME:CEST",
    "DTSTART:19700329T020000", "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU", "END:DAYLIGHT",
    "BEGIN:STANDARD", "TZOFFSETFROM:+0200", "TZOFFSETTO:+0100", "TZNAME:CET",
    "DTSTART:19701025T030000", "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU", "END:STANDARD",
    "END:VTIMEZONE",
]


def site_url():
    """The Seminar page's address, from url and baseurl in _config.yml."""
    config = Path("_config.yml").read_text(encoding="utf-8")
    value = lambda key: re.search(rf'^{key}:\s*"?([^"\n]*)"?', config, re.M).group(1).strip()
    return value("url") + value("baseurl") + "/seminar.html"


def parse(text):
    """Same rules as assets/js/seminar.js: each talk starts at a Date line, and
    lines that do not start a field continue the previous one."""
    talks, talk, key = [], None, None
    for line in text.splitlines():
        m = FIELD.match(line)
        if m:
            key = m.group(1).lower()
            if key == "date":
                talk = {}
                talks.append(talk)
            if talk is not None:
                talk[key] = m.group(2)
        elif talk is not None and key:
            talk[key] += "\n" + line
    return talks


def parse_date(s):
    s = s.strip()
    for pattern, order in ((r"(\d{4})-(\d{1,2})-(\d{1,2})", (0, 1, 2)),
                           (r"(\d{1,2})[-./](\d{1,2})[-./](\d{4})", (2, 1, 0))):
        m = re.fullmatch(pattern, s)
        if m:
            parts = [int(g) for g in m.groups()]
            try:
                return datetime.date(*(parts[i] for i in order))
            except ValueError:
                return None
    return None


def one_line(s):
    return " ".join((s or "").split())


def paragraphs(s):
    return [one_line(p) for p in re.split(r"\n\s*\n", (s or "").strip()) if one_line(p)]


def text(s):
    return s.replace("\\", "\\\\").replace(";", "\\;").replace(",", "\\,").replace("\n", "\\n")


def fold(line):
    """Lines may be at most 75 bytes; longer ones continue after a space."""
    out, size = "", 0
    for ch in line:
        n = len(ch.encode("utf-8"))
        if size + n > 75:
            out += "\r\n "
            size = 1
        out += ch
        size += n
    return out


def event(talk, page):
    day = talk["date"].strftime("%Y%m%d")
    speaker = one_line(talk.get("speaker"))
    # The UID must stay the same when a talk's details change, or calendars
    # that subscribe would show the talk twice.
    uid = day + "-" + hashlib.sha1(speaker.encode("utf-8")).hexdigest()[:8]
    lines = ["BEGIN:VEVENT", "UID:" + uid + "@tcsai.github.io"]
    times = re.match(r"(\d{1,2})[:.](\d{2})(?:\s*-\s*(\d{1,2})[:.](\d{2}))?", one_line(talk.get("time")))
    if times:
        h, m, eh, em = times.groups()
        start = int(h) * 60 + int(m)
        end = int(eh) * 60 + int(em) if eh else start + 60
        stamp = lambda minutes: f"{day}T{minutes // 60:02d}{minutes % 60:02d}00"
        lines += ["DTSTART;TZID=Europe/Amsterdam:" + stamp(start),
                  "DTEND;TZID=Europe/Amsterdam:" + stamp(end)]
    else:
        lines += ["DTSTART;VALUE=DATE:" + day,
                  "DTEND;VALUE=DATE:" + (talk["date"] + datetime.timedelta(days=1)).strftime("%Y%m%d")]
    title = one_line(talk.get("title"))
    lines.append("SUMMARY:" + text("Seminar: " + speaker + (" – " + title if title else "")))
    if one_line(talk.get("room")):
        lines.append("LOCATION:" + text(one_line(talk["room"]) + ", Tilburg University"))
    lines += ["DESCRIPTION:" + text("\n\n".join(paragraphs(talk.get("abstract")) + [page])),
              "URL:" + page, "END:VEVENT"]
    return lines


def calendar(talks, page, stamp):
    lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//tcsai.github.io//Seminar//EN",
             "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
             "X-WR-CALNAME:" + text("Seminar | Tilburg Computational Linguistics & Psycholinguistics"),
             "X-WR-TIMEZONE:Europe/Amsterdam"] + TIMEZONE
    for talk in talks:
        ev = event(talk, page)
        lines += ev[:2] + ["DTSTAMP:" + stamp] + ev[2:]
    lines.append("END:VCALENDAR")
    return "".join(fold(line) + "\r\n" for line in lines)


def main():
    talks = []
    for talk in parse(SCHEDULE.read_text(encoding="utf-8")):
        talk["date"] = parse_date(talk["date"])
        if talk["date"]:
            talks.append(talk)
        else:
            print("Skipping talk with unreadable date:", talk)
    talks.sort(key=lambda t: t["date"])

    page = site_url()
    stamp = datetime.datetime.now(datetime.timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    new = calendar(talks, page, stamp)
    # DTSTAMP changes on every run; ignore it when deciding whether to rewrite.
    unstamped = lambda s: re.sub(r"DTSTAMP:\w+", "", s)
    old = OUTPUT.read_text(encoding="utf-8") if OUTPUT.exists() else ""
    if unstamped(old.replace("\r\n", "\n")) != unstamped(new.replace("\r\n", "\n")):
        OUTPUT.write_bytes(new.encode("utf-8"))
        print(f"Wrote {OUTPUT} with {len(talks)} talks")
    else:
        print(f"{OUTPUT} is up to date")


if __name__ == "__main__":
    main()
