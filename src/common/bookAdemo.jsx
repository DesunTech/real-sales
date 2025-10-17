import Link from "next/link";
import React from "react";
import { useCalendly } from "./CalendlyWidget";

const BookAdemo = (props) => {
  const { openCalendlyPopup } = useCalendly();

  const handleClick = (e) => {
    e.preventDefault();
    if (props?.onClick) {
      props.onClick();
    } else {
      // Open Calendly popup by default
      openCalendlyPopup();
    }
  };

  return (
    <Link
      href={props?.link || "#"}
      onClick={handleClick}
      className={`uppercase border-b-[2px] border-dolid  flex items-center justify-center gap-2 px-10 py-1 rounded border-white bg-[#000000] text-[#060606] hover:bg-[#FFDE5A] m-plus-rounded-1c-regular ${props?.className}`}
    >
      {props?.BookaDemo ? props?.BookaDemo : "Book a Demo"}
      {props?.icon}
    </Link>
  );
};

export default BookAdemo;