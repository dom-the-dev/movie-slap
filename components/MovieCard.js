const MovieCard = ({movie}) => {
    const title = movie.media_type === "tv" ? movie.name : movie.title
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w300"
    return (
        <div key={movie.id}>
            {movie.poster_path ?
                <img
                    width={"100%"}
                    src={`${IMAGE_PATH}/${movie.poster_path}`}
                    alt={`${title} cover`}/>
                : <div className={"h-72 bg-brand"}>
                    No image
                </div>}
            {title} <br/>
            {movie.vote_average}
        </div>
    );
};

export default MovieCard;
