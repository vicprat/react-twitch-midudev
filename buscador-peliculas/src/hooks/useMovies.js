import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const prevSearch = useRef(search)

  const getMovies = useCallback(
    async ({ search }) => {
      if (search === prevSearch.current) return
      try {
        setLoading(true)
        setError(null)
        prevSearch.current = search
        const newMovies = await searchMovies({ search })
        setMovies(newMovies)
      } catch (error) {
        setError(error)
      } finally {
        // esto se ejecuta siempre, haya error o no
        setLoading(false)
      }
    }, [search])

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [movies, sort])

  return { movies: sortedMovies, getMovies, loading, error }
}
