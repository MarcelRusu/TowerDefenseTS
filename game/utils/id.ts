export type Id = string

const ids: Id[] = []

/* NON-FP garbage xd */
export function make(): Id {
  let id: Id = '', len: number, num: number
  while (id === '' || ids.indexOf(id) !== -1) {
    id = ''
    len = Math.random() * 30 + 10
    for (let i = 0; i < len; i++) {
      num = Math.floor(Math.random() * len)
      id += String.fromCharCode(num)
    }
  }
  return id
}