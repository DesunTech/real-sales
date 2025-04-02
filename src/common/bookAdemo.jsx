import Link from "next/link";
import React from "react";

const BookAdemo = (props) => {
  return (
    <Link
      href={props?.link || "#"}
      className={`uppercase border-b-[2px] border-dolid  flex items-center justify-center gap-2 px-10 py-1 rounded border-white bg-[#FFDE5A] text-[#060606] hover:bg-[#FFDE5A] m-plus-rounded-1c-regular ${props?.className}`}
    >
      Book a Demo
      {props?.icon}
    </Link>
  );
};

export default BookAdemo;
