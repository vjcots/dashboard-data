/* utils.js -------------------------------------------------------------- */
const UPSTASH_URL   = 'https://boss-trout-41956.upstash.io';
const UPSTASH_TOKEN = '';   // ← pon tu token real

// -- hgetall que SIEMPRE entrega objeto { campo: valor, … } -------------
async function redisHGetAll(key) {
  const res = await fetch(
    `${UPSTASH_URL}/hgetall/${encodeURIComponent(key)}?_format=json`,
    { headers: { Authorization: UPSTASH_TOKEN } }
  );
  const j = await res.json();

  // Upstash devuelve objeto si puede; si no, viene como array alterno
  if (j.result && !Array.isArray(j.result)) return j.result;

  const arr = j.result || [];
  const obj = {};
  for (let i = 0; i < arr.length; i += 2) obj[arr[i]] = arr[i + 1];
  return obj;
}

// -- listar claves con scan (permite token readonly) ---------------------
async function redisKeys(pattern) {
  const res = await fetch(
    `${UPSTASH_URL}/scan/0?match=${encodeURIComponent(pattern)}`,
    { headers: { Authorization: UPSTASH_TOKEN } }
  );
  const j = await res.json();
  return j.result?.[1] || [];
}
