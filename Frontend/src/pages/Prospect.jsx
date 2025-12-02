import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { publicRequest } from "../requestMethod";

const Prospect = () => {
  const location = useLocation();
  const prospectId = location.pathname.split("/")[3];
  const [prospect, setProspect] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getProspect = async () => {
      try {
        const res = await publicRequest.get(`/prospect/${prospectId}`);
        setProspect(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getProspect();
  }, [prospectId]);

  const approveProspect = async () => {
    try {
      await publicRequest.post("/donor", {
        name: prospect.name,
        address: prospect.address,
        email: prospect.email,
        tel: prospect.tel,
        bloodgroup: prospect.bloodgroup,
        diseases: prospect.diseases,
        weight: prospect.weight,
      });
      await publicRequest.delete(`/prospect/${prospectId}`);
      navigate("/admin/donors");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-white p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 transition-transform transform hover:scale-105 duration-300">
        <h2 className="text-2xl font-bold text-red-700 text-center mb-6">Prospect Details</h2>
        
        <ul className="space-y-3 text-gray-700">
          <li>
            <span className="font-semibold text-gray-800">Name:</span> {prospect.name || "-"}
          </li>
          <li>
            <span className="font-semibold text-gray-800">Address:</span> {prospect.address || "-"}
          </li>
          <li>
            <span className="font-semibold text-gray-800">Tel:</span> {prospect.tel || "-"}
          </li>
          <li>
            <span className="font-semibold text-gray-800">Blood Type:</span> {prospect.bloodgroup || "-"}
          </li>
          <li>
            <span className="font-semibold text-gray-800">Disease:</span> {prospect.diseases || "None"}
          </li>
          <li>
            <span className="font-semibold text-gray-800">Weight:</span> {prospect.weight ? `${prospect.weight} Kg` : "-"}
          </li>
          <li>
            <span className="font-semibold text-gray-800">Status:</span> <span className="text-yellow-500 font-semibold">Pending</span>
          </li>
        </ul>

        <p className="mt-6 text-center text-gray-600">
          Do you want to approve this prospect to a donor?
        </p>

        <button
          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-lg transition-colors duration-300"
          onClick={approveProspect}
        >
          Approve Prospect
        </button>
      </div>
    </div>
  );
};

export default Prospect;
