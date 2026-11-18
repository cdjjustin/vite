/**
 * Drop the `direct` query flag from a CSS HMR URL.
 *
 * Must not round-trip the query through `URLSearchParams`: re-serializing
 * writes valueless flags as `key=`, so a Vue SFC style URL like
 * `?vue&type=style&index=0&lang.scss` becomes `?vue=&…&lang.scss=`.
 * `lang.scss=` no longer matches `CSS_LANGS_RE`, and the updated `<link>`
 * is no longer treated as CSS.
 */
export function cleanCssUrl(pathname: string): string {
  const url = new URL(pathname, 'http://vite.dev')
  const query = url.search
    .slice(1)
    .split('&')
    .filter(
      (param) => param && param !== 'direct' && !param.startsWith('direct='),
    )
    .join('&')
  return url.pathname + (query ? `?${query}` : '')
}
