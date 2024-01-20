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

export async function fetchWithAuth(url: string, accessToken: string, init?: RequestInit) {
  const response = await fetch(url, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  })
  if (response.status === 401) {
    localStorage.removeItem('accessToken')
    location.reload()
  } else if (response.status === 404) notFound()
  else if (!response.ok) throw new Error(await response.text())
  return await response.json()
}
