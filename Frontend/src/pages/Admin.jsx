import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Menu from "../components/Menu"; // لو عندك

function Admin() {
  const { currentUser } = useSelector((state) => state.user);

  const [latestDonors, setLatestDonors] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);

  // جلب آخر 5 متبرعين
  useEffect(() => {
    const fetchLatestDonors = async () => {
      try {
        const res = await axios.get("/api/prospect", {
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
        });

        // آخر 5
        const lastFive = res.data.slice(-5).reverse();
        setLatestDonors(lastFive);

        // حساب الكروت
        const pending = lastFive.filter(d => d.status === 'pending').length;
        const approved = lastFive.filter(d => d.status === 'approve').length;

        setPendingCount(pending);
        setApprovedCount(approved);

      } catch (err) {
        console.log(err);
      }
    };

    fetchLatestDonors();
  }, [currentUser]);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      
      {/* المحتوى الرئيسي */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-black">Dashboard</h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 cursor-pointer">
              <div>
                <p className="font-semibold text-black">Admin</p>
                <p className="text-sm text-gray-600">Administrator</p>
              </div>
            </div>
          </div>
        </div>

        {/* GRID SECTION */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          {/* CARD 1 - Requested */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
            <h2 className="font-semibold text-black mb-4">Requested</h2>
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full border-[8px] border-red-500 flex items-center justify-center">
                <span className="text-xl font-bold text-black">{pendingCount}</span>
              </div>
            </div>
            <p className="text-center text-gray-600 mt-4">Total Pending</p>
          </div>

          {/* CARD 2 - Received */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
            <h2 className="font-semibold text-black mb-4">Received</h2>
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full border-[8px] border-red-400 flex items-center justify-center">
                <span className="text-xl font-bold text-black">{approvedCount}</span>
              </div>
            </div>
            <p className="text-center text-gray-600 mt-4">Total Approved</p>
          </div>

          {/* CARD 3 - Unit Status */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
            <h2 className="font-semibold text-black mb-4">Unit Status</h2>
            <div className="grid grid-cols-4 gap-3">
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((t) => (
                <div
                  key={t}
                  className="bg-red-100 text-red-600 font-semibold text-center py-2 rounded-lg"
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Donors + Map */}
        <div className="grid grid-cols-2 gap-8">
          {/* RECENT DONORS */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
            <h2 className="font-semibold text-black mb-4">Recent Donors</h2>

            <div className="space-y-4">
              {latestDonors.map((donor) => (
                <div
                  key={donor._id}
                  className="bg-gray-50 p-4 rounded-xl flex items-center justify-between shadow-sm"
                >
                  <div>
                    <p className="font-semibold text-black">{donor.name}</p>
                    <p className="text-sm text-gray-600">{donor.type}</p>
                  </div>

                  <span className="bg-red-500 text-white px-3 py-1 rounded-lg font-semibold text-sm">
                    New
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* MAP SECTION */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
            <h2 className="font-semibold text-black mb-4">Track Nearby Donors</h2>

            {/* Map placeholder */}
            <div className="bg-gray-300 w-full h-[300px] rounded-xl flex items-center justify-center text-gray-700">
              Map coming soon
            </div>

            <div className="mt-6">
              <label className="font-semibold text-black">Set Distance</label>
              <input type="range" min="1" max="50" className="w-full mt-2" />
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
