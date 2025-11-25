import React from "react";

function FeaturesSection() {
  const features = [
    { title: "Fast Response", desc: "We connect donors and receivers quickly during emergencies." },
    { title: "Nearby Donors", desc: "Find donors close to your location for faster support." },
    { title: "Verified Data", desc: "All donor information is verified & securely stored." },
  ];

  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">Why Choose Us?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((item, i) => (
            <div
              key={i}
              className="bg-white shadow-lg p-8 rounded-xl hover:shadow-2xl hover:scale-105 transition transform"
            >
              <h3 className="text-xl font-bold text-red-600 mb-3">{item.title}</h3>
              <p className="text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
