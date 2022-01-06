import {useEffect, useState} from 'react';
import {supabase} from "../supabase";
import {getWatchList, updateWatchlistMovie, deleteFromWatchlist} from "../helper/watchlist";
import {fetchMovie} from "../helper/movies";
import MovieCard from "../components/MovieCard";
import Message from "../components/Message";
import SimpleHeader from "../components/SimpleHeader";

const Watchlist = ({user}) => {
    const [watchList, setWatchList] = useState([])
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState({type: "", message: ""})

    useEffect(() => {
        fetchMovies()
    }, [])

    async function fetchMovies() {
        const watchtList = await getWatchList(user.id)

        let movies = []
        for (const movie of watchtList) {
            let mov = await getMovie(movie.movie_id, movie.type)
            mov.watched = movie.watched
            movies.push(mov)
        }

        setWatchList(movies)
        setLoading(false)
    }

    async function getMovie(id, type) {
        return await fetchMovie(id, type)
    }

    async function handleWatched(movieId, watched) {
        const res = await updateWatchlistMovie(user.id, movieId, watched)

        if (res.error) console.error(res.error.message)

        if (res.data) {
            fetchMovies()
            let msg = message

            if (watched) {
                msg.message = "Marked as watched"
                msg.type = "success"
            } else {
                msg.message = "Unwatched"
                msg.type = "warning"

            }
            setMessage(msg)
        }
    }

    async function handleDeleteFromWatchlist(movieId) {
        const res = await deleteFromWatchlist(user.id, movieId)

        if (res.error) setMessage(res.error.message)
        if (res.data) {
            fetchMovies()
            setMessage('Movie deleted from watchlist')
        }
    }

    const renderWatchlist = () => (
        watchList.map(movie => (
            <div key={movie.id}>
                <MovieCard movie={movie}/>
                <div className={"button-wrapper"}>
                    <button className={"primary w-full my-1"}
                            onClick={() => handleWatched(movie.id, !movie.watched)}>{`${!movie.watched ? "Mark as Watched" : "Unwatch"}`}
                    </button>
                    <button className={"secondary w-full my-1"}
                            onClick={() => handleDeleteFromWatchlist(movie.id)}>Delete from
                        Watch List
                    </button>
                </div>
            </div>
        ))
    )

    return (
        <div>
            {message.message && <Message message={message.message} type={message.type}/>}
            <SimpleHeader text={"Your Watchlist"}/>
            <div className="container mx-auto grid grid-cols-4 md:grid-cols-6 lg:grid-cols-5 gap-3">
                {loading ? "loading your watchlist" : renderWatchlist()}
            </div>
        </div>
    );
};

export default Watchlist;

export async function getServerSideProps({req}) {
    const {user} = await supabase.auth.api.getUserByCookie(req)

    if (!user) {
        return {props: {}, redirect: {destination: '/sign-up'}}
    }

    return {
        props: {
            user
        }
    }
}
