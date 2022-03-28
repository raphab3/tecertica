export function abrev(name: string) {
  const separeted: any = separateNames(name)
  let count = 0
  while (separeted.total >= 30) {
    const list: any = separeted.middle.split(' ')
    const name: any = separeted.middle.split(' ')[count]
    if (name && name.length > 2) {
      list[count] = turnIntoAcronym(name)
      separeted.middle = list.join().replace(/,/g, ' ')
      separeted.total =
        separeted.first.length + separeted.last.length + separeted.middle.length
    } else {
      separeted.total--
    }
    count++
  }
  return `${separeted.first} ${separeted.middle} ${separeted.last}`.toUpperCase()
}

function turnIntoAcronym(palavra: string) {
  return `${palavra.charAt(0)}.`
}

function separateNames(fullName: string) {
  const obj = {
    first: '',
    last: '',
    middle: '',
    total: 0
  }

  fullName.replace(/ (.)*\\ /gi, (middle): any => {
    obj.middle = middle.trim()
  })

  const listName = fullName.split(' ')
  obj.first = listName[0]
  obj.last = listName[listName.length - 1]
  obj.total = obj.first.length + obj.last.length + obj.middle.length
  return obj
}
