// import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.service.js'
// import { BookDetails } from './BookDetails.jsx'

const { useEffect, useState } = React

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
  const [selectedBookId, setSelectedBookId] = useState(null)

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService
      .query()
      .then((books) => setBooks(books))
      .catch((err) => {
        console.log('err:', err)
      })
  }

  function onRemoveBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks((books) => books.filter((book) => book.id !== bookId))
      })
      .catch((err) => {
        console.log('Problems removing book:', err)
      })
  }

  function onSetFilter(filterBy) {
    setFilterBy({ ...filterBy })
  }

  function onSelectBookId(bookId) {
    setSelectedBookId(bookId)
  }

  if (!books) return <div>Loading...</div>
  return (
    <section className='book-index'>
      {!selectedBookId && (
        <React.Fragment>
          {/* <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} /> */}
          <BookList
            books={books}
            onRemoveBook={onRemoveBook}
            onSelectBookId={onSelectBookId}
          />
        </React.Fragment>
      )}

      {/* {selectedBookId && (
        <BookDetails
          onBack={() => setSelectedBookId(null)}
          bookId={selectedBookId}
        />
      )} */}
    </section>
  )
}
