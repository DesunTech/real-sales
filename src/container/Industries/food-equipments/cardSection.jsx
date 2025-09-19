"use client"; // Only if you're using this inside /app (Next.js 13+)

import React from "react";
import Image from "next/image";

const items = [
  {
    title: "New Sales Director Lacks Team Visibility",
    image: "https://images.pexels.com/photos/3912948/pexels-photo-3912948.jpeg",
    description:
      "RealSales provides objective skill assessment in 1.5 months vs 6+ months of manual observation. Delivers 4.5 months faster team optimization with data-driven coaching plans.",
  },
 {
  title: "Sales Team Missing Cross-Selling Opportunities",
  image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg", // Different image URL
  description:
    "RealSales trains reps to identify 3× more opportunities per customer interaction. Increases annual revenue per rep from $1.08M to $3.24M (3× revenue growth).",
}
,

  {
    title: "Marketing Needs Value Proposition Validation",
    image: "https://images.pexels.com/photos/1679645/pexels-photo-1679645.jpeg",
    description:
      "RealSales tests new messaging in 6 weeks vs 8 months traditional approach. Saves $44,275 vs $86,000 traditional cost and delivers 5.5 months faster market launch.",
  },
  {
    title: "Remote Team Lacks Consistent Coaching",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
    description:
      "RealSales provides standardized coaching across distributed locations with organizational visibility at every level. Delivers time and cost savings through reduced travel and coordination overhead.",
  },
  {
    title: "New Hire Struggles with Complex Portfolio",
    image:
      "https://images.pexels.com/photos/10996739/pexels-photo-10996739.jpeg",
    description:
      "RealSales accelerates onboarding from 6-8 months to 2-3 months productivity. Increases new hire Year 1 revenue from $380K to $1.805M (4.7× revenue growth).",
  },
  {
    title: "High Pipeline Volume with Poor Conversion",
    image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg",
    description:
      "RealSales diagnoses qualification vs closing gaps to enable targeted coaching. Improves conversion rates from 18% to 26% and generates 8× better pipeline conversion.",
  },
];

const CardGrid = () => {
  return (
    <div className="container mx-auto px-4 py-8">
  <div className="w-full flex flex-col items-center justify-center text-center sm:py-4 py-8">
    <h1 className="sora-bold text-3xl sm:text-4xl max-w-4xl">
      You hadn’t thought of that!
    </h1>
    <p className="mt-2 text-gray-600 mb-20">
      Here are some examples of how Elementtag can solve problems, radically
      transforming entire sectors.
    </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
    {items.map((item, index) => (
      <div
        key={index}
        className="relative rounded-lg overflow-hidden group shadow-md h-[400px]"
      >
        <div className="relative w-full h-full">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />

          {/* Gray gradient shadow bar behind title, always visible */}
          <div
            className="absolute top-0 left-0 right-0 h-34 z-5"
            style={{
              background:
                "linear-gradient(180deg, rgba(124, 123, 121, 0.85) 0%, rgba(180, 179, 175, 0.6) 40%, rgba(220, 219, 216, 0.4) 70%, transparent 100%)",
            }}
          ></div>

          {/* Yellow overlay on hover only, covers gradient */}
          <div className="absolute inset-0 bg-transparent transition duration-500 pointer-events-none group-hover:bg-[#FFDE5A] group-hover:bg-opacity-90 z-10"></div>

          {/* Title */}
          <div
            className="absolute top-4 left-1/2 transform -translate-x-1/2
             text-black font-semibold text-lg md:text-xl z-20 text-center
             max-w-[80%] md:max-w-[70%] px-2 md:px-6
             whitespace-normal break-words"
          >
            {item.title}
          </div>

          {/* Description (on hover) */}
          <div className="absolute bottom-0 left-0 right-0 px-20 py-8 text-black opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-20 text-center mb-15">
            <p className="text-[16px]">{item.description}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default CardGrid;
