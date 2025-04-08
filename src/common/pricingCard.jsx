import React from "react";
import Image from "next/image";
import Highlighter from "./highlighter";
import blackLogo from "../../public/assets/images/RealSales-official-logo/For Web/png/Black logo - no background.png";
import pricingIcon from "../../public/assets/icons/pricing-icon.svg";
import greenBgTick from "../../public/assets/icons/greenBgTick.svg";
import redBgCross from "../../public/assets/icons/redBgCross.svg";
import BookAdemo from "./bookAdemo";
import ArrowRight from "../../public/assets/icons/arrowRight";
import PricingCardBg from "./pricingCardBg";
const PricingCard = (props) => {
  return (
    <PricingCardBg key={props?.key} crdExtraCls={`${props?.crdExtraCls}`}>
      <div>
        <div
          className={`flex ${props?.headingCls} items-center justify-between gap-4 px-4`}
        >
          <Image src={blackLogo} alt="blackLogo" className="h-10 w-auto" />
          <Highlighter highlight={`Punctuate`} />
        </div>
        <div className="bg-gradient-to-b from-[#ddd0]/0 via-transparent to-[#ddd]/70 p-4">
          <div className="flex items-center gap-2">
            <Image src={pricingIcon} alt="pricingIcon" />
            <p className="m-plus-rounded-1c-semilight text-5xl leading-0 text-[#060606]">
              {props?.cardValue?.name}
            </p>
          </div>
          <p className="sora-light text-[#06060699]">
            {props?.cardValue?.description}
            <br />
            {props?.cardValue?.descriptionSub}
          </p>
          {!props?.freePricing ? null : (
            <p className="m-plus-rounded-1c-regular text-[#060606aa] lg:text-5xl text-2xl mt-4">
              FREE&nbsp;
              <span className="text-[48%]">{`(Only Audio)`}</span>
            </p>
          )}
        </div>
      </div>
      <div className={`flex flex-col gap-4 p-4 ${props?.pricingFetSls}`}>
        {props?.hidePricing ? null : (
          <div>
            <p className="m-plus-rounded-1c-regular text-[#060606aa] text-[34px]">
              {props?.cardValue?.price1}&nbsp;
              <span className="text-[48%]">{`(1 session)`}</span>
            </p>
            <p className="m-plus-rounded-1c-regular text-[#060606aa] text-[34px]">
              {props?.cardValue?.price2}&nbsp;
              <span className="text-[48%]">{`(2 session)`}</span>
            </p>
          </div>
        )}
        <div className="flex items-center gap-0.5">
          <div className="border border-transparent [border-image-source:linear-gradient(90deg,rgba(6,6,6,0)_0%,#060606_100%)] [border-image-slice:1] w-full" />
          <div className="m-plus-rounded-1c-regular bg-[#DDDDDD] text-[#060606] py-1 px-4 rounded-[2px] w-fit">
            Features&nbsp;Included
          </div>
          <div className="border border-transparent [border-image-source:linear-gradient(90deg,rgba(6,6,6,0)_0%,#060606_100%)] [border-image-slice:1] w-full rotate-180" />
        </div>
        <div className="flex flex-col gap-4">
          {props?.cardValue?.features?.length
            ? props?.cardValue?.features.map((v, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Image
                    src={v?.allow ? greenBgTick : redBgCross}
                    alt={v?.allow ? "greenBgTick" : "redBgCross"}
                    className="w-5 h-5 mt-0.25"
                  />
                  <span className="sora-regular text-[#060606] lg:text-[15px] text-[12px]">
                    {v?.title}
                  </span>
                </div>
              ))
            : null}
        </div>
      </div>
      <div
        className={`${
          props?.footerCls || `lg:bg-gradient-to-b md:bg-none bg-gradient-to-b`
        } from-[#ddd]/0 to-[#ddd]/70 p-4 rounded-b-[10px]`}
      >
        {!props?.ExtPricing ? null : (
          <p className="m-plus-rounded-1c-regular text-[#060606aa] text-[34px]">
            $Talk to Sales&nbsp;
            <span className="text-[48%]">{`(for Details)`}</span>
          </p>
        )}
        <BookAdemo
          link={props?.link}
          onClick={props?.onClick}
          className={`!border-[#FFDE5A] !bg-[#060606] !text-[#FFDE5A] !px-5 !py-2.5 h-fit w-full`}
          BookaDemo={"CHOOSE PLAN"}
          icon={<ArrowRight stroke={`#FFDE5A`} width={19} height={13} />}
        />
      </div>
    </PricingCardBg>
  );
};

export default PricingCard;
