import React, {useEffect, useState} from "react";
import {fetchTrending} from "../helper/movies";
import {supabase} from "../lib/initSupabase";
import Layout from "../components/Layout";
import MovieSlider from "../components/MovieSlider";
import {useRouter} from "next/router";
import SearchBar from "../components/SearchBar";

export default function Home({user}) {
    const router = useRouter()
    const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"
    const [movies, setMovies] = useState([])
    const [shows, setShows] = useState([])
    const [query, setQuery] = useState("");

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

    const handleSearch = (e) => {
        e.preventDefault()
        router.push({
            pathname: "/search",
            query: {query}
        });
    }

    return (
        <Layout title={"Home"}>

            <div
                className={`h-40 sm:h-56 md:h-64 bg-light mb-7 bg-fixed bg-top bg-contain p-10 rounded-3xl flex flex-col items-center justify-center`}
                style={movies[0] && {backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)) , url(${BACKDROP_PATH}${movies[0].backdrop_path})`}
                }
            >
                <h1 className={`text-white`}>Welcome to Movie Slap</h1>
                <SearchBar handleSearch={handleSearch} query={query} setQuery={setQuery}/>

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
