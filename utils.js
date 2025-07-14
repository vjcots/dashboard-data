const UPSTASH_URL   = 'https://boss-trout-41956.upstash.io';
const UPSTASH_TOKEN = 'Bearer TU_TOKEN_AQUI';   // ← pon tu token real

// ------------------ HGETALL que siempre devuelve objeto ------------------
async function redisHGetAll(key) {
  // 1⃣  Intentamos con el parámetro _format=json (Upstash lo soporta)
  const url = `${UPSTASH_URL}/hgetall/${encodeURIComponent(key)}?_format=json`;
  const res = await fetch(url, { headers: { Authorization: UPSTASH_TOKEN } });
  const json = await res.json();

  // 2⃣  Si Upstash devuelve objeto ✅ lo usamos tal cual
  if (json.result && !Array.isArray(json.result)) return json.result || {};

  // 3⃣  Si devuelve array ➜ lo convertimos (compatibilidad)
  const arr = json.result || [];
  const obj = {};
  for (let i = 0; i < arr.length; i += 2) obj[arr[i]] = arr[i + 1];
  return obj;
}

// ------------------ SCAN para listar claves ------------------
async function redisKeys(pattern) {
  const res = await fetch(
    `${UPSTASH_URL}/scan/0?match=${encodeURIComponent(pattern)}`,
    { headers: { Authorization: UPSTASH_TOKEN } }
  );
  const json = await res.json();
  return json.result?.[1] || [];
}
