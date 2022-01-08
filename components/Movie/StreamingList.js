import React from 'react';
import PropTypes from 'prop-types';
import Image from "next/image";

const StreamingList = ({streams}) => {
    const IMAGE_PATH = process.env.NEXT_PUBLIC_MOVIE_LOGO

    const renderStreaming = () => (
        streams.map(stream => (
            <div key={stream.provider_id} className={`mr-2 cursor-pointer`}>
                {stream.logo_path &&
                    <Image
                        className={`rounded-2xl`}
                        src={`${IMAGE_PATH}/${stream.logo_path}`}
                        width={40}
                        height={40}
                        title={stream.provider_name}
                        alt={stream.provider_name}
                    />
                }
            </div>
        ))
    )

    return renderStreaming()
};

StreamingList.propTypes = {
    streams: PropTypes.array.isRequired
};

export default StreamingList;
