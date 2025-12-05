import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function Admin() {
  const { currentUser } = useSelector((state) => state.user);

  const [latestDonors, setLatestDonors] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLatestDonors = async () => {
      if (!currentUser?.accessToken) return;
      try {
        setLoading(true);
        const res = await axios.get("/api/prospect", {
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
        });

        const lastFive = Array.isArray(res.data)
          ? res.data.slice(-5).reverse()
          : [];

        setLatestDonors(lastFive);

        setPendingCount(lastFive.filter((d) => d.status === "pending").length);
        setApprovedCount(lastFive.filter((d) => d.status === "approve").length);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestDonors();
  }, [currentUser]);

  return (
    <div className="flex-1 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto p-3 sm:p-4 md:p-8">

        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
            Dashboard
          </h1>

          <div className="text-right">
            <p className="font-semibold text-black text-sm sm:text-base">
              Admin
            </p>
            <p className="text-xs sm:text-sm text-gray-600">Administrator</p>
          </div>
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">

       
          <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-200 flex flex-col items-center">
            <h2 className="font-semibold text-black text-sm sm:text-base mb-3">
              Requested
            </h2>

            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-[6px] sm:border-[8px] border-red-500 flex items-center justify-center">
              <span className="text-lg sm:text-xl font-bold text-black">
                {loading ? "…" : pendingCount}
              </span>
            </div>

            <p className="text-center text-gray-600 text-xs sm:text-sm mt-3">
              Total Pending
            </p>
          </div>

       
          <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-200 flex flex-col items-center">
            <h2 className="font-semibold text-black text-sm sm:text-base mb-3">
              Received
            </h2>

            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-[6px] sm:border-[8px] border-red-400 flex items-center justify-center">
              <span className="text-lg sm:text-xl font-bold text-black">
                {loading ? "…" : approvedCount}
              </span>
            </div>

            <p className="text-center text-gray-600 text-xs sm:text-sm mt-3">
              Total Approved
            </p>
          </div>

         
          <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-200">
            <h2 className="font-semibold text-black text-sm sm:text-base mb-4">
              Unit Status
            </h2>

            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((t) => (
                <div
                  key={t}
                  className="bg-red-100 text-red-600 font-semibold text-center py-1 sm:py-2 rounded-lg text-xs sm:text-sm"
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>

      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

       
          <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-200">
            <h2 className="font-semibold text-black text-base mb-3">
              Recent Donors
            </h2>

            <div className="space-y-3">
              {loading && <p className="text-gray-500">Loading...</p>}

              {!loading && latestDonors.length === 0 && (
                <p className="text-gray-500 text-sm">No recent donors.</p>
              )}

              {latestDonors.map((donor) => (
                <div
                  key={donor._id}
                  className="bg-gray-50 p-3 rounded-xl flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm">
                      {donor.name?.charAt(0) || "U"}
                    </div>

                    <div>
                      <p className="font-semibold text-black text-sm">
                        {donor.name}
                      </p>
                      <p className="text-xs text-gray-600">{donor.type || "—"}</p>
                    </div>
                  </div>

                  <span className="bg-red-500 text-white px-2 py-1 rounded-lg font-semibold text-xs">
                    New
                  </span>
                </div>
              ))}
            </div>
          </div>

        
          <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-200">
            <h2 className="font-semibold text-black text-base mb-3">
              Track Nearby Donors
            </h2>

            <div className="bg-gray-300 w-full rounded-xl flex items-center justify-center text-gray-700 h-40 sm:h-52 md:h-64">
              Map coming soon
            </div>

            <div className="mt-5">
              <label className="font-semibold text-black text-sm block mb-2">
                Set Distance (km)
              </label>

              <input
                type="range"
                min="1"
                max="50"
                className="w-full"
              />

              <button className="mt-4 w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition">
                Send Request
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Admin;
