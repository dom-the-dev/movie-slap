import React from 'react';
import PropTypes from 'prop-types';

const SlapItem = ({movie, type}) => {
    const title = (movie.media_type || type) === "tv" ? movie.name : movie.title
    const IMAGE_PATH = process.env.NEXT_PUBLIC_MOVIE_COVER

    return (
        <div className={`relative cursor-grab mr-5`}>
            <div className={`rounded-3xl bg-brand flex justify-center items-center text-dark min-h-[27rem] min-w-[18rem]`}>
                {movie.poster_path ?
                    <img
                        className={`rounded-3xl`}
                        src={`${IMAGE_PATH}/${movie.poster_path}`}
                        alt={`${title} cover`}
                    />
                    : "No image"
                }
            </div>
            <div
                className={`absolute top-2 right-2 rounded-full w-8 h-8 flex justify-center items-center text-xs text-brand bg-dark font-bold `}>
                {movie.vote_average}
            </div>
            <div
                className={`bg-white rounded-b-3xl absolute bottom-0 font-bold h-20 p-2 tracking-wider w-full text-semi`}>
                {title}
            </div>
        </div>
    );
};

SlapItem.propTypes = {
    movie: PropTypes.object.isRequired
};

export default SlapItem;
