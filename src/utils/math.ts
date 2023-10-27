export function xor<T>(array1: T[], array2: T[]) {
  return array1.filter((x) => !array2.includes(x)).concat(array2.filter((x) => !array1.includes(x)))
}
