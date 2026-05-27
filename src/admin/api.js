async function authHeaders() {
  const get = window.__getAdminToken;
  const token = get ? await get() : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiGet(path) {
  const r = await fetch(path, { headers: await authHeaders() });
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return r.json();
}

export async function apiSend(path, method, body) {
  const r = await fetch(path, {
    method,
    headers: { 'Content-Type': 'application/json', ...(await authHeaders()) },
    body: JSON.stringify(body),
  });
  if (!r.ok) {
    const err = await r.json().catch(() => ({ error: r.statusText }));
    throw new Error(err.error || `${r.status} ${r.statusText}`);
  }
  return r.json().catch(() => ({}));
}
