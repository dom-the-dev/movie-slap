import {useEffect, useState} from 'react';
import {supabase} from "../supabase";
import {getWatchList, updateWatchlistMovie, deleteFromWatchlist} from "../helper/watchlist";
import {fetchMovie} from "../helper/movies";
import MovieCard from "../components/MovieCard";
import Message from "../components/Message";

const Watchlist = ({user}) => {
    const [watchList, setWatchList] = useState([])
    const [message, setMessage] = useState({type: "", message: ""})

    useEffect(() => {
        fetchMovies()
    }, [])

    async function fetchMovies() {
        const watchtList = await getWatchList(user.id)

        let movies = []
        for (const movie of watchtList.data) {
            let mov = await getMovie(movie.movie_id)
            mov.watched = movie.watched
            movies.push(mov)
        }

        setWatchList(movies)
    }

    async function getMovie(id) {
        return await fetchMovie(id)
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
                    <button className={"button button--secondary"}
                            onClick={() => handleWatched(movie.id, !movie.watched)}>{`${!movie.watched ? "Mark as Watched" : "Unwatch"}`}
                    </button>
                    <button className={"button"} onClick={() => handleDeleteFromWatchlist(movie.id)}>Delete from
                        Watch List
                    </button>
                </div>
            </div>
        ))
    )

    return (
        <div>
            {message.message && <Message message={message.message} type={message.type}/>}
            <h1>Your watchlist</h1>
            <div className="container mx-auto grid grid-cols-4 md:grid-cols-6 lg:grid-cols-5 gap-3">
                {renderWatchlist()}
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
