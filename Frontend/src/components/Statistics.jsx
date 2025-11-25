import React from "react";

function Statistics() {
  const stats = [
    { value: "5000+", label: "Registered Donors" },
    { value: "1200+", label: "Lives Saved" },
    { value: "35+", label: "Partner Hospitals" },
    { value: "90%", label: "Response Rate" },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-center">
        {stats.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <h1 className="text-4xl font-bold text-red-600">{item.value}</h1>
            <p className="text-gray-600 mt-2">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Statistics;
