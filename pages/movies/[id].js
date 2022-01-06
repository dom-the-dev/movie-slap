import React from 'react';
import SimpleHeader from "../../components/SimpleHeader";
import {supabase} from "../../supabase";
import {fetchMovie, getMovieProvider} from "../../helper/movies";

const Movie = ({user, movie}) => {
    console.log(movie)
    const title = movie.media_type === "tv" ? movie.name : movie.title

    return (
        <div>
            <SimpleHeader text={title}/>
        </div>
    );
};

export default Movie;

export async function getServerSideProps({req, params}) {
    const {user} = await supabase.auth.api.getUserByCookie(req)
    const movie = await fetchMovie(params.id)

    // const provider = await getMovieProvider(params.id)

    return {
        props: {
            user,
            movie,
            // provider
        }
    }
}
