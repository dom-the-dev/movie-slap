import React from 'react';
import PropTypes from 'prop-types';

const Message = ({message, type}) => {
    const warning = `bg-yellow-500`
    const error = `bg-red-500`
    const sucess = `bg-green-500`
    let style;

    switch (type) {
        case "success": style = sucess; break;
        case "warning": style = warning; break;
        default: style = style = error;
    }
    return (
        <div className={`text-center mb-10 block border p-5 rounded font-bold  ${style}`}>
            {message}
        </div>
    );
};

Message.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string
};

Message.defaultProps = {
    type: "warning"
}

export default Message;
