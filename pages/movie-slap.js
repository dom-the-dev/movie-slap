import {useEffect, useState} from 'react';
import {supabase} from "../supabase";
import {fetchRandomMovies} from "../helper/movies";
import SimpleHeader from "../components/SimpleHeader";
import TinderCard from "react-tinder-card";
import MovieCard from "../components/MovieCard";
import Message from "../components/Message";
import {addToWatchlist} from "../helper/watchlist";

const MovieSlap = ({user}) => {
    const [loading, setLoading] = useState(true)
    const [movies, setMovies] = useState([])
    const [message, setMessage] = useState({type: "", message: ""})

    useEffect(() => {
        fetchMovies()
    }, []);

    const handleAddToWatchList = async (movie) => {
        const res = await addToWatchlist(user.id, movie.id, false, true, movie.title, movie.media_type)

        if (res.error) {
            console.error(res.error.message)
            setMessage({type: "error", message: "Something went wrong"})
        }

        if (res.data) {
            setMessage({type: "success", message: "Movie added to watchlist"})
        }
    }

    async function fetchMovies() {
        const data = await fetchRandomMovies()

        setMovies(data)
        setLoading(false)
    }

    const renderMovies = () => {
        return movies.map((movie, index) => (
            <TinderCard
                key={movie.id}
                className={`absolute min-h-50`}
                onSwipe={direction => direction === "right" ? handleAddToWatchList(movie) : setMessage({
                    message: "",
                    type: ""
                })}
            >
                <MovieCard
                    asLink={false}
                    movie={movie}
                />
            </TinderCard>
        ))
    }

    return (
        <div>
            {message && message.message && <Message message={message.message} type={message.type}/>}

            <SimpleHeader text={"Slap your Movies"}/>

            <div className={`relative mx-auto max-w-sm`}>
                {loading ? "loading movies" : movies && renderMovies()}
            </div>
        </div>
    );
};

export default MovieSlap;

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

