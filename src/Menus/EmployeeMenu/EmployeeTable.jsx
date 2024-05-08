import React,{useEffect, useState} from "react";
import useGetData from "../../Apis/useGetData";
import { GreenButton, TableButton } from "../../Components/GreenButton";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import useDelData from "../../Apis/useDelData";
import { useLayouData } from "../../Context/MainLayoutContext";
import { useDispatch } from "react-redux";
import { addMenu } from "../../Redux/TopTabSlice";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import { baseUrl } from "../../Apis/Baseurl";
import axios from "axios";
import { Filtering } from "../Table/Data";

const EmployeeTable = () => {
  const { setId,token } = useLayouData();
  const dispatch = useDispatch();
 

  // const { data } = useGetData("Employee/GetAll");
  // console.log(data)
  const { Deldata } = useDelData("Employee/Delete/");
  const [rowData,setRowData]= useState([])
  
  console.log(rowData)

  useEffect(()=>
  {
    const fetchData = async ()=>
      {
         try {
             const response =  await axios.get(`${baseUrl}Employee/GetAll`,
               {headers : { Authorization:`Bearer ${token}` }
              
             })
             setRowData(response.data?.data)
            }
          catch (err)
          {
           console.log(err)
           }
         };
         fetchData();
 
  },[token])
  const handleDel = async (id) => {
    await Deldata(id);
  };
  const handleEdit = (id) => {
    setId(id);
    dispatch(addMenu({ id: id, menu: "employee" }));
  };

  return (
    <div className="px-[50px]">
      <div>
        <h2 className="font-inter font-semibold text-[30px]">Employee Table</h2>
      </div>
      <div>
        <div
          className=""
          //   onClick={() => dispatch(addMenu({ id: "", menu: "fiscalform" }))}
        >
          {/* <GreenButton
            className="bg-PrimaryColor px-[15px] py-[4px] text-white font-inter"
            text="Add New +"
          /> */}
        </div>
        <div className="overflow-y-auto">
     
          {/* <table className="shadow-lg">
            <thead>
              <tr>
                <th> First Name</th>
                <th> Last Name</th>
                <th> Positon</th>
                <th> Email</th>
                <th> Contact Number</th>
                <th> Department Id</th>
                <th> Department Name</th>
                <th> Active</th>
                <th> Action</th>
              </tr>
            </thead>
            <tbody>
              {rowData?.data?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.firstName}</td>
                  <td>{item?.lastName}</td>
                  <td>{item?.positon}</td>
                  <td>{item?.email}</td>
                  <td>{item?.contactNumber}</td>
                  <td>{item?.departmentId}</td>
                  <td>{item?.departmentName}</td>
                  <td>
                    {item?.isActive ? (
                      <TableButton
                        className="bg-PrimaryColor rounded-[20px] px-[12px] py-[5px] text-white"
                        text="Yes"
                      />
                    ) : (
                      <TableButton
                        className="bg-[#378f80] rounded-[20px] px-[12px] py-[5px] text-white"
                        text="No"
                      />
                    )}
                  </td>
                  <td className="">
                    <div className="flex gap-[25px] items-center justify-center">
                      <span
                        onClick={() => handleEdit(item?.id)}
                        className="text-PrimaryColor cursor-pointer"
                      >
                        <MdEdit />
                      </span>
                      <span
                        onClick={() => handleDel(item?.id)}
                        className="text-[#d13838] cursor-pointer"
                      >
                        <RiDeleteBin5Fill />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
      </div>
      <Filtering/>
     
    </div>
  );
};

export default EmployeeTable;






