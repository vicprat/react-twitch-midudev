import responseMovies from '../mocks/withResults.json'
import withoutResponse from '../mocks/noResponse.json'

export function useMovies() {
    const movies = responseMovies.Search

    const mapedMovies = movies?.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
    }))
    return { movies: mapedMovies }
}