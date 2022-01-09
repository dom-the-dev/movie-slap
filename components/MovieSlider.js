import {useRef} from 'react';
import PropTypes from 'prop-types';
import MovieCard from "./MovieCard";
import Slider from "react-slick";
import {AiFillCaretLeft, AiFillCaretRight} from "react-icons/ai";

const MovieSlider = ({movies, title}) => {
    const slider = useRef()

    const next = () => {
        slider.current.slickNext();
    }
    const prev = () => {
        slider.current.slickPrev();
    }

    const settings = {
        infinite: true,
        speed: 300,
        dots: true,
        autoplay: true,
        draggable: false,
        arrows: false,
        slidesToShow: 6,
        slidesToScroll: 6,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    dots: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: false
                }
            }
        ]
    };

    const renderMovies = () => {
        return movies.map(movie => (
            <MovieCard asLink={true} key={movie.id} movie={movie}/>
        ))
    }


    return (
        <div className={`mb-10`}>
            <div className={`flex justify-between items-center mb-4`}>
                <h4>{title}</h4>
                <div>
                    <button className={`mr-2 bg-white text-dark hover:text-brand border-white`} onClick={() => prev()}>
                        <span className="sr-only">prev</span>
                        <AiFillCaretLeft/>
                    </button>
                    <button className={`bg-white text-dark hover:text-brand border-white`} onClick={() => next()}>
                        <AiFillCaretRight/>
                        <span className="sr-only">next</span>
                    </button>
                </div>
            </div>
            <Slider ref={slider} {...settings}>
                {renderMovies()}
            </Slider>
        </div>
    );
};

MovieSlider.propTypes = {
    movies: PropTypes.array.isRequired
};

export default MovieSlider;
