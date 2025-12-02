import { FaTrash } from "react-icons/fa";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethod";

const Prospects = () => {
  const [prospects, setProspects] = useState([]);

  // Fetch all prospects on mount
  useEffect(() => {
    const getAllProspects = async () => {
      try {
        const res = await publicRequest.get("/prospect");
        setProspects(res.data);
      } catch (error) {
        console.error("Failed to fetch prospects:", error);
      }
    };
    getAllProspects();
  }, []);

  // Delete a prospect
  const handleDelete = async (id) => {
    try {
      await publicRequest.delete(`/prospect/${id}`);
      setProspects((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Failed to delete prospect:", error);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 180 },
    { field: "address", headerName: "Address", width: 150 },
    { field: "bloodgroup", headerName: "Blood Type", width: 130 },
    { field: "diseases", headerName: "Diseases", width: 150 },
    {
      field: "approve",
      headerName: "Approve",
      width: 120,
      renderCell: (params) => (
        <Link to={`/admin/prospect/${params.row._id}`}>
          <button className="text-green-600 bg-green-100 w-[80px] py-1 rounded shadow-md transition duration-300 transform hover:scale-105">
            Approve
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
          <h1 className="text-3xl font-bold ">All Prospects</h1>
        </div>

        <div className="bg-white p-4 shadow-lg rounded-xl">
          <DataGrid
            rows={prospects || []}
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
              "& .MuiDataGrid-row:hover": { backgroundColor: "#fef2f2" },
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

export default Prospects;
