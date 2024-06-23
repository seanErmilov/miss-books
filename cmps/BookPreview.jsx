export function BookPreview({ book, imgIdx }) {
  const { title } = book
  console.log('book :', book)
  return (
    <article className='book-preview'>
      <h2>Title: {title}</h2>
      {/* <h4>book Speed: {speed}</h4> */}
      <img src={`../assets/img/booksImgs/${1}.jpg`} alt='' />
    </article>
  )
}
