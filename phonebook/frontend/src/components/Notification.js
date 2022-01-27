import React from 'react';

const SuccessNotification = ({message}) => (
    message === null ? null : (
        <div className="success">
            {message}
        </div>
    )
)

const ErrorNotification = ({message}) => (
    message === null ? null : (
        <div className="error">
            {message}
        </div>
    )
)

export { SuccessNotification, ErrorNotification };