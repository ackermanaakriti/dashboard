import React, { useEffect, useState,useCallback } from "react";
import useDelData from "../../Apis/useDelData";
import { useLayouData } from "../../Context/MainLayoutContext";
import { useDispatch } from "react-redux";
import { addMenu } from "../../Redux/TopTabSlice";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TableDataComp } from "../../Global/Table/TableData";
import useGetData from "../../Apis/useGetData";
import { baseUrl } from "../../Apis/Baseurl";
import axios from "axios";

const EmployeeTable = () => {
  const { setId ,token} = useLayouData();
  const dispatch = useDispatch();
  const { Deldata } = useDelData("Employee/Delete/");
  const {data,fetchData } = useGetData(`Employee/GetAll?isDeleted=${false}`,token)
  const [tableData,setTableData]= useState([])
  const [filterText, setFilterText] = React.useState('');
  




  const handleDelete = async (id) => {
    await Deldata(id);
    fetchData()
  };
  const handleEdit = (id) => {
    console.log(id)
    setId(id);
    dispatch(addMenu({ id: id, menu: "employeeform" }));
  };
  const filteredItems = data?.data?.filter(
    item =>  item?.firstName.toLowerCase().includes(filterText.toLowerCase()),
);
// const filteredItems = []


  const columns = [
    {
      name: ' First Name',
      selector: row => row.firstName,
      sortable: true,
      // grow: 2,
      width: '15%',

    },
    {
      name: ' Last Name',
      selector: row => row.lastName,
      width: '15%',
    },
    {
      name: 'Position',
      hide: 'md',
      selector: row => row.positon,
      width: '15%',
      conditionalCellStyles: [
        {
          when: row => row.positon === 'string',
          style: {
            backgroundColor: 'rgba(63, 195, 128, 0.9)',
            color: 'white',
            '&:hover': {
              cursor: 'pointer',
            },
          },
        },
      ]
    },
    {
      name: 'Contact No',
      selector: row => row.contactNumber,
      hide: 'md',
      width: '15%',
    },
    {
      name: 'Email',
      selector: row => row.email,
      // hide: 'md',
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="flex gap-[24px]">

          <button onClick={() => handleEdit(row.id)}> <span className="text-[20px] text-PrimaryColor  mx-[3px]"><MdEdit /></span></button>
          <button onClick={() => handleDelete(row.id)}><span className="text-[20px] text-redclr  mx-[3px]"><RiDeleteBin6Line /></span></button>
          {/* <button onClick={() => handleView(row)}> <span className="text-[20px]   mx-[3px]"><IoEyeOutline/></span></button> */}
        </div>
      ),
      allowOverflow: true,
      button: true,
      width: '10%',

    }
  ];

  return (
    <div className="px-[50px]">
      <div>
        <h2 className="font-inter font-semibold text-[30px]">Employee Table</h2>
      </div>
      <TableDataComp
       columns={columns} 
        filteredItems={filteredItems}
         filterText={filterText}
          setFilterText={setFilterText}
          menuname='employeeform' />
    </div>
  );
};

export default EmployeeTable;






