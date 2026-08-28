# Peter Noel — UX/UI Portfolio

Static portfolio site (HTML, CSS, GSAP). Hosted on Vercel from GitHub.

## Local

```bash
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000).

## Deploy (GitHub + Vercel)

1. Create a GitHub repo and push this project (include `index.html` at the repo root).
2. In [Vercel](https://vercel.com), import that repo.
3. Leave **Framework Preset** as Other / no framework.
4. Leave **Build Command** empty and **Output Directory** empty (or `.`).
5. Deploy.

`vercel.json` enables clean URLs (`/about` also works in production) and a 404 page. Local `python3 -m http.server` still uses `about.html`, `rocket-connect.html`, and `origins.html`.

After the first deploy, every push to the production branch updates the live site.

## Pages

| URL | File |
|-----|------|
| `/` | `index.html` |
| `/about` | `about.html` |
| `/rocket-connect` | `rocket-connect.html` |
| `/origins` | `origins.html` |

## License

© 2026 Peter Noel. All rights reserved.
