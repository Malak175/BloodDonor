import { FaTrash } from "react-icons/fa";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethod"; 

const Prospects = () => {
  const [prospects, setProspects] = useState([]);

  useEffect(() => {
    const getAllProspects = async () => {
      try {
        const res = await publicRequest.get("/prospect"); 
        console.log( res.data);
        setProspects(res.data);
        console.log( res.data);
      } catch (error) {
        console.log( error);
      }
    };
    getAllProspects();
  }, []);

  const handleDelete = async (id) => {
    try {
      await publicRequest.delete(`/prospect/${id}`);
      
      setProspects((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
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
          <button className="bg-gray-400 text-white cursor-pointer w-[70px]">
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
          className="text-red-500 cursor-pointer m-2"
          onClick={() => handleDelete(params.row._id)}
        />
      ),
    },
  ];

  return (
    <div className="w-[70vw]">
      <div className="flex items-center justify-between m-[30px]">
        <h1 className="m-[20px] text-[20px]">All Prospects</h1>
      </div>
      <div className="mx-[30px]">
        <DataGrid
          columns={columns}
          checkboxSelection
          getRowId={(row) => row._id} 
          rows={prospects}
          autoHeight
        />
      </div>
    </div>
  );
};

export default Prospects;
