import * as React from "react"
const ArrowRight = (props) => (
  <svg
    width={props?.width || 19}
    height={props?.height || 15}
    fill="none"
    {...props}
  >
    <path
      stroke={props?.stroke || "#060606"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m17.833 7.5-6.25-6.25m6.25 6.25-6.25 6.25m6.25-6.25H6.896m-5.73 0h2.605"
    />
  </svg>
)
export default ArrowRight
