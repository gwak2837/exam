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
export function removeDeepNullKey<T extends Record<string, unknown>>(obj: T) {
  for (const key in obj) {
    const value = obj[key]
    if (value == null) delete obj[key]
    else if (typeof value === 'object') {
      const subObj = removeDeepNullKey(value as Record<string, unknown>)
      if (Object.keys(subObj).length === 0) delete obj[key]
    }
  }

  return obj
}
