"use client"; // Only if you're using this inside /app (Next.js 13+)

import React from "react";
import Image from "next/image";

const items = [
  {
    title: "NEW SALES DIRECTOR QUESTIONING TEAM PERFORMANCE",
    image: "/images/cd-img.png",
    description:
      "RealSales provides objective skill assessment in much shorter time (est. 1,5 months) than time consuming team shadowing (6+ months). We allow sales manager to optimize team performance faster with data-driven coaching plans.",
  },
  {
    title: "SALES TEAM MISSING CROSS-SELLING OPPORTUNITIES",
    image: "/images/cd-img.png",
    description:
      "RealSales trains reps to improve their cross-selling capabilities and to identify more opportunities per customer interaction. In one of our case simulation, the use of RealSales increased annual revenue per rep 3X.",
  },
  {
    title: "VALIDATING NEW VALUE PROPOSITION",
    image: "/images/cd-img.png",
    description:
      "RealSales helps your team testing new messaging in a fraction of the time required using more traditional approach. Based on our case analysis, it saves $44,275 vs $86,000 traditional cost and delivers 5.5 months faster market launch.",
  },
  {
    title: "REMOTE TEAM LACKING CONSISTENT COACHING",
    image: "/images/cd-img.png",
    description:
      "RealSales provides standardized coaching for remote sales team providing a new level of visibility for Team managers. Adopting RealSales delivers time and cost savings through reduced travel and coordination overhead.",
  },
  {
    title: "NEW HIRE NAVIGATING COMPLEX PORTFOLIO",
    image: "/images/cd-img.png",
    description:
      "RealSales accelerates onboarding speed cutting in half the time required to a new hire to understand and navigate company portfolio. Based on our case analysis, adoption of RealSales increased Year1 revenue for a new hire from $380k to $1.8M (4.7x revenue growth)..",
  },
  {
    title: "POOR SALES CONVERSION RATE",
    image: "/images/cd-img.png",
    description:
      "RealSales helps identifying issues and causes of poor conversion rates and focus on dedicated coaching solutions. Based on our case analysis, it improves conversion rates from 18% to 26% and generates 8× better pipeline conversion.",
  },
];

const CardGrid = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section Heading */}
      <div className="w-full flex flex-col items-center justify-center text-center sm:py-4 py-8">
        <h1 className="sora-bold text-3xl sm:text-4xl max-w-4xl">
          CASE STUDIES IN THE FOOD AND BEVERAGE INDUSTRY
        </h1>
        <p className="mt-2 text-gray-600 mb-20">
          Explore how RealSales can help OEMs and product companies in improving
          sales results, accelerating go to market strategies and develop high
          performing teams. Navigate our case studies below.​
        </p>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 md:gap-5 gap-5">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden group shadow-md h-[450px]"
          >
            <div className="relative w-full h-full bg-gray-100">
              {/* Card Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                priority
              />

              {/* Title Overlay (Always visible) */}
              <div className="absolute top-6 left-0 right-0 z-20 text-center md:px-17 px-10">
                <h3 className="text-black font-bold text-lg md:text-xl leading-tight uppercase">
                  {item.title}
                </h3>
              </div>

              {/* Yellow background: always on mobile, hover on desktop */}
              <div className="absolute inset-0 bg-[#FFDE5A] sm:bg-transparent sm:group-hover:bg-[#FFDE5A] transition-all duration-300 z-10"></div>

              {/* Description: always on mobile, hover on desktop */}
              <div className="absolute inset-0 flex flex-col justify-center items-center px-6 py-8 text-black opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 z-20 text-center">
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
