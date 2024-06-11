import React from 'react'

interface Props {
    text : string
    onClickFunction? : () => void
}

const MyPrimaryButton = ({ text, onClickFunction }:Props) => {
    const primary_bg = process.env.PRIMARY_COLOR
    return (
        <>
            <button
                onClick={(e) => {
                    if (onClickFunction){
                        // @ts-ignore
                        return onClickFunction(e)
                    }}}
                className={` bg-primary px-4 py-2 font-bold rounded-lg text-white`} >
                {text}
            </button>

        </>
    )
}

export default MyPrimaryButton