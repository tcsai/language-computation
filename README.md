# Computational Linguistics & Psycholinguistics — website

Source for the website of the Computational Linguistics & Psycholinguistics
unit at the Research Center for Cognitive Science and Artificial Intelligence,
Tilburg University. GitHub Pages turns the Markdown files into the website on every
push; there is no build step to run.

## Editing content

Every page is a plain Markdown file in the top folder:

| Page | File |
| --- | --- |
| Home and research summary | `index.md` |
| People | `people.md` |
| Publications | `publications.md` |
| News | `news.md` |
| Contact | `contact.md` |

The easiest way to edit is in the browser: open the file on GitHub (or click
*Edit this page* at the bottom of any page on the site), click the pencil
icon, and commit. The site updates within a minute or two.

The first `#` heading of each file becomes the page title. Link between pages
with the Markdown file name, e.g. `[People](people.md)`.

**Adding a page:** create a new file, e.g. `teaching.md`, starting with
`# Teaching`, and add it to the `navigation` list in `_config.yml` to show it
in the menu.

**News feed:** the News page shows the latest Bluesky posts by the accounts in
the `bluesky_feed` list in `_config.yml`, fetched in the visitor's browser.
Reposts, replies and posts quoting someone outside that list are left out. To
add or remove a member, edit the list. Announcements written in `news.md` above
the feed appear as normal text.

Other settings:

- Site title, description and menu: `_config.yml`
- Header, menu and footer: `_layouts/default.html`
- Colours and fonts: `assets/css/style.css`

## Hosting

The site lives in the repository
[tcsai/language-computation](https://github.com/tcsai/language-computation)
and is served at **<https://tcsai.github.io/language-computation/>**.

GitHub Pages is set to *Deploy from a branch*, branch `main`, folder
`/ (root)` (*Settings → Pages*).

If the repository is renamed, change `baseurl` in `_config.yml` to match.

**Custom domain:** to use a domain like `clp.example.org`, add it under
*Settings → Pages → Custom domain* and create the DNS `CNAME` record GitHub
shows you. Then set `url` to the new domain and `baseurl` to `""` in
`_config.yml`.

## Previewing locally

Optional. Requires Ruby (with the `ruby-dev` package on Debian/Ubuntu) and
Bundler.

```sh
bundle install
bundle exec jekyll serve
```

Then open <http://localhost:4000/language-computation/>.
