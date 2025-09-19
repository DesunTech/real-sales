import React from "react";

const personas = [
  {
    title: "Plant Manager",
    description:
      "Simulate real industry challenges—selling automation, consumables, or equipment.",
    image:
      "/images/plant_manager.png",
  },
  {
    title: "Engineers",
    description:
      "Overcome industry-specific objections and improve negotiation skills.",
    image:
       "/images/engineer.png",
  },
  {
    title: "Maintenance Leader",
    description: "Shift from transactional selling to solution-based selling.",
    image:
      "/images/maintainanace.png",
  },
];

const FoodEquipments = () => {
  return (
    <div className="page-container mx-auto px-4 py-8 container flex flex-col gap-16 w-full h-full">
      {/* Heading */}
      <div className="w-full flex flex-col items-center justify-center text-center sm:py-4 py-8">
        <h1 className="sora-bold text-3xl sm:text-4xl max-w-4xl">
          Industry-Specific AI Personas built on Real Customers
        </h1>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {personas.map((persona, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={persona.image}
              alt={persona.title}
              className="w-full h-74 object-cover"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900">
                {persona.title}
              </h3>
              <p className="mt-2 text-gray-600">{persona.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodEquipments;
