import { FaTrash } from "react-icons/fa";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { publicRequest } from "../requestMethod";

const Donors = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    const getAllDonors = async () => {
      try {
        const res = await publicRequest.get("/donor");
        const dataWithId = res.data.map((d, index) => ({
          ...d,
          _id: d._id || d.id || index + 1,
        }));
        setDonors(dataWithId);
      } catch (error) {
        console.log(error);
      }
    };
    getAllDonors();
  }, []);

  const handleDelete = async (id) => {
    try {
      await publicRequest.delete(`/donor/find/${id}`);
      setDonors((prev) => prev.filter((donor) => donor._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "address", headerName: "Address", width: 180 },
    { field: "bloodgroup", headerName: "Blood Type", width: 130 },
    { field: "diseases", headerName: "Diseases", width: 150 },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <Link to={`/admin/donor/${params.row._id}`}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition duration-300 shadow-md transform hover:scale-105">
            Edit
          </button>
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <FaTrash
          className="text-red-500 hover:text-red-700 cursor-pointer transition duration-300 transform hover:scale-110"
          onClick={() => handleDelete(params.row._id)}
        />
      ),
    },
  ];

  return (
    <div className="flex justify-center bg-gradient-to-b from-red-50 to-white min-h-screen p-10">
      <div className="w-[70vw] bg-white rounded-3xl shadow-2xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold ">All Donors</h1>
          <Link to="/admin/newdonor">
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-2xl shadow-md transition-all duration-300 transform hover:scale-105">
              New Donor
            </button>
          </Link>
        </div>

        <div className="bg-white p-4 shadow-lg rounded-xl">
          <DataGrid
            rows={donors || []}
            columns={columns}
            checkboxSelection
            getRowId={(row) => row._id || row.id || Math.random()}
            pageSize={5}
            autoHeight
            sx={{
              border: "none",
              "& .MuiDataGrid-cell": { borderBottom: "1px solid #f0f0f0" },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#fee2e2",
                color: "#b91c1c",
                fontWeight: "bold",
                fontSize: 16,
              },
              "& .MuiDataGrid-row:hover": { backgroundColor: "#ffe4e6" },
              "& .MuiCheckbox-root": { color: "#b91c1c" },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "white",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Donors;
