import Image from "next/image";
import React from "react";
import notFoundGif from "../../public/assets/gifs/404.gif";

const PageNotFound = () => {
  return (
    <div className="relative flex items-center justify-center">
      <h1 className={`absolute top-[5%] sora-bold text-8xl text-[#060606dd]`}>
        404
      </h1>
      <h1
        className={`absolute bottom-[20%] sora-bold text-4xl text-[#060606dd]`}
      >
        Nothing turned up!
      </h1>
      <Image src={notFoundGif} alt="404" />
    </div>
  );
};

export default PageNotFound;
