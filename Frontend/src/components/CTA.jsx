import React from "react";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="bg-gray-100 py-20 mt-10">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800">Ready to Save a Life?</h2>

        <p className="text-gray-600 mt-4 text-lg">
          Join thousands of donors making a difference.
        </p>

        <Link to="/contact">
          <button className="mt-6 px-10 py-3 bg-red-600 hover:bg-red-700 transition text-white font-semibold rounded-md shadow-md">
            Become a Donor
          </button>
        </Link>
      </div>
    </section>
  );
}

export default CTA;
