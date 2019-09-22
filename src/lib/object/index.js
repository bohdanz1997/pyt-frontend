export const objectFind = (object, predicate) => {
  for (const key in object) {
    const value = object[key]
    if (predicate(value, key)) {
      return value
    }
  }
}
