import {useEffect, useState} from 'react';
import {supabase} from "../lib/initSupabase";
import {getWatchList, updateWatchlistMovie, deleteFromWatchlist} from "../helper/watchlist";
import {fetchMovie} from "../helper/movies";
import Message from "../components/Message";
import SimpleHeader from "../components/SimpleHeader";
import Layout from "../components/Layout";
import WatchlistItem from "../components/WatchlistItem";

const Watchlist = ({user}) => {
    const [watchList, setWatchList] = useState([])
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState({})

    useEffect(() => {
        fetchMovies()
    }, [])

    async function fetchMovies() {
        const watchtList = await getWatchList(user.id)

        let movies = []
        for (const movie of watchtList) {
            let mov = await getMovie(movie.movie_id, movie.type)
            mov.watched = movie.watched
            mov.type = movie.type
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
            let msg = {}

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

        if (res.error) {
            setMessage(res.error.message)
        }
        if (res.data) {
            fetchMovies()
            setMessage({message: "Movie deleted from watchlist", type: "warning"})
        }
    }

    const renderWatchlist = () => (
        watchList.map(movie => (
            <WatchlistItem
                key={movie.id}
                movie={movie}
                handleDeleteFromWatchlist={handleDeleteFromWatchlist}
                handleWatched={handleWatched}
            />
        ))
    )

    return (
        <Layout title={"Watchlist"}>
            {message.message && <Message message={message.message} type={message.type}/>}

            <SimpleHeader text={"Your Watchlist"}/>
            {loading ? "loading your watchlist" :

                <table className={`w-full text-left`}>
                    <thead className={``}>
                    <tr>
                        <th className={`text-center w-20 pb-5`}>Cover</th>
                        <th className={`pl-5 pb-5`}>Name</th>
                        <th className={`pb-5`}>Director</th>
                        <th className={`pb-5`}>Genre</th>
                        <th className={`pb-5 text-center`}>Year</th>
                        <th className={`pb-5 text-center`}>Runtime</th>
                        <th className={`text-center pb-5`}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderWatchlist()}
                    </tbody>
                </table>
            }
        </Layout>
    );
};

export default Watchlist;

export async function getServerSideProps({req}) {
    const {user} = await supabase.auth.api.getUserByCookie(req)

    if (!user) {
        await supabase.auth.signOut()
        return {props: {}, redirect: {destination: '/login'}}
    }

    return {
        props: {
            user
        }
    }
}