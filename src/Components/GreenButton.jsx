import React from 'react'

export const GreenButton = ({className,text,type}) => {
  return (
    <>
    <button type={type} className={className}>
  {text}
    </button>
    </>
  )
}


export const CancelButton =({className , text,type})=>
    {
        return (
            <>
             <button type={type} className={className}>
  {text}
    </button>
            </>
        )
    }

