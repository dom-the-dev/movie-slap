import React from 'react';
import SimpleHeader from "../../components/SimpleHeader";
import {supabase} from "../../supabase";
import {fetchMovie} from "../../helper/movies";

const Movie = ({user, movie, type}) => {
    const title = type === "tv" ? movie.name : movie.title

    return (
        <div>
            <SimpleHeader text={title}/>
        </div>
    );
};

export default Movie;

export async function getServerSideProps({req, params}) {
    const {user} = await supabase.auth.api.getUserByCookie(req)
    const movie = await fetchMovie(params.id, params.type)


    // const provider = await getMovieProvider(params.id)

    return {
        props: {
            user,
            movie,
            type: params.type
            // provider
        }
    }
}
