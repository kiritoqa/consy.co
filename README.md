# consy.co

Iryna Nechytailo's Consy landing page. A static site (HTML, CSS, vanilla JS), published by GitHub Pages.

## GitHub Pages

1. **Settings → Pages → Build and deployment**: **Deploy from a branch**
2. Branch **main**, folder **/ (root)**
3. **Custom domain**: `consy.co`, then **Enforce HTTPS**

Keep the `CNAME` file as `consy.co` and the empty `.nojekyll` file.

## Files

- `index.html`, `styles.css`, `main.js`: the page
- `i18n.js`: Russian and Ukrainian copy, picked by the visitor's browser language (test with `?lang=ru`, `?lang=uk`, `?lang=en`)
- `works/`: the drifting gallery of work (`compositions.js` lists the tiles)
- `assets/`: images, video, logo, icons

Contacts (email, WhatsApp, Telegram, Instagram) are set in `CONTACTS` at the top of `main.js`.

## Local preview

```bash
python3 -m http.server 4321
```
