import React from 'react';
import PropTypes from 'prop-types';

const WatchlistItem = ({movie}) => {
    const title = movie.media_type === "tv" ? movie.name : movie.title
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w300"

    return (
        <div className={`flex items-center`}>
            {movie.poster_path ?
                <img
                    className={`w-20 rounded-3xl`}
                    src={`${IMAGE_PATH}/${movie.poster_path}`}
                    alt={`${title} cover`}
                />
                : "No image"
            }
            {title}
        </div>
    );
};

WatchlistItem.propTypes = {
    movie: PropTypes.object.isRequired
};

export default WatchlistItem;
