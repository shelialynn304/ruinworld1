# Redirect Audit

Preferred canonical domain: `https://ruinworld-branchandbone.com`

| Old URL pattern | Preferred destination | Reason |
|---|---|---|
| `http://ruinworld-branchandbone.com/` | `https://ruinworld-branchandbone.com/` | Force HTTPS for canonical consistency. |
| `http://ruinworld-branchandbone.com/index.html` | `https://ruinworld-branchandbone.com/` | Remove duplicate homepage variant and force HTTPS. |
| `https://www.ruinworld-branchandbone.com/` | `https://ruinworld-branchandbone.com/` | Consolidate `www` to preferred non-`www` host. |
| `https://www.ruinworld-branchandbone.com/index.html` | `https://ruinworld-branchandbone.com/` | Consolidate `www` + remove duplicate homepage variant. |
| `https://ruinworld-branchandbone.com/index.html` | `https://ruinworld-branchandbone.com/` | Canonical homepage should resolve to clean root URL. |
| `http://www.ruinworld-branchandbone.com/` | `https://ruinworld-branchandbone.com/` | Consolidate protocol + host duplication in one redirect. |
| `http://www.ruinworld-branchandbone.com/index.html` | `https://ruinworld-branchandbone.com/` | Consolidate protocol + host + duplicate homepage path. |

## Notes

- This static repo does not include server-level rewrite config files (`.htaccess`, `netlify.toml`, `_redirects`, etc.).
- Internal references have been normalized to the preferred URL format.
- Implement the redirects above in the hosting platform configuration so crawlers and users are always routed to canonical URLs.
