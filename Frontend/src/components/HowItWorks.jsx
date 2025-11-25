import React from "react";

function HowItWorks() {
  const steps = [
    { step: "1", title: "Register", desc: "Sign up as a donor with your basic details." },
    { step: "2", title: "Get Contacted", desc: "We contact you when a match needs your help." },
    { step: "3", title: "Save a Life", desc: "Donate blood and make a real impact." },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">How It Works</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((item, i) => (
            <div
              key={i}
              className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition transform"
            >
              <div className="text-red-600 text-4xl font-bold mb-4">{item.step}</div>
              <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
              <p className="text-gray-500 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
