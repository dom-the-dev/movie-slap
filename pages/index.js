import {useEffect, useState} from "react";
import {fetchPopularMovies} from "../helper/movies";
import MovieCard from "../components/MovieCard";

export default function Home() {

    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(null)

    useEffect(() => {
        fetchMovies()
    }, [])


    async function fetchMovies(nextPage = 1) {
        const {movies, pages, page} = await fetchPopularMovies(nextPage)
        setMovies(movies)
        setPage(page)
        setMaxPage(pages)
    }

    const renderMovies = () => (
        movies.map(movie => (
            <MovieCard key={movie.id} movie={movie}/>
        ))
    )

    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                Welcome to Movie Slap
            </h1>

            <h2>Trending Movies</h2>
            <div className="container mx-auto grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-3">
                {renderMovies()}
            </div>

            <div>
                <button className={`bg-brand ${page <= 1 ? "bg-gray-200 text-gray-500" : ""}`}
                        disabled={page <= 1}
                        onClick={async () => await fetchMovies(page - 1)}
                >
                    Prev Movies
                </button>

                <button className={`bg-brand ${page >= maxPage ? "bg-gray-200 text-gray-500" : ""}`}
                        disabled={page >= maxPage}
                        onClick={async () => await fetchMovies(page + 1)}
                >
                    Next Next Movies
                </button>
            </div>
        </div>
    )
}
