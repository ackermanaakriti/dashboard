
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
  const { data,fetchData } = useGetData(`AccountGroup/GetAll?isDeleted=${false}`)
  const [tableData,setTableData]= useState([])
  const [filterText, setFilterText] = React.useState('');
  useEffect(()=>
  {
     setTableData(data?.data)
  },[tableData,data])

  const handleDelete = async (id) => {
    await Deldata(id);
    fetchData()
  };
  const handleEdit = (id) => {
    console.log(id)
    setId(id);
    dispatch(addMenu({ id: id, menu: "accgroupform" }));
  };
  const filteredItems = tableData?.filter(
    item =>  item?.name.toLowerCase().includes(filterText.toLowerCase()),
);

// const filteredItems =[]
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
      // grow: 2,
      // width:'30%'
     
    },
    {
      name: ' Code',
      selector: row => row.code,
      // width:'30%'
      
    },
    {
      name: 'isActive',
      hide: 'md',
      // width:'20%',
      selector: row => row.isActive,
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
      // width:'20%',
      cell: row => (
        <div className="flex gap-[24px]">

          <button onClick={() => handleEdit(row.id)}> <span className="text-[20px] text-PrimaryColor  mx-[3px]"><MdEdit /></span></button>
          <button onClick={() => handleDelete(row.id)}><span className="text-[20px] text-redclr  mx-[3px]"><RiDeleteBin6Line /></span></button>
          {/* <button onClick={() => handleView(row)}> <span className="text-[20px]   mx-[3px]"><IoEyeOutline/></span></button> */}
        </div>
      ),
      allowOverflow: true,
      button: true,
     
    

    }
  ];

  return (
    <div className="px-[50px]">
      <div>
        <h2 className="font-inter font-semibold text-[30px]">Account Group Table</h2>
      </div>
      <TableDataComp 
       columns={columns}
        filteredItems={filteredItems} 
        filterText={filterText}
         setFilterText={setFilterText}
         menuname='accgroupform' />
    </div>
  );
};

export default AccountGrpTable;









