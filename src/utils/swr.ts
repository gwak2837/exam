export async function fetchJSON(url: string) {
  const res = await fetch(url)
  return await res.json()
}

export function fetchPOST(url: string) {
  fetch(url, { method: 'POST' })
}
