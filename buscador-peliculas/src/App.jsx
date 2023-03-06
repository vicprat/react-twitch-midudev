import { useEffect, useState, useRef, useCallback } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it'

import './App.css'

function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = false
      return
    }
    if (search === '') {
      setError('Debes ingresar un título de película')
      return
    }
    if (search.match(/^[0-9]+$/)) {
      setError('No puedes ingresar números')
      return
    }
    if (search.length < 3) {
      setError('Debes ingresar al menos 3 caracteres')
      return
    }
    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

function App () {
  const [sort, setSorit] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debouncedMovies = useCallback(
    debounce(search => {
      console.log('search', search)
      getMovies({ search })
    }, 300), [getMovies])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleSort = () => {
    setSorit(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedMovies({ newSearch })
  }

  return (
    <div>
      <header>
        <h3>Buscador de Películas</h3>
        <form onSubmit={handleSubmit}>
          <input
            value={search}
            onChange={handleChange}
            name='query'
            type='text'
            placeholder='Star Wars'
          />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {
          loading
            ? <p>Cargando...</p>
            : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}

export default App
