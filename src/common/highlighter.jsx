import React from 'react'

const Highlighter = (props) => {
  return (
    <div className={`highlighted-chip ${props?.className}`}>{props?.highlight || "RealSales"}</div>
  )
}

export default Highlighter