import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

import './App.css'

function App() {
  const { movies } = useMovies()

  return (
    <div>

      <header>
        <h3>Buscador de Películas</h3>
        <form className=''>
          <input type="text" placeholder='Star Wars' />
          <button type='submit'>Buscar</button>
        </form>
      </header>

      <main>
        <Movies movies={movies} />
      </main>

    </div>
  )
}

export default App
