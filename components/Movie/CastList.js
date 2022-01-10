import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Slider from "react-slick";
import {AiFillCaretLeft, AiFillCaretRight} from "react-icons/ai";

const CastList = ({cast}) => {
    const slider = useRef()

    const next = () => {
        slider.current.slickNext();
    }
    const prev = () => {
        slider.current.slickPrev();
    }

    const settings = {
        infinite: true,
        speed: 500,
        dots: true,
        draggable: false,
        arrows: false,
        slidesToShow: 6,
        slidesToScroll: 2,
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


    const renderCast = () => (
        cast.slice(0, 20).map(person => (
            <div key={person.cast_id} className={`p-2`}>
                <div className={`bg-white rounded-3xl p-2 text-center`}>
                    {person.profile_path &&
                        <Image src={process.env.NEXT_PUBLIC_MOVIE_COVER_SMALL + person.profile_path}
                               alt="Avatar"
                               width={92}
                               layout={"responsive"}
                               className={`rounded-3xl mx-auto`}
                               height={138}
                        />
                    }
                    <div className={`h-12 pt-2 leading-3`}>
                        <span className={`text-xs text-dark`}>{person.name && person.name}</span> <br/>
                    </div>
                </div>
            </div>
        ))
    )

    return (
        <div>
            <div className={`flex justify-between items-center mb-4`}>
                <h4>Cast</h4>
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
                {renderCast()}
            </Slider>
        </div>
    )
};

CastList.propTypes = {
    cast: PropTypes.array.isRequired
};

export default CastList;
