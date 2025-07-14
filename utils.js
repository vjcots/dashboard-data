const UPSTASH_URL = 'https://boss-trout-41956.upstash.io';
const UPSTASH_TOKEN = 'AqPkAAIgcDGO-OZuVmKboPXAp3KEJNqepgwD9ThmrK88RpsgT_hwzQ';  // Sustituye por tu token real de lectura

async function redisHGetAll(key) {
  const res = await fetch(`${UPSTASH_URL}/hgetall/${key}`, {
    headers: { Authorization: UPSTASH_TOKEN },
  });
  const json = await res.json();
  return json.result || {};
}

async function redisKeys(pattern) {
  const res = await fetch(`${UPSTASH_URL}/keys/${pattern}`, {
    headers: { Authorization: UPSTASH_TOKEN },
  });
  const json = await res.json();
  return json.result || [];
}
