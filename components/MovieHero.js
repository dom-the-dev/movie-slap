import React from 'react';
import PropTypes from 'prop-types';

const MovieHero = ({movie, type}) => {
    const BACKDROP_PATH = process.env.NEXT_PUBLIC_MOVIE_POSTER
    const title = type === "tv" ? movie.name : movie.title

    const renderGenres = () => {
        return movie.genres.map((genre, index) => {
            return <span className={`text-white`} key={genre.id + index}>{`${genre.name}${index < movie.genres.length - 1 ? ", " : " "}`}</span>
        })
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
        </div>
    );
};

MovieHero.propTypes = {
    movie: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
};

export default MovieHero;
