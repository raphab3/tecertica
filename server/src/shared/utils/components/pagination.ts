export const componentPagination = async ({ page, perPage }: any) => {
  let realPage: number = 0
  let realTake: number = 1

  if (perPage) realTake = +perPage
  else {
    perPage = '10'
    realTake = 10
  }

  if (page) realPage = +page === 1 ? 0 : (+page - 1) * realTake
  else {
    realPage = 0
    page = '1'
  }

  return { realPage, realTake }
}
