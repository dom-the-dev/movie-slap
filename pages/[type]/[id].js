import React, {useEffect, useState} from 'react';
import {supabase} from "../../lib/initSupabase";
import {fetchMovie, getMovieProvider} from "../../helper/movies";
import Layout from "../../components/Layout";
import MovieHero from "../../components/MovieHero";
import StreamingList from "../../components/Movie/StreamingList";
import CastList from "../../components/Movie/CastList";
import Message from "../../components/Message";

const Movie = ({user, movie, type}) => {
    const title = type === "tv" ? movie.name : movie.title
    const [streaming, setStreaming] = useState([]);
    const [message, setMessage] = useState({})

    useEffect(() => {
        let userLang = navigator.language || navigator.userLanguage;
        let lang = userLang.split("-")[1]
        getStreamingProvider(lang)

    }, []);

    async function getStreamingProvider(lang) {
        const data = await getMovieProvider(movie.id, type)
        setStreaming(data.results[lang]?.flatrate)
    }

    return (
        <Layout title={title}>
            {message && message.message && <Message message={message.message} type={message.type}/>}

            <MovieHero setMessage={setMessage} movie={movie} type={type} user={user}/>

            <div className={`flex flex-col-reverse md:flex-row justify-between items-start`}>

                <div className={`w-full md:w-2/3`}>
                    <h4>Overview</h4>
                    {movie.overview && <p className={`mt-0`}>{movie.overview}</p>}

                    {movie?.credits?.cast &&
                        <div>
                            <CastList cast={movie.credits.cast}/>
                        </div>
                    }

                </div>

                {streaming &&
                    <div className={`w-full md:w-1/4 mb-5 md:mb-0`}>
                        <h4>Where to stream</h4>
                        <div className="flex flex-wrap">
                            <StreamingList streams={streaming}/>
                        </div>
                    </div>
                }
            </div>
        </Layout>
    );
};

export default Movie;

export async function getServerSideProps({req, params}) {
    const {user} = await supabase.auth.api.getUserByCookie(req)
    const movie = await fetchMovie(params.id, params.type)

    return {
        props: {
            user,
            movie,
            type: params.type
        }
    }
}
