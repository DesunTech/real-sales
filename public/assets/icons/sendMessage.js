import * as React from "react"
const SendMessage = (props) => (
  <svg
    width={props?.width || 25}
    height={props?.height || 25}
    fill="none"
    {...props}
  >
    <path
      fill={props?.stroke || "#060606"}
      fillOpacity={0.85}
      d="M21.177 3.823a1.51 1.51 0 0 0-1.531-.365L4.406 8.542a1.5 1.5 0 0 0-.24 2.76l6.324 3.125 3.125 6.344a1.5 1.5 0 0 0 1.343.823h.104a1.489 1.489 0 0 0 1.313-1.042l5.156-15.198a1.468 1.468 0 0 0-.354-1.531ZM5.052 9.979l13.302-4.437-7.385 7.385-5.917-2.948Zm9.98 9.969-2.96-5.917 7.386-7.385-4.427 13.302Z"
    />
  </svg>
)
export default SendMessage
