export const range = (from, to, step) => {
  const items = []
  for (let i = from; i <= to; i += step) {
    items.push(i)
  }
  return items
}

export const arrayToObject = (items) =>
  items.reduce((object, item) => {
    object[item.id] = item
    return object
  }, {})
