import {useEffect, useState} from "react";
import {fetchTrending, searchMovies as searchMovieApi} from "../helper/movies";
import {supabase} from "../lib/initSupabase";
import Layout from "../components/Layout";
import SimpleHeader from "../components/SimpleHeader";
import MovieSlider from "../components/MovieSlider";

export default function Home({user}) {
    const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"
    const [movies, setMovies] = useState([])
    const [shows, setShows] = useState([])

    useEffect(() => {
        fetchMovies(1, "movie")
        fetchMovies(1, "tv")
    }, [user])


    async function fetchMovies(nextPage = 1, type) {
        const data = await fetchTrending(nextPage, type)

        if (type === "movie") {
            setMovies(data.movies)
        } else {
            setShows(data.movies)
        }

    }

    return (
        <Layout title={"Home"}>

            <div
                className={`h-40 sm:h-56 md:h-64 bg-light mb-7 bg-fixed bg-top bg-contain p-10  flex justify-center items-center rounded-3xl`}
                style={movies[0] && {backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)) , url(${BACKDROP_PATH}${movies[0].backdrop_path})`}
                }
            >
                <SimpleHeader text={"Welcome to Movie Slap"} textColor={"text-white"}/>
            </div>


            <MovieSlider title={"Trending Movies"} movies={movies}/>
            <MovieSlider title={"Trending Shows"} movies={shows}/>

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
