import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
var gFilterBy = { txt: '', minSpeed: 0 }
_createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getNextBookId,
  getFilterBy,
  setFilterBy,
  getDefaultFilter,
}

function query() {
  return storageService.query(BOOK_KEY).then((books) => {
    if (gFilterBy.txt) {
      const regex = new RegExp(gFilterBy.txt, 'i')
      books = books.filter((book) => regex.test(book.vendor))
    }
    if (gFilterBy.minSpeed) {
      books = books.filter((book) => book.maxSpeed >= gFilterBy.minSpeed)
    }
    return books
  })
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book)
  } else {
    return storageService.post(BOOK_KEY, book)
  }
}

function getEmptyBook(vendor = '', maxSpeed = 0) {
  return { id: '', vendor, maxSpeed }
}

function getFilterBy() {
  return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
  if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
  if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
  return gFilterBy
}

function getNextBookId(bookId) {
  return storageService.query(BOOK_KEY).then((books) => {
    let nextBookIdx = books.findIndex((book) => book.id === bookId) + 1
    if (nextBookIdx === books.length) nextBookIdx = 0
    return books[nextBookIdx].id
  })
}
function getDefaultFilter() {
  return { txt: '', minSpeed: '' }
}

function _createBooks() {
  let books = utilService.loadFromStorage(BOOK_KEY)
  if (!books || !books.length) {
    books = [
      {
        id: 'OXeMG8wNskc',
        title: 'metus hendrerit',
        subtitle: 'mi est eros convallis auctor arcu dapibus himenaeos',
        authors: ['Barbara Cartland'],
        publishedDate: 1999,
        description:
          'placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse',
        pageCount: 713,
        categories: ['Computers', 'Hack'],
        thumbnail: 'http://coding-academy.org/books-photos/20.jpg',
        language: 'en',
        listPrice: {
          amount: 109,
          currencyCode: 'EUR',
          isOnSale: false,
        },
      },
      {
        id: 'JYOJa2NpSCq',
        title: 'morbi',
        subtitle: 'lorem euismod dictumst inceptos mi',
        authors: ['Barbara Cartland'],
        publishedDate: 1978,
        description:
          'aliquam pretium lorem laoreet etiam odio cubilia iaculis placerat aliquam tempor nisl auctor',
        pageCount: 129,
        categories: ['Computers', 'Hack'],
        thumbnail: 'http://coding-academy.org/books-photos/14.jpg',
        language: 'sp',
        listPrice: {
          amount: 44,
          currencyCode: 'EUR',
          isOnSale: true,
        },
      },
      {
        id: '1y0Oqts35DQ',
        title: 'at viverra venenatis',
        subtitle: 'gravida libero facilisis rhoncus urna etiam',
        authors: ['Dr. Seuss'],
        publishedDate: 1999,
        description:
          'lorem molestie ut euismod ad quis mi ultricies nisl cursus suspendisse dui tempor sit suscipit metus etiam euismod tortor sagittis habitant',
        pageCount: 972,
        categories: ['Computers', 'Hack'],
        thumbnail: 'http://coding-academy.org/books-photos/2.jpg',
        language: 'he',
        listPrice: {
          amount: 108,
          currencyCode: 'ILS',
          isOnSale: false,
        },
      },
    ]
    utilService.saveToStorage(BOOK_KEY, books)
  }
  return books
  //   let books = utilService.loadFromStorage(BOOK_KEY)
  //   if (!books || !books.length) {
  //     books = []
  //     books.push(_createBook('audu', 300))
  //     books.push(_createBook('fiak', 120))
  //     books.push(_createBook('subali', 100))
  //     books.push(_createBook('mitsu', 150))
  //     utilService.saveToStorage(BOOK_KEY, books)
  //   }
}

function _createBook(vendor, maxSpeed = 250) {
  const book = getEmptyBook(vendor, maxSpeed)
  book.id = utilService.makeId()
  return book
}
