# Notes for Claude

Website of the Computational Linguistics & Psycholinguistics unit at Tilburg
University, served at <https://tcsai.github.io/language-computation/> by GitHub
Pages (Jekyll, deployed from `main`). `README.md` explains the files.

## Rules

- Keep the site simple: plain Markdown pages, no new templates, data files or
  visual gimmicks. Keep prose short and general.
- The members of the unit are the people listed in `people.md`. Never add or
  remove people yourself; suggest changes instead.
- Libby Lepp is listed as "Libby" on People but publishes as Lisa Lepp. In
  author lists, use names as printed on the paper.
- Seminar talks are kept by hand in `schedule.md`. Don't edit it.

### Publications (`publications.md`)

- Publications by members since 2024, under one `## YYYY` heading per year,
  newest year first. The year is that of the version linked.
- Within a year, sort by the first author's surname.
- One line per paper: `- Authors. [Title](link). *Venue*.` Authors as on the
  paper, written "A, B and C"; with more than seven authors, give the first
  three followed by "et al.".
- Link to the published version (DOI, or the ACL Anthology page for ACL
  venues). Otherwise link to the preprint, with venue `*Preprint, arXiv*` (or
  the server used). When a preprint on the page has been published, replace its
  link and venue, and move it to the right year.
- Venues: conference and year (`*EMNLP 2026*`), workshops as
  `*Workshop name at Conference Year*`, journals in full, theses as
  `*PhD thesis, University*`.
- Include papers, book chapters, theses and preprints. Leave out abstracts,
  posters, talks, datasets and software.
- The five selected papers on the home page (`index.md`) must have a member as
  first author. Don't change them; suggest a swap when a strong new paper
  appears.

### News (`news.md`)

- Newest first, one bullet per item: `- **Month YYYY.** …`, dated by when the
  event takes place.
- One to three short sentences for a general academic reader, with a link to
  the source (paper, event page, announcement).
- For papers, give only the linked title, the authors and where it was
  accepted; don't describe the content.
- Newsworthy: papers accepted at major conferences and journals, awards, grants,
  PhD defences, new members and members' moves, events the unit organises or
  hosts, keynotes, media coverage. Not every preprint or talk.
- Report only what a source states.

## Monthly update

A scheduled agent updates the site each month and opens a pull request for
review.

1. Read `people.md`, `publications.md`, `news.md`, `index.md` and
   `schedule.md`. Find the date of the last update (the last merged pull
   request titled "Monthly update", otherwise the last commit to
   `publications.md` or `news.md`) and look at everything since then, checking
   against what is already on the site. If an earlier monthly update pull
   request is still open, don't repeat its changes.
2. **Publications.** For each member, check ORCID, the ACL Anthology, arXiv and
   DBLP (sources below), and Crossref or Semantic Scholar for anything unclear.
   When searching by name, make sure the author is the member (Tilburg
   affiliation, co-authors, topic). Also check whether preprints on the page
   have since been published.
3. **News.** For each member, check their Bluesky posts and website, then the
   unit and university sources. Accepted papers often show up first in arXiv
   comments ("Accepted to …") and Bluesky posts.
4. **Checks.** Test the external links on the site's pages and fix any whose new
   location is obvious. Note upcoming seminar talks in the next six weeks that
   still have no title, and anything that suggests a change to People (new
   members, departures, defences, new web pages).
5. **Pull request.** Commit on a branch `monthly-update-YYYY-MM` and open a pull
   request against `main` titled "Monthly update: Month YYYY". In the
   description, list each change with its source link, then suggestions and
   anything needing a human decision, then sources that could not be reached. If
   there is nothing to change or report, don't open a pull request.

Never push to `main`, and don't change the layout, styles or `_config.yml`.

### Sources

