import {useEffect, useState} from "react";
import {fetchTrending, searchMovies as searchMovieApi} from "../helper/movies";
import MovieCard from "../components/MovieCard";
import {supabase} from "../lib/initSupabase";
import Layout from "../components/Layout";

export default function Home({user}) {
    const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"
    const [movies, setMovies] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [type, setType] = useState("movie")
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(null)

    useEffect(() => {
        fetchMovies(1, type)

    }, [type, user])


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
            <MovieCard asLink={true} key={movie.id} movie={movie}/>
        ))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchMovies()
    }

    return (
        <Layout title={"Home"}>

            <div className={``}>
                <form onSubmit={handleSubmit} className={``}>
                    <div className={`relative  w-1/3`}>
                    <input
                        className={`w-full pl-5 text-xs`}
                        type="text"
                        placeholder={"Search..."}
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                    <button type={"submit"} className={`absolute flex justify-center items-center h-10 w-10 top-1 right-1 rounded-full text-xl`}>
                        GO
                    </button>
                    </div>
                </form>

                <div className={``}>
                    <button className={` ${type === "movie" ? "primary" : "secondary"}`}
                            onClick={() => setType("movie")}>
                        Movie
                    </button>
                    <button className={` ${type === "tv" ? "primary" : "secondary"}`}
                            onClick={() => setType("tv")}>
                        Series
                    </button>

                </div>
            </div>




            <div className={`h-40 sm:h-56 md:h-64 bg-light mb-5  bg-fixed bg-top bg-contain p-10  flex justify-center items-center`}
                 style={movies[0] && {backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)) , url(${BACKDROP_PATH}${movies[0].backdrop_path})`}
                 }
            >

                <h1 className={"text-white"}>
                    Welcome to Movie Slap.
                </h1>

            </div>


            <div className="container mx-auto grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                {renderMovies(movies)}
            </div>

            <div className={`flex justify-center my-10`}>
                <button
                    disabled={page <= 1}
                    className={`primary mx-2`}
                    onClick={() => fetchMovies(page - 1)}
                >
                    prev
                </button>

                <button
                    disabled={page >= maxPage}
                    className={`primary mx-2`}
                    onClick={() => fetchMovies(page + 1)}
                >
                    next
                </button>
            </div>

        </Layout>
    )
}

export async function getServerSideProps({req}) {
    const {user} = await supabase.auth.api.getUserByCookie(req)

    return {
        props: {
            user
        }
    }
}
