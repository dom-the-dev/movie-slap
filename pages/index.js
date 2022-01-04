import {useEffect, useState} from "react";
import {fetchTrending} from "../helper/movies";
import MovieCard from "../components/MovieCard";

export default function Home() {
    const [movies, setMovies] = useState([])
    const [series, setSeries] = useState([])

    useEffect(() => {
        fetch(1, "movie")
        fetch(1, "tv")
    }, [])


    async function fetch(nextPage = 1, type) {
        const {movies, pages, page} = await fetchTrending(nextPage, type)

        if (type === "movie") {
            setMovies(movies)
        }

        if (type === "tv") {
            setSeries(movies)
        }

    }

    const renderMovies = (data) => {
        return data.slice(0,10).map(movie => (
            <MovieCard key={movie.id} movie={movie}/>
        ))
    }

    return (
        <div>
            <h1>
                Welcome to Movie Slap
            </h1>

            <h2>Trending Movies</h2>
            <div className="container mx-auto grid grid-cols-4 md:grid-cols-6 lg:grid-cols-5 gap-3">
                {renderMovies(movies)}
            </div>

            <h2>Trending Series</h2>
            <div className="container mx-auto grid grid-cols-4 md:grid-cols-6 lg:grid-cols-5 gap-3">
                {renderMovies(series)}
            </div>
        </div>
    )
}
