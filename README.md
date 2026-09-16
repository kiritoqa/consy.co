# consy.co

Public brand landing (GitHub Pages). Product app lives in the private [consy](https://github.com/kiritoqa/consy) monorepo.

## GitHub Pages

1. **Settings → Pages → Build and deployment**: **Deploy from a branch**
2. Branch **main**, folder **/ (root)**
3. **Custom domain**: `consy.co` → Save → **Enforce HTTPS** when available

## GoDaddy DNS

Remove **A @ → WebsiteBuilder Site**. Add four **A** records for `@`:

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

**CNAME** `www` → `kiritoqa.github.io`

Keep the `CNAME` file in this repo as `consy.co`.

## Local preview

```bash
npx --yes serve . -p 4321
```
