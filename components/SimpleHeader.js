import React from 'react';
import PropTypes from 'prop-types';

const SimpleHeader = ({text}) => {
    return (
        <div className={`h-52 flex items-center justify-center`}>
            <h1>{text}</h1>
        </div>
    );
};

SimpleHeader.propTypes = {

};

export default SimpleHeader;
