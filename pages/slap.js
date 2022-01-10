import {useEffect, useState} from 'react';
import {supabase} from "../lib/initSupabase";
import {fetchMovie, fetchRandomMovies, getLatestMovie} from "../helper/movies";
import SimpleHeader from "../components/SimpleHeader";
import TinderCard from "react-tinder-card";
import Message from "../components/Message";
import {addToWatchlist} from "../helper/watchlist";
import Layout from "../components/Layout";
import SlapItem from "../components/SlapItem";

const Slap = ({user}) => {
    const [movie, setMovie] = useState({})
    const [message, setMessage] = useState({type: "", message: ""})

    useEffect(() => {
        getNextMovie("movie")
    }, []);

    async function getNextMovie(type) {
        const {id} = await getLatestMovie(type)
        getRandomMovie(id, type)
    }

    async function getRandomMovie(id, type) {
        const movie = await fetchMovie(Math.floor(Math.random() * id), type)

        if (movie && !movie.adult) {
            setMovie(movie)
        } else {
            getRandomMovie(id, type)
        }
    }

    const handleAddToWatchList = async (movie) => {
        const res = await addToWatchlist(user.id, movie.id, false, false, movie.title, "movie")

        if (res.error) {
            console.error(res.error.message)
            setMessage({type: "error", message: "Something went wrong"})
        }

        if (res.data) {
            setMessage({type: "success", message: "Movie added to watchlist"})
        }


        getNextMovie("movie")
    }

    const handleNextMovie = () => {
        setMessage({
            message: "",
            type: ""
        })

        getNextMovie("movie")
    }

    return (
        <Layout title={"Slap!"}>
            {message && message.message && <Message message={message.message} type={message.type}/>}

            <SimpleHeader text={"Slap your Movies"}/>

            <div className={`relative mx-auto max-w-sm`}>
                <TinderCard
                    key={movie.id}
                    className={`absolute min-h-50`}
                    onSwipe={direction => direction === "right" ? handleAddToWatchList(movie) : handleNextMovie()}
                >
                    <SlapItem
                        movie={movie}
                    />
                </TinderCard>
            </div>
        </Layout>
    );
};

export default Slap;

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

