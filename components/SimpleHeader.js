import React from 'react';
import PropTypes from 'prop-types';

const SimpleHeader = ({text, textColor}) => {
    return (
        <div className={`h-20 md:h-52 flex items-center justify-center text-mid`}>
            <h1 className={`${textColor}`}>{text}</h1>
        </div>
    );
};

SimpleHeader.propTypes = {
    text: PropTypes.string.isRequired
};

export default SimpleHeader;
