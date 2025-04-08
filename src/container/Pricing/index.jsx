import React, { useState } from "react";
import Highlighter from "../../common/highlighter";
import Link from "next/link";
import ArrowRight from "../../../public/assets/icons/arrowRight";
import { Switch } from "@mui/material";
import PricingCard from "../../common/pricingCard";

const Pricing = () => {
  const [checked, setChecked] = useState(false);

  const pricingArr = [
    {
      name: "Starter",
      description: "Best for solo Sales Rep",
      descriptionSub: "2 personas, personal coaching insight",
      price1: "$59",
      price2: "$249",
      features: [
        { allow: true, title: "1 User" },
        { allow: true, title: "Max 2 Personas" },
        { allow: true, title: "1 Industry" },
        { allow: false, title: "Saved Interactions" },
        { allow: false, title: "Sales Coaching" },
        {
          allow: false,
          title:
            "Upload Company info and Case Studies for customized experience",
        },
        { allow: false, title: "Team Reporting for Manager" },
        { allow: false, title: "Customer Persona development" },
        {
          allow: false,
          title: "Business Intelligence for Product Development",
        },
      ],
    },
    {
      name: "Starter",
      description: "Best for solo Sales Rep",
      descriptionSub: "2 personas, personal coaching insight",
      price1: "$59",
      price2: "$249",
      features: [
        { allow: true, title: "Up to 5 Users" },
        { allow: true, title: "Max 5 Personas" },
        { allow: true, title: "1 Industry" },
        { allow: false, title: "Saved Interactions" },
        { allow: false, title: "Sales Coaching" },
        {
          allow: false,
          title:
            "Upload Company info and Case Studies for customized experience",
        },
        { allow: false, title: "Team Reporting for Manager" },
        { allow: false, title: "Customer Persona development" },
        {
          allow: false,
          title: "Business Intelligence for Product Development",
        },
      ],
    },
    {
      name: "Starter",
      description: "Best for solo Sales Rep",
      descriptionSub: "2 personas, personal coaching insight",
      price1: "$59",
      price2: "$249",
      features: [
        { allow: true, title: "Up to 5 Users" },
        { allow: true, title: "Unlimited Personas" },
        { allow: true, title: "Unlimited Industry" },
        { allow: false, title: "Saved Interactions" },
        { allow: false, title: "Sales Coaching" },
        {
          allow: false,
          title:
            "Upload Company info and Case Studies for customized experience",
        },
        { allow: false, title: "Team Reporting for Manager" },
        { allow: false, title: "Customer Persona development" },
        {
          allow: false,
          title: "Business Intelligence for Product Development",
        },
      ],
    },
  ];

  const pricingArr2 = [
    {
      name: "Starter",
      description: "Best for solo Sales Rep",
      descriptionSub: "2 personas, personal coaching insight",
      price1: "$59",
      price2: "$249",
      features: [
        { allow: true, title: "Unlimited Users" },
        { allow: true, title: "Unlimited Personas" },
        { allow: true, title: "Unlimited Industry" },
      ],
    },
  ];

  return (
    <div className="page-container mx-auto px-4 py-8 container flex flex-col items-center lg:gap-4 gap-8">
      <Highlighter highlight={`Our Pricing`} />
      <p className="lg:text-2xl text-[16px] text-center m-plus-rounded-1c-regular text-[#060606] w-full flex items-center justify-center gap-2">
        Get fully reliable Price for every session.
        <Link
          href={`/pricing/free-trial`}
          className="underline sora-regular flex items-center gap-2"
        >
          Free Trial available
          <ArrowRight width={19} height={13} />
        </Link>
      </p>
      <div className="flex items-center gap-4">
        <div className="bg-[url(../../public/assets/images/RealSales-backgrounds/bg-7.png)] bg-cover bg-center bg-no-repeat rounded-[10px]">
          <div className="bg-[#FFFFFFD9] p-4">
            <p className="m-plus-rounded-1c-light text-[#060606] text-3xl">
              Monthly
            </p>
            <p className="m-plus-rounded-1c-regular text-[#060606B2] text-xl">
              Limited benefit !
            </p>
          </div>
        </div>

        <Switch
          className="coustomPricingSwitch !h-[35px] !w-[70px] !p-0"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />

        <div className="bg-[url(../../public/assets/images/RealSales-backgrounds/bg-6.png)] bg-cover bg-center bg-no-repeat rounded-[10px]">
          <div className="bg-[#FFFFFFD9] p-4">
            <p className="m-plus-rounded-1c-light text-[#060606] text-3xl">
              Yearly
            </p>
            <p className="m-plus-rounded-1c-medium text-[#AEAE27] text-xl">
              Save upto 10% !!
            </p>
          </div>
        </div>
      </div>
      <div className="w-full pl-[2%] flex flex-col gap-8">
        <div className="flex lg:flex-row flex-col gap-8">
          {pricingArr?.length
            ? pricingArr?.map((v, i) => (
                <PricingCard
                  key={i}
                  footerCls={`bg-none`}
                  // ExtPricing={true}
                  headingCls={`lg:flex-row flex-col`}
                  cardValue={v}
                  // crdExtraCls={`flex lg:flex-col md:flex-row flex-col item-center justify-between`}
                />
              ))
            : null}
        </div>
        {pricingArr2?.length
          ? pricingArr2?.map((v, i) => (
              <PricingCard
                key={i}
                hidePricing={true}
                ExtPricing={true}
                headingCls={`flex-col-reverse items-start`}
                pricingFetSls={`lg:w-[33%] w-full`}
                footerCls={`bg-none lg:w-[33%] w-full flex flex-col items-center justify-center gap-4`}
                crdExtraCls={`flex lg:flex-row flex-col item-center justify-between`}
                cardValue={v}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Pricing;
