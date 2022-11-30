import React from 'react'
import {BarLoader} from 'react-spinners'
export const Spinner = ({loading}) => {
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    return (
        <div style={style}>
            <BarLoader loading={loading} />
        </div>
    )
}
