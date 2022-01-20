import {supabase} from "../lib/initSupabase";

export const getWatchList = async (id) => {
    const {data, error} = await supabase
        .from('watchlists')
        .select()
        .match({user_id: id})

    if (error) console.error(error)

    return data
}

export const getMovieFromWatchlist = async (userId, movieId) => {
    const {data, error} = await supabase
        .from('watchlists')
        .select()
        .match({user_id: userId, movie_id: movieId})

    if (error){
        console.error(error)
        throw new Error("Error checking if movie is on watchlist")
    }

    if(data){
        return data[0]
    }
}

export const updateWatchlistMovie = async (id, movieId, watched) => {
    const {data, error} = await supabase
        .from('watchlists')
        .update({watched: watched})
        .match({user_id: id, movie_id: movieId})


    if (error) {
        console.error(error)
    }

    return {data, error}
}

export const deleteFromWatchlist = async (id, movieId) => {
    const {data, error} = await supabase
        .from('watchlists')
        .delete()
        .match({user_id: id, movie_id: movieId})

    if (error) {
        console.error(error)
    }

    return {data, error}
}


export const addToWatchlist = async (id, movieId, watched, liked, title, type) => {
    const {data, error} = await supabase
        .from('watchlists')
        .upsert([
            {
                user_id: id,
                watched: watched,
                movie_id: movieId,
                liked: liked,
                title: title,
                type: type
            }
        ])
        .match({user_id: id, movie_id: movieId})

    if (error) {
        console.error(error)
    }

    return {data, error}
}