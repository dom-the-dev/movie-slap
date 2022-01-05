import {supabase} from "../supabase";

export const getWatchList = async (id) => {
    const {data, error} = await supabase
        .from('watchlists')
        .select()
        .match({user_id: id})

    if (error) console.log(error)

    return {data, error}
}

export const updateWatchlistMovie = async (id, movieId, watched) => {
    const {data, error} = await supabase
        .from('watchlists')
        .update({watched: watched})
        .match({user_id: id, movie_id: movieId})


    if (error) {
        console.log(error)
    }

    return {data, error}
}

export const deleteFromWatchlist = async (id, movieId) => {
    const {data, error} = await supabase
        .from('watchlists')
        .delete()
        .match({user_id: id, movie_id: movieId})

    if (error) {
        console.log(error)
    }

    return {data, error}
}


export const addToWatchlist = async (id, movieId, watched, liked, title) => {
    const {data, error} = await supabase
        .from('watchlists')
        .insert([
            {
                user_id: id,
                watched: watched,
                movie_id: movieId,
                liked: liked,
                title: title
            }
        ])

    if (error) {
        console.log(error)
    }

    return {data, error}
}