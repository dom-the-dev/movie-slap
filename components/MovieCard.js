import Link from "next/link";

const MovieCard = ({movie, asLink}) => {
    const title = movie.media_type === "tv" ? movie.name : movie.title
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w300"

    const MC = () => {
        return (
            <div className={`relative hover:shadow cursor-pointer`}>
                <div className={`bg-brand`}>
                    {movie.poster_path ?
                        <img
                            src={`${IMAGE_PATH}/${movie.poster_path}`}
                            alt={`${title} cover`}
                        />
                        : "No image"
                    }
                </div>
                <div
                    className={`absolute top-2 right-2 rounded-full w-10 h-10 flex justify-center items-center text-sm text-dark bg-brand font-bold border-white border`}>
                    {movie.vote_average}
                </div>
                <div
                    className={`text-center absolute bottom-0 h-14 p-1 flex justify-center items-center bg-dark text-white tracking-wider w-full`}>
                    {title}
                </div>
            </div>
        )
    }

    // 300 * 450
    const AsLink = ({children}) => {
        return (
            <Link href={`${movie.media_type}/${movie.id}`}>
                <a>
                    {children}
                </a>
            </Link>
        )
    }


    return (
        asLink ? <AsLink><MC/></AsLink> : <MC/>
    );
};

export default MovieCard;