| Member | Website | Tilburg profile (Pure) | ORCID | ACL Anthology | Bluesky |
| --- | --- | --- | --- | --- | --- |
| Afra Alishahi | [afra.alishahi.name](https://afra.alishahi.name/) | [afra-alishahi](https://research.tilburguniversity.edu/en/persons/afra-alishahi) | 0009-0009-9237-3253 | [afra-alishahi](https://aclanthology.org/people/afra-alishahi/) | |
| Fred Blain (Frédéric Blain) | | [fred-blain](https://research.tilburguniversity.edu/en/persons/fred-blain) | 0000-0003-3017-3722 | [frederic-blain](https://aclanthology.org/people/frederic-blain/) | |
| Giovanni Cassani | [giovannicassani.github.io](https://giovannicassani.github.io/) | [giovanni-cassani](https://research.tilburguniversity.edu/en/persons/giovanni-cassani) | 0000-0003-3917-3315 | [giovanni-cassani](https://aclanthology.org/people/giovanni-cassani/) | |
| Grzegorz Chrupała | [grzegorz.chrupala.me](https://grzegorz.chrupala.me/) | [grzegorz-chrupala](https://research.tilburguniversity.edu/en/persons/grzegorz-chrupala) | 0000-0001-9498-6912 | [grzegorz-chrupala](https://aclanthology.org/people/grzegorz-chrupala/) | grzegorz.chrupala.me |
| Mirella De Sisto | | [mirella-de-sisto](https://research.tilburguniversity.edu/en/persons/mirella-de-sisto) | 0000-0002-0899-5976 | [mirella-de-sisto](https://aclanthology.org/people/mirella-de-sisto/unverified/) | |
| Chris Emmery | [cmry.github.io](https://cmry.github.io/) | [chris-emmery](https://research.tilburguniversity.edu/en/persons/chris-emmery) | 0000-0002-2179-559X | [chris-emmery](https://aclanthology.org/people/chris-emmery/) | cmry.bsky.social |
| Emmanuel Keuleers | | [emmanuel-keuleers](https://research.tilburguniversity.edu/en/persons/emmanuel-keuleers) | 0000-0001-7304-7107 | [emmanuel-keuleers](https://aclanthology.org/people/emmanuel-keuleers/unverified/) | |
| Bruno Nicenboim | [bruno.nicenboim.me](https://bruno.nicenboim.me/) | [bruno-nicenboim](https://research.tilburguniversity.edu/en/persons/bruno-nicenboim) | 0000-0002-5176-3943 | [bruno-nicenboim](https://aclanthology.org/people/bruno-nicenboim/unverified/) | bruno-nicenboim.fediscience.org.ap.brid.gy |
| Javad Pourmostafa Roshan Sharami | [javad.pourmostafa.com](https://javad.pourmostafa.com/) | [javad-pourmostafa-roshan-sharami](https://research.tilburguniversity.edu/en/persons/javad-pourmostafa-roshan-sharami) | 0000-0003-2083-1664 | [javad-pourmostafa-roshan-sharami](https://aclanthology.org/people/javad-pourmostafa-roshan-sharami/) | |
| Dimitar Shterionov | [ilk.uvt.nl/~shterion](https://ilk.uvt.nl/~shterion/) | [dimitar-shterionov](https://research.tilburguniversity.edu/en/persons/dimitar-shterionov) | 0000-0001-6300-797X | [dimitar-shterionov](https://aclanthology.org/people/dimitar-shterionov/unverified/) | dimitarsh1.bsky.social |
| Eva Vanmassenhove | | [eva-vanmassenhove](https://research.tilburguniversity.edu/en/persons/eva-vanmassenhove) | 0000-0003-1162-820X | [eva-vanmassenhove](https://aclanthology.org/people/eva-vanmassenhove/) | |
| Noortje Venhuizen | | [noortje-venhuizen](https://research.tilburguniversity.edu/en/persons/noortje-venhuizen) | 0000-0002-0311-8202 | [noortje-venhuizen](https://aclanthology.org/people/noortje-venhuizen/) | |
| Céline Angonin | | [céline-angonin](https://research.tilburguniversity.edu/en/persons/c%C3%A9line-angonin) | 0000-0002-3073-4086 | | cangonin.bsky.social |
| Rastislav Hronský | | [ratislav-hronský](https://research.tilburguniversity.edu/en/persons/ratislav-hronsk%C3%BD) | | [rastislav-hronsky](https://aclanthology.org/people/rastislav-hronsky/unverified/) | |
| Sasha Kenjeeva (Alexandra Kenjeeva) | | [alexandra-kenjeeva](https://research.tilburguniversity.edu/en/persons/alexandra-kenjeeva) | 0000-0002-9358-7722 | | |
| Libby Lepp (Lisa Lepp) | | [lisa-lepp](https://research.tilburguniversity.edu/en/persons/lisa-lepp) | 0009-0001-4737-7580 | [lisa-lepp](https://aclanthology.org/people/lisa-lepp/unverified/) | lisalepp.bsky.social |
| Thomas Lieber | | [thomas-lieber](https://research.tilburguniversity.edu/en/persons/thomas-lieber) | | | |
| Rosie Mai | | [rosie-mai](https://research.tilburguniversity.edu/en/persons/rosie-mai) | 0000-0001-8275-6220 | | |
| Chiara Manna | | [chiara-manna](https://research.tilburguniversity.edu/en/persons/chiara-manna) | 0009-0007-5533-6125 | [chiara-manna](https://aclanthology.org/people/chiara-manna/unverified/) | chiaramanna.bsky.social |
| Hosein Mohebbi | [hmohebbi.github.io](https://hmohebbi.github.io/) | [hosein-mohebbi](https://research.tilburguniversity.edu/en/persons/hosein-mohebbi) | 0000-0001-8184-7825 | [hosein-mohebbi](https://aclanthology.org/people/hosein-mohebbi/) | hmohebbi.bsky.social |
| Sara Møller Østergaard | [saraoe.github.io](https://saraoe.github.io/) | | 0000-0002-0572-6391 | [sara-moller-ostergaard](https://aclanthology.org/people/sara-moller-ostergaard/unverified/) | |
| Gaofei Shen | [gaofeishen.com](https://www.gaofeishen.com/) | | 0000-0002-9448-9470 | [gaofei-shen](https://aclanthology.org/people/gaofei-shen/unverified/) | gaofeishen.com |
| Yixia Wang | | | | | |

Empty cells mean nothing was found; search by name there, carefully.

How to query them (all public, no login):

- **ORCID:** `https://pub.orcid.org/v3.0/<ORCID>/works` with the header
  `Accept: application/json`.
- **arXiv:** `https://export.arxiv.org/api/query?search_query=au:"Firstname Surname"&sortBy=submittedDate&sortOrder=descending`.
- **DBLP:** `https://dblp.org/search/publ/api?q=<name>&format=json`. DBLP blocks
  clients that send requests quickly: wait a few seconds between requests and
  stop at the first HTTP 429.
- **Crossref:** `https://api.crossref.org/works?query.author=<name>&filter=from-pub-date:<YYYY-MM-DD>`.
- **Semantic Scholar:** `https://api.semanticscholar.org/graph/v1/author/search?query=<name>`.
- **Bluesky:** `https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=<handle>&limit=50`.
  Also check the unit's account, tilburg-clp.bsky.social, and the university's,
  tilburg-university.bsky.social.
- **University news:** Univers, the university's news magazine, at
  <https://www.univers.nl/feed/> (RSS).
- **Pure profile pages** list a member's recent output and activities. Their
  sub-pages (publications, activities) are blocked.

`www.tilburguniversity.edu` (Cloudflare bot check) and Google Scholar can't be
read by automated tools. Don't try to get around this; use the sources above or
a web search instead.
