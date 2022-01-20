import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {addToWatchlist, deleteFromWatchlist, getMovieFromWatchlist} from "../helper/watchlist";

const MovieHero = ({movie, type, user, setMessage}) => {
    const BACKDROP_PATH = process.env.NEXT_PUBLIC_MOVIE_POSTER
    const title = type === "tv" ? movie.name : movie.title
    const [isLoadingUserData, setIsLoadingUserData] = useState(true);
    const [isOnWatchlist, setIsOnWatchlist] = useState(false);

    useEffect(() => {
        if (user) checkWatchlist()
    }, [isOnWatchlist]);


    const renderGenres = () => {
        return movie.genres.map((genre, index) => {
            return <span className={`text-white`}
                         key={genre.id + index}>{`${genre.name}${index < movie.genres.length - 1 ? ", " : " "}`}</span>
        })
    }

    async function checkWatchlist() {
        const watchlistItem = await getMovieFromWatchlist(user.id, movie.id)

        if (watchlistItem) {
            setIsOnWatchlist(true)
            setIsLoadingUserData(false)
        }
    }

    const handleAddToWatchList = async () => {
        const res = await addToWatchlist(user.id, movie.id, false, false, movie.title, "movie")

        if (res.error) {
            console.error(res.error.message)
            setMessage({type: "error", message: "Something went wrong"})
        }

        if (res.data) {
            setMessage({type: "success", message: "Movie added to watchlist"})
            setIsOnWatchlist(true)
        }

    }

    async function handleDeleteFromWatchlist(movieId) {
        const res = await deleteFromWatchlist(user.id, movieId)

        if (res.error) {
            setMessage(res.error.message)
        }
        if (res.data) {
            setMessage({message: "Movie deleted from watchlist", type: "warning"})
            setIsOnWatchlist(false)
        }
    }

    return (
        <div
            className={`h-40 sm:h-56 md:h-80 bg-light mb-7 bg-fixed bg-top bg-no-repeat bg-contain p-10 rounded-3xl flex flex-col justify-end`}
            style={movie && {backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)) , url(${BACKDROP_PATH}${movie.backdrop_path})`}
            }
        >
            <h1 className={`text-white`}>{title}</h1>
            {movie.tagline && <h2 className={`text-white`}>{movie.tagline}</h2>}
            <div>
                {renderGenres()}
            </div>

            {!user ? null :
                <div className={`mt-3`}>
                    {isLoadingUserData ? null :
                        type === "movie" && isOnWatchlist ?
                            <button className={`primary`} onClick={() => handleDeleteFromWatchlist(movie.id)}>
                                Remove from watchlist
                            </button>
                            :
                            <button className={`primary`} onClick={handleAddToWatchList}>Add to watchlist</button>
                    }
                    {type === "tv" && <button disabled>Coming soon </button>}
                </div>
            }
        </div>
    );
};

MovieHero.propTypes = {
    movie: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    user: PropTypes.object,
    setMessage: PropTypes.func.isRequired
};

export default MovieHero;
