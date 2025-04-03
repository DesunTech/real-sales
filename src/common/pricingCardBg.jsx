import React from "react";

const PricingCardBg = ({ children, crdExtraCls, key }) => {
  return (
    <div key={key} className="relative w-full mt-8">
      <div className="absolute bg-gradient-to-b from-black/20 to-black/0 -top-4 -left-4 w-full h-full rounded-[10px] -z-10" />
      <div
        className={` bg-[url(../../public/assets/images/RealSales-backgrounds/bg-2.png)] shadow-[0px_10px_20px_2px_#00000026] bg-cover bg-center bg-no-repeat rounded-[10px] pt-4 ${crdExtraCls}`}
      >
        {children}
      </div>
    </div>
  );
};

export default PricingCardBg;
