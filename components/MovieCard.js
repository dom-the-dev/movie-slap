import Link from "next/link";

const MovieCard = ({movie, asLink, type}) => {
    const title = (movie.media_type || type) === "tv" ? movie.name : movie.title
    const IMAGE_PATH = process.env.NEXT_PUBLIC_MOVIE_COVER

    const MC = () => {
        return (
            <div className={`relative cursor-pointer`}>
                <div className={`rounded-3xl ${!movie.poster_path && "bg-brand"} flex justify-center items-center text-dark `}>
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
                    className={`font-bold h-20 pt-2 tracking-wider w-full text-semi`}>
                    {title}
                </div>
            </div>
        )
    }

    const AsLink = ({children}) => {
        return (
            <Link href={`${movie.media_type || type}/${movie.id}`}>
                <a className={`hover:no-underline`}>
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
