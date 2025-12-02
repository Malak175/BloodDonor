import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethod";

const Donor = () => {
  const [donor, setDonor] = useState({});
  const location = useLocation();
  const donorId = location.pathname.split("/")[3];
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const getDonor = async () => {
      try {
        const res = await publicRequest.get(`/donor/find/${donorId}`);
        setDonor(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getDonor();
  }, [donorId]);

  const handleUpdate = async () => {
    try {
      await publicRequest.put(`/donor/find/${donorId}`, inputs);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-white p-6 gap-6">
      
      {/* Left Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-2xl font-bold text-red-700 text-center mb-6">Donor Information</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            name="name"
            value={inputs.name || ""}
            onChange={handleChange}
            placeholder={donor.name || "Name"}
            className="p-3 border-b-2 border-gray-300 focus:border-red-500 outline-none rounded"
          />
          <input
            type="text"
            name="address"
            value={inputs.address || ""}
            onChange={handleChange}
            placeholder={donor.address || "Address"}
            className="p-3 border-b-2 border-gray-300 focus:border-red-500 outline-none rounded"
          />
          <input
            type="text"
            name="tel"
            value={inputs.tel || ""}
            onChange={handleChange}
            placeholder={donor.tel || "Telephone"}
            className="p-3 border-b-2 border-gray-300 focus:border-red-500 outline-none rounded"
          />
          <select
            name="bloodgroup"
            value={inputs.bloodgroup || ""}
            onChange={handleChange}
            className="p-3 border-b-2 border-gray-300 focus:border-red-500 outline-none rounded"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          <input
            type="email"
            name="email"
            value={inputs.email || ""}
            onChange={handleChange}
            placeholder={donor.email || "Email"}
            className="p-3 border-b-2 border-gray-300 focus:border-red-500 outline-none rounded"
          />
        </div>
      </div>

      {/* Right Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-2xl font-bold text-red-700 text-center mb-6">Medical Info</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="number"
            name="weight"
            value={inputs.weight || ""}
            onChange={handleChange}
            placeholder={donor.weight ? `${donor.weight} kg` : "Weight"}
            className="p-3 border-b-2 border-gray-300 focus:border-red-500 outline-none rounded"
          />
          <input
            type="date"
            name="date"
            value={inputs.date || ""}
            onChange={handleChange}
            placeholder={donor.date || "Date"}
            className="p-3 border-b-2 border-gray-300 focus:border-red-500 outline-none rounded"
          />
          <textarea
            name="diseases"
            value={inputs.diseases || ""}
            onChange={handleChange}
            placeholder={donor.diseases || "Do you have any diseases?"}
            className="p-3 border-b-2 border-gray-300 focus:border-red-500 outline-none rounded resize-none h-24"
          />

          <button
            onClick={handleUpdate}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-lg transition-colors duration-300"
          >
            Update Donor
          </button>
        </div>
      </div>

    </div>
  );
};

export default Donor;
