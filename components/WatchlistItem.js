import React from 'react';
import PropTypes from 'prop-types';
import {IoIosEyeOff, IoMdEye} from "react-icons/io";
import {MdDelete} from "react-icons/md";
import Image from "next/image";
import Link from "next/link";

const WatchlistItem = ({movie, handleWatched, handleDeleteFromWatchlist}) => {
    const title = movie.media_type === "tv" ? movie.name : movie.title
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w92"
    const director = movie.credits.crew.filter(person => person.job === "Director")[0]

    console.log(movie)
    const renderGenres = () => {
        return movie.genres.map((genre, index) => {
            return <span key={genre.id + index}>{`${genre.name}${index < movie.genres.length - 1 ? ", " : " "}`}</span>
        })
    }

    return (
        <tr>
            <td className={`pb-5`}>
                {movie.poster_path ?
                    <Link href={`${movie.type}/${movie.id}`}>
                        <a>
                            <Image
                                className={`w-20 rounded-3xl`}
                                src={`${IMAGE_PATH}/${movie.poster_path}`}
                                alt={`${title} cover`}
                                width={92}
                                height={138}
                            />
                        </a>
                    </Link>
                    : "No image"
                }
            </td>
            <td className={`pb-5 pl-5 w-80 pr-2`}>
                <Link href={`${movie.type}/${movie.id}`}>
                    <a className={` font-bold text-dark hover:no-underline hover:text-brand`}>
                        <p className={`m-0`}>{title}</p>
                    </a>
                </Link>
                <p className={`text-sm m-0 text-mid`}>{movie.tagline}</p>
            </td>
            <td className={`pb-5 w-40`}>{director.name}</td>
            <td className={`pb-5 text-xs w-40`}>{renderGenres()}</td>
            <td className={`pb-5 w-10`}>{new Date(movie.release_date).getFullYear()}</td>
            <td className={`pb-5 text-center`}>{movie.runtime}</td>
            <td className={`pb-5 text-center`}>
                <button className={"bg-white border-none hover:text-brand p-1 text-center mr-2"}
                        title={!movie.watched ? "Mark as Watched" : "Unwatch"}
                        onClick={() => handleWatched(movie.id, !movie.watched)}>
                        <span className="sr-only">
                        {!movie.watched ? "Mark as Watched" : "Unwatch"}
                        </span>
                    {movie.watched ? <IoIosEyeOff/> : <IoMdEye/>}
                </button>
                <button className={"bg-white border-none hover:text-brand p-1 text-center"}
                        title="Delete from Watchlist"
                        onClick={() => handleDeleteFromWatchlist(movie.id)}
                >
                        <span className="sr-only">
                        Delete from Watchlist
                        </span>
                    <MdDelete/>
                </button>
            </td>
        </tr>
    );
};

WatchlistItem.propTypes = {
    movie: PropTypes.object.isRequired
};

export default WatchlistItem;
