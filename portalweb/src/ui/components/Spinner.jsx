import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

export const SpinnerLoading = ({loading}) => {
    return (
        <div>
            {loading && <Spinner animation="border" role="status"/>}
        </div>
    )
}
