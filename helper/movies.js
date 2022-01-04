import axios from "axios";

const MOVIE_API = "https://api.themoviedb.org/3"

// /certification/movie/list

export async function fetchTrending(page = 1, type = "movie") {
    try {

        const {data} = await axios.get(`${MOVIE_API}/trending/${type}/week`, {
            params: {
                api_key: process.env.NEXT_PUBLIC_MOVIE_API_KEY
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
    const {data} = await axios.get(`${MOVIE_API}/movie/${id}`, {
        params: {
            api_key: process.env.NEXT_PUBLIC_MOVIE_API_KEY
        }
    })

    return data
}