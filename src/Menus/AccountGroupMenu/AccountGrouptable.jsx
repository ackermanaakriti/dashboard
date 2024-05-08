
import React, { useEffect, useState } from "react";
import useDelData from "../../Apis/useDelData";
import { useLayouData } from "../../Context/MainLayoutContext";
import { useDispatch } from "react-redux";
import { addMenu } from "../../Redux/TopTabSlice";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TableDataComp } from "../../Global/Table/TableData";
import { TableButton } from "../../Components/GreenButton";
import useGetData from "../../Apis/useGetData";

const AccountGrpTable = () => {
  const { setId } = useLayouData();
  const dispatch = useDispatch();
  const {Deldata}= useDelData('AccountGroup/Delete/')
  const { data } = useGetData('AccountGroup/GetAll')


  const handleDelete = async (id) => {
    await Deldata(id);
  };
  const handleEdit = (id) => {
    console.log(id)
    setId(id);
    dispatch(addMenu({ id: id, menu: "Accgrp" }));
  };

  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
      // grow: 2,
      width: 'fit-content',

    },
    {
      name: ' Code',
      selector: row => row.code,
      width: 'fit-content',
    },
    {
      name: 'isActive',
      hide: 'md',
      selector: row => row.isActive,
      width: 'fit-content',
      cell: row => (
        <>
            {row.isActive ? (
               <TableButton className='bg-PrimaryColor rounded-[20px] px-[12px] py-[5px] text-white' text='Yes'/>
            ) :  <TableButton
            className="bg-[#378f80] rounded-[20px] px-[12px] py-[5px] text-white"
            text="No"
          />}
        </>
    ),
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
      width: 'fit-content',
    

    }
  ];

  return (
    <div className="px-[50px]">
      <div>
        <h2 className="font-inter font-semibold text-[30px]">Employee Table</h2>
      </div>
      <TableDataComp width='50%' columns={columns} data={data} />
    </div>
  );
};

export default AccountGrpTable;









