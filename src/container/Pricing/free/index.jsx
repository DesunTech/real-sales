import React from "react";
import PricingCard from "../../../common/pricingCard";
import { useDispatch } from "react-redux";
import { SessionModesValue } from "../../../redux/OpenModal";
import MeetPerfectPersona from "../../about/MeetPerfectPersona";

const Free = () => {
  const dispatch = useDispatch();
  const freePricing = [
    {
      name: "Starter",
      description: "Best for solo Sales Rep",
      descriptionSub: "2 personas, personal coaching insight",
      price1: "$59",
      price2: "$249",
      features: [
        { allow: false, title: "User" },
        { allow: false, title: "Personas" },
        { allow: false, title: "Industry" },
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

  return (
    <div className="page-container mx-auto px-4 py-8 container">
      <div className="lg:p-16 p-8">
        <p className="lg:text-2xl text-[16px] text-center m-plus-rounded-1c-regular text-[#060606] w-full flex items-center justify-center gap-2 mb-12">
          Enjoy Our Free Plan - No Cost, Full Value!
        </p>
        {freePricing?.length
          ? freePricing?.map((v, i) => (
              <PricingCard
                key={i}
                hidePricing={true}
                freePricing={true}
                headingCls={`flex-col-reverse items-start`}
                pricingFetSls={`lg:w-[33%] w-full`}
                footerCls={`bg-none lg:w-[33%] w-full flex flex-col items-center justify-center gap-4`}
                crdExtraCls={`flex lg:flex-row flex-col item-center justify-between`}
                cardValue={v}
                // link={`/payment-details`}
                onClick={() => dispatch(SessionModesValue(true))}
              />
            ))
          : null}
      </div>
      <hr className="border-[#06060633] w-full" />
      <div className="w-full">
        <MeetPerfectPersona />
      </div>
    </div>
  );
};

export default Free;
