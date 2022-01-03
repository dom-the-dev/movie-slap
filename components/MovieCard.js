import React from 'react';

const MovieCard = ({movie}) => {
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w300"
    return (
            <div key={movie.id}>
                {movie.poster_path ?
                    <img
                        width={"100%"}
                        src={`${IMAGE_PATH}/${movie.poster_path}`}
                        alt={`${movie.name} cover`}/>
                    : <div className={"movie-placeholder"}>
                        No image
                    </div>}
                {movie.title}
            </div>
    );
};

export default MovieCard;
