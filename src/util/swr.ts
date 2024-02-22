import { notFound } from 'next/navigation'

export async function fetchJSON(url: string) {
  const response = await fetch(url)
  if (response.status === 404) notFound()
  else if (!response.ok) throw new Error(await response.text())
  return await response.json()
}

export async function fetchPOST(url: string) {
  return await fetch(url, { method: 'POST' })
}
