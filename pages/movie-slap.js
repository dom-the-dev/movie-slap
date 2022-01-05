import {useEffect, useState} from 'react';
import {supabase} from "../supabase";
import {fetchRandomMovies} from "../helper/movies";
import SimpleHeader from "../components/SimpleHeader";

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
            <SimpleHeader text={"Slap your Movies"}/>
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

