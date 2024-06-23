import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { CarIndex } from './pages/CarIndex.jsx'

const { useState } = React

export function App() {
  const [page, setPage] = useState('home')

  return (
    <section className='app'>
      <header className='app-header full main-layout'>
        <section>
          <h1>React Car App</h1>
          <nav className='app-nav'>
            <a onClick={() => setPage('home')} href='#'>
              Home
            </a>
            <a onClick={() => setPage('about')} href='#'>
              About
            </a>
            <a onClick={() => setPage('bookIndex')} href='#'>
              Books
            </a>
          </nav>
        </section>
      </header>
      <main className='main-layout'>
        {page === 'home' && <Home />}
        {page === 'about' && <About />}
        {page === 'bookIndex' && <CarIndex />}
      </main>
    </section>
  )
}
