# Redirect Audit

Preferred canonical domain: `https://edgeoverluck.com`

| Old URL pattern | Preferred destination | Reason |
|---|---|---|
| `http://edgeoverluck.com/` | `https://edgeoverluck.com/` | Force HTTPS for canonical consistency. |
| `http://edgeoverluck.com/index.html` | `https://edgeoverluck.com/` | Remove duplicate homepage variant and force HTTPS. |
| `https://www.edgeoverluck.com/` | `https://edgeoverluck.com/` | Consolidate `www` to preferred non-`www` host. |
| `https://www.edgeoverluck.com/index.html` | `https://edgeoverluck.com/` | Consolidate `www` + remove duplicate homepage variant. |
| `https://edgeoverluck.com/index.html` | `https://edgeoverluck.com/` | Canonical homepage should resolve to clean root URL. |
| `http://www.edgeoverluck.com/` | `https://edgeoverluck.com/` | Consolidate protocol + host duplication in one redirect. |
| `http://www.edgeoverluck.com/index.html` | `https://edgeoverluck.com/` | Consolidate protocol + host + duplicate homepage path. |

## Notes

- This static repo does not include server-level rewrite config files (`.htaccess`, `netlify.toml`, `_redirects`, etc.).
- Internal references have been normalized to the preferred URL format.
- Implement the redirects above in the hosting platform configuration so crawlers and users are always routed to canonical URLs.
