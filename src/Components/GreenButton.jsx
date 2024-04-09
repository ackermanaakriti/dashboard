import React from 'react'

export const GreenButton = ({ className, text, type }) => {
  return (
    <>
      <button type={type} className={className}>
        {text}
      </button>
    </>
  )
}


export const CancelButton = ({ className, text, type, onClick }) => {
  return (
    <>
      <button onClick={onClick} type={type} className={className}>
        {text}
      </button>
    </>
  )
}


export const TableButton = ({ className, text, type }) => {
  return (
    <>
      <button type={type} className={className}>
        {text}
      </button>
    </>
  )
}

