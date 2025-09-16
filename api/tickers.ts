export default async function handler(req: any, res: any) {
  try {
    const category = String(req.query.category ?? 'linear');
    const symbol = req.query.symbol ? String(req.query.symbol) : '';
    const url = new URL('https://api.bybit.com/v5/market/tickers');
    url.searchParams.set('category', category);
    if (symbol) url.searchParams.set('symbol', symbol);
    const r = await fetch(url.toString(), { headers: { Accept: 'application/json' } });
    const body = await r.text();
    res.status(r.status).setHeader('content-type', r.headers.get('content-type') || 'application/json').send(body);
  } catch (e: any) {
    res.status(500).json({ ok: false, error: e?.message || 'proxy_error' });
  }
}

