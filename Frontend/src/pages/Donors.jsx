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
        const res = await publicRequest.get("/donors");
       
        const dataWithId = res.data.map((d, index) => ({
          ...d,
          _id: d._id || d.id || index + 1,
        }));
        setDonors(dataWithId);
      } catch (error) {
        console.log( error);
      }
    };
    getAllDonors();
  }, []);

  
  const handleDelete = async (id) => {
    try {
      await publicRequest.delete(`/donors/${id}`);
      setDonors((prev) => prev.filter((donor) => donor._id !== id));
    } catch (error) {
      console.log( error);
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
          <button className="bg-gray-400 text-white px-3 py-1 rounded">
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
          className="text-red-500 cursor-pointer m-2"
          onClick={() => handleDelete(params.row._id)}
        />
      ),
    },
  ];


  return (
    <div className="w-[70vw]">
      <div className="flex items-center justify-between m-[30px]">
        <h1 className="m-[20px] text-[20px] font-semibold">All Donors</h1>

        <Link to="/admin/newdonor">
          <button className="bg-[#1e1e1e] text-white p-[10px] rounded cursor-pointer">
            New Donor
          </button>
        </Link>
      </div>

      <div className="mx-[30px] bg-white p-4 shadow-md rounded-lg">
        <DataGrid
          rows={donors || []}
          columns={columns}
          checkboxSelection
          getRowId={(row) => row._id || row.id || Math.random()}
          pageSize={5}
          autoHeight
        />
      </div>
    </div>
  );
};

export default Donors;
