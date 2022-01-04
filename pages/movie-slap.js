import {useEffect, useState} from 'react';
import {supabase} from "../supabase";
import {fetchRandomMovies} from "../helper/movies";

const MovieSlap = () => {
    const [movies, setMovies] = useState([])
    const [message, setMessage] = useState([])

    useEffect(() => {
        fetchMovies()
    }, []);


    async function fetchMovies() {
        const data = await fetchRandomMovies()

        setMovies(data)
    }

    return (
        <div>
            <h1>Slap your Movies</h1>
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

