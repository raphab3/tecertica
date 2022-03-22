export const saveToStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getFromStorage = (key: string) => {
  if (typeof window !== 'undefined' && localStorage.getItem(key) !== null) {
    return JSON.parse(localStorage.getItem(key) || '{}')
  }
}

export const deleteFromStorage = (key: string) => {
  if (getFromStorage(key)) {
    localStorage.removeItem(key)
  }
}

export const clearStorageAll = () => {
  localStorage.clear()
}
