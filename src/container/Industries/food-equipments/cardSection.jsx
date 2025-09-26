"use client"; // Only if you're using this inside /app (Next.js 13+)

import React from "react";
import Image from "next/image";

const items = [
  {
    title: "New Sales Director Lacks Team Visibility",
    image: "/images/cd-img.png",
    description:
      "RealSales provides objective skill assessment in 1.5 months vs 6+ months of manual observation. Delivers 4.5 months faster team optimization with data-driven coaching plans.",
  },
 {
  title: "Sales Team Missing Cross-Selling Opportunities",
  image: "/images/cd-img.png",
  description:
    "RealSales trains reps to identify 3× more opportunities per customer interaction. Increases annual revenue per rep from $1.08M to $3.24M (3× revenue growth).",
}
,

  {
    title: "Marketing Needs Value Proposition Validation",
    image: "/images/cd-img.png",
    description:
      "RealSales tests new messaging in 6 weeks vs 8 months traditional approach. Saves $44,275 vs $86,000 traditional cost and delivers 5.5 months faster market launch.",
  },
  {
    title: "Remote Team Lacks Consistent Coaching",
    image: "/images/cd-img.png",
    description:
      "RealSales provides standardized coaching across distributed locations with organizational visibility at every level. Delivers time and cost savings through reduced travel and coordination overhead.",
  },
  {
    title: "New Hire Struggles with Complex Portfolio",
    image: "/images/cd-img.png",
    description:
      "RealSales accelerates onboarding from 6-8 months to 2-3 months productivity. Increases new hire Year 1 revenue from $380K to $1.805M (4.7× revenue growth).",
  },
  {
    title: "High Pipeline Volume with Poor Conversion",
    image: "/images/cd-img.png",
    description:
      "RealSales diagnoses qualification vs closing gaps to enable targeted coaching. Improves conversion rates from 18% to 26% and generates 8× better pipeline conversion.",
  },
];

const CardGrid = () => {
  return (
    <div className="container mx-auto px-4 py-8">
  <div className="w-full flex flex-col items-center justify-center text-center sm:py-4 py-8">
    <h1 className="sora-bold text-3xl sm:text-4xl max-w-4xl">
    CASE STUDIES IN THE FOOD AND BEVERAGE INDUSTRY

    </h1>
    <p className="mt-2 text-gray-600 mb-20">
    Explore how RealSales can help OEMs and product companies in improving sales results, accelerating go to market strategies and develop high performing teams. Navigate our case studies below.​
    </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 md:gap-5 gap-5">
    {items.map((item, index) => (
      <div
        key={index}
        className="relative rounded-lg overflow-hidden group shadow-md h-[450px]"
      >
        <div className="relative w-full h-full bg-gray-100">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            priority
          />

          {/* Simple black text overlay at the top */}
          <div className="absolute top-6 left-0 right-0 z-20 text-center md:px-17 px-10">
            <h3 className="text-black font-bold text-lg md:text-xl leading-tight">
              {item.title}
            </h3>
          </div>

          {/* Yellow overlay on hover */}
          <div className="absolute inset-0 bg-transparent group-hover:bg-[#FFDE5A] transition-all duration-300 z-10"></div>







          {/* Description appears on hover */}
          <div className="absolute inset-0 flex flex-col justify-center items-center px-6 py-8 text-black opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 text-center">
            <div className="space-y-4">
              <p className="text-[16px] leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default CardGrid;
