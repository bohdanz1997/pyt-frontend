export const objectFind = (object, predicate) => {
  for (const key in object) {
    const value = object[key]
    if (predicate(value, key)) {
      return value
    }
  }
}

export const objectFilter = (object, predicate) => {
  const filtered = []
  for (const key in object) {
    const value = object[key]
    if (predicate(value, key)) {
      filtered.push(value)
    }
  }
  return filtered
}

export const objectMap = (object, predicate) => {
  const mapped = []
  for (const key in object) {
    const value = object[key]
    mapped.push(predicate(value, key))
  }
  return mapped
}

export const objectOmit = (object, key) => {
  const { [key]: _, ...newObject } = object
  return newObject
}

export const toSelectOption = (labelProp, valueProp) => (props) =>
  ({ label: props[labelProp], value: props[valueProp] })
