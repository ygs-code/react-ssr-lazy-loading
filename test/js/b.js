export default () => {
  console.log('bbbbbbbbbbbbbbbb')
  setTimeout(async () => {
    const c = import('./c')
    console.log(
      'c=======',
      c.then((data) => {
        console.log('data=', data.default())
      }),
    )
  }, 2000)
}
