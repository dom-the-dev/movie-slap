import {useEffect, useState} from "react";
import {fetchTrending, searchMovies as searchMovieApi} from "../helper/movies";
import MovieCard from "../components/MovieCard";

export default function Home() {
    const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"
    const [movies, setMovies] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [type, setType] = useState("movie")
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(null)

    useEffect(() => {
            fetchMovies(1, type)
    }, [type])


    async function fetchMovies(nextPage = 1) {
        let data
        if (searchQuery) {
            data = await searchMovieApi(nextPage, type, searchQuery)
        } else {
            data = await fetchTrending(nextPage, type)
        }

        setMovies(data.movies)
        setPage(data.page)
        setMaxPage(data.pages)
    }


    const renderMovies = (data) => {
        return data.map(movie => (
            <MovieCard key={movie.id} movie={movie}/>
        ))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchMovies()
    }

    return (
        <div>
            <div className={`h-40 sm:h-52 md:h-64 bg-light mb-5 rounded-b bg-fixed bg-top bg-contain p-10 `}
                 style={
                     {backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)) , url(${BACKDROP_PATH}${movies[0] ? movies[0].backdrop_path : ""})`}
                 }
            >

                <h1 className={"text-white"}>
                    Welcome to Movie Slap.
                </h1>

            </div>


            <div className={`flex justify-between mb-5`}>
                <form onSubmit={handleSubmit} className={`input w-1/3 flex`}>
                    <input
                        className={`w-full`}
                        type="text"
                        placeholder={"Search movie"}
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                    <button type={"submit"} className={`primary`}>Go</button>
                </form>

                <div>

                    <button className={`mr-2 ${type === "movie" ? "primary" : "secondary"}`}
                            onClick={() => setType("movie")}>
                        Movie
                    </button>
                    <button className={`${type === "tv" ? "primary" : "secondary"}`}
                            onClick={() => setType("tv")}>
                        Series
                    </button>

                </div>
            </div>

            <div className="container mx-auto grid grid-cols-2 sm:grid-cols-5  gap-3">
                {renderMovies(movies)}
            </div>

        </div>
    )
}
