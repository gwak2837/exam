export function shuffle<T>(array: T[]) {
  let currentIndex = array.length
  let randomIndex

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}

export function toQuerystring(obj?: Record<string, string | string[] | undefined> | undefined) {
  if (!obj) return ''
  return Object.entries(obj)
    .flatMap(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`)
      } else {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value ?? '')}`
      }
    })
    .join('&')
}

/* eslint-disable @typescript-eslint/no-dynamic-delete */
export function deleteDeepNullKey<T extends Record<string, unknown>>(obj: T) {
  for (const key in obj) {
    const value = obj[key]
    if (value == null) delete obj[key]
    else if (Array.isArray(value) && value.length === 0) delete obj[key]
    else if (value.constructor.name === 'Object') {
      const subObj = deleteDeepNullKey(value as Record<string, unknown>)
      if (Object.keys(subObj).length === 0) delete obj[key]
    }
  }

  return obj
}

export function bigIntToString(value: bigint | null) {
  return value ? String(value) : null
}

export function stringToBigInt(value?: string) {
  return value ? BigInt(value) : undefined
}

export function hashToColorHexCode(str?: string) {
  if (!str) return

  let hash = 0
  str.split('').forEach((char) => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash)
  })
  let color = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    color += value.toString(16).padStart(2, '0')
  }
  return color
}
