import React from 'react'
import {DotLoader} from 'react-spinners'
export const Spinner = ({loading}) => {
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    return (
        <div style={style}>
            <DotLoader color='primary' loading={loading} />
        </div>
    )
}
