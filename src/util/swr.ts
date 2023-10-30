export async function fetchJSON(url: string) {
  const res = await fetch(url)
  return await res.json()
}

export async function fetchPOST(url: string) {
  return await fetch(url, { method: 'POST' })
}
