const UPSTASH_URL = 'https://boss-trout-41956.upstash.io';
const UPSTASH_TOKEN = 'AqPkAAIgcDGO-OZuVmKboPXAp3KEJNqepgwD9ThmrK88RpsgT_hwzQ';  // Sustituye por tu token real de lectura

// Obtener todos los campos de un hash (por ejemplo: user:34649128871:meta)
async function redisHGetAll(key) {
  const res = await fetch(`${UPSTASH_URL}/hgetall/${key}`, {
    headers: { Authorization: UPSTASH_TOKEN },
  });
  const json = await res.json();
  return json.result || {};
}

// Listar claves que coincidan con un patrón (reemplazo de KEYS)
async function redisKeys(pattern) {
  const res = await fetch(`${UPSTASH_URL}/scan/0?match=${encodeURIComponent(pattern)}`, {
    headers: { Authorization: UPSTASH_TOKEN },
  });
  const json = await res.json();
  return json.result?.[1] || [];  // result = [cursor, [array de claves]]
}
