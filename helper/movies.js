import axios from "axios";

const MOVIE_API = "https://api.themoviedb.org/3"

// /certification/movie/list

export async function fetchTrending(page = 1, type = "movie") {
    try {

        const {data} = await axios.get(`${MOVIE_API}/trending/${type}/week`, {
            params: {
                api_key: process.env.NEXT_PUBLIC_MOVIE_API_KEY,
                page
            }
        })

        return {
            movies: data.results,
            pages: data.total_pages,
            page: data.page
        }

    } catch (e) {
        console.error(e)
    }
}

export async function searchMovies(page = 1, type = "movie", query) {
    try {

        const {data} = await axios.get(`${MOVIE_API}/search/${type}`, {
            params: {
                api_key: process.env.NEXT_PUBLIC_MOVIE_API_KEY,
                query,
                page
            },
        })

        return {
            movies: data.results,
            pages: data.total_pages,
            page: data.page
        }

    } catch (e) {
        console.error(e)
    }
}


export const fetchRandomMovies = async () => {
    const {data} = await axios.get(`${MOVIE_API}/discover/movie`, {
        params: {
            api_key: process.env.NEXT_PUBLIC_MOVIE_API_KEY,
            page: Math.random() * 501
        }
    })

    return data.results
}

export const fetchMovie = async (id) => {
    const {data} = await axios.get(`${MOVIE_API}/movie/${id}?append_to_response=videos,images,watch`, {
        params: {
            api_key: process.env.NEXT_PUBLIC_MOVIE_API_KEY
        }
    })

    return data
}

export const getMovieProvider = async (id) => {
    const {data} = await axios.get(`${MOVIE_API}/movie/${id}/watch/providers`, {
        params: {
            api_key: process.env.NEXT_PUBLIC_MOVIE_API_KEY
        }
    })

    return data
}
