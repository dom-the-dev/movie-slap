import axios from "axios";

const MOVIE_API = "https://api.themoviedb.org/3"

export async function fetchPopularMovies(page = 1) {
    try {

        const {data} = await axios.get(`${MOVIE_API}/discover/movie`, {
            params: {
                api_key: process.env.NEXT_PUBLIC_MOVIE_API_KEY,
                page: page
            }
        })

        console.log(data)

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