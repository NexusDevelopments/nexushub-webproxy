export function toAbsolute(urlStr: string, base: URL): string {
  const trimmed = urlStr.trim();
  if (!trimmed || trimmed.startsWith('javascript:') || trimmed.startsWith('data:') || trimmed.startsWith('mailto:')) {
    return trimmed;
  }
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  if (trimmed.startsWith('//')) {
    return `${base.protocol}${trimmed}`;
  }
  try {
    return new URL(trimmed, base).href;
  } catch {
    return trimmed;
  }
}

export function rewriteHtml(html: string, base: URL): string {
  let output = html.replace(/<\s*base[^>]*>/gi, '');

  // Rewrite common attributes to route through our proxy
  output = output.replace(/\b(href|src|action)\s*=\s*(["'])([^"']+?)\2/gi, (_m, attr, quote, value) => {
    const abs = toAbsolute(value, base);
    if (!abs || abs.startsWith('javascript:') || abs.startsWith('data:') || abs.startsWith('mailto:')) {
      return `${attr}=${quote}${value}${quote}`;
    }
    const proxied = `/api/proxy?url=${encodeURIComponent(abs)}`;
    return `${attr}=${quote}${proxied}${quote}`;
  });

  // Basic rewrite for CSS url(...) inside inline styles
  output = output.replace(/url\(\s*(["']?)([^"')]+)\1\s*\)/gi, (_m, _q, value) => {
    const abs = toAbsolute(value, base);
    if (!abs || abs.startsWith('data:')) {
      return `url(${value})`;
    }
    const proxied = `/api/proxy?url=${encodeURIComponent(abs)}`;
    return `url(${proxied})`;
  });

  // Inject meta to relax referrer and permissive CSP
  output = output.replace(
    /<\s*head\s*>/i,
    `<head><meta name="referrer" content="no-referrer"><meta http-equiv="Content-Security-Policy" content="default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; img-src * data: blob:; media-src * data: blob:; style-src * 'unsafe-inline' data: blob:; script-src * 'unsafe-inline' 'unsafe-eval' data: blob:; connect-src * data: blob:">`
  );

  return output;
}
