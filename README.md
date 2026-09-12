# sunnyyuan.dev — personal site

Single-page personal website for Sunny Yuan, laid out in the style of the
[iPortfolio](https://bootstrapmade.com/) template (dark left sidebar with
profile + nav, full-bleed hero with a typed tagline, About, a two-sided
Experience timeline, and a filterable Projects grid).

No build step. Bootstrap, Boxicons, Bootstrap Icons, AOS, Typed.js and
Isotope load from cdnjs, so the repo is just `index.html` + `assets/`.

## Structure

```
index.html
assets/
  css/style.css          # all site styles
  js/main.js             # nav, typed hero, isotope filters, AOS
  (sidebar avatar is inlined in index.html; the About portrait and the
   CS224R PDF are linked from the ZichenYuan/sunny.0 repo — copy them into
   assets/ and point the src/href at the local files whenever you like)
  img/rower.svg          # About illustration
  img/hero-bg.svg        # generated hero background
  img/projects/*.svg     # generated project tiles — swap for real screenshots
```

## Run locally

```
python3 -m http.server 8080   # then open http://localhost:8080
```

## Deploy (GitHub Pages)

Push this folder to the root of your `ZichenYuan.github.io` repo (or any repo
with Pages enabled on the root). The custom domain `sunnyyuan.dev` works as-is.

## Editing

- **Hero words:** change `data-typed-items` on the `.typed` span in `index.html`.
- **Projects:** each card is a `.portfolio-item` with one or more `filter-*`
  classes matching the buttons in `#portfolio-flters`. Replace the SVG in
  `assets/img/projects/` with a 16:9 PNG/JPG of the same name to use a real
  screenshot.
- **Experience:** each `.resume-item` alternates sides via the `flip` class.
- **Resume:** drop `resume.pdf` in the root and add a nav link / hero button.
