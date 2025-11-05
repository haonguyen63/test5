// app/_lib/safe-fetch.js
export async function safeFetchJSON(input, init = {}) {
  const res = await fetch(input, init);
  const ctype = (res.headers.get("content-type") || "").toLowerCase();
  const isJSON = ctype.includes("application/json");
  if (!isJSON) {
    const text = await res.text();
    const snippet = text.slice(0, 300).replace(/\s+/g, " ").trim();
    throw new Error(`Server returned HTML instead of JSON: ${res.status} ${snippet}`);
  }
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error || `Request failed: ${res.status}`);
  }
  return data;
}
