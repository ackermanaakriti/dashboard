
import React, { useEffect, useState } from "react";
import useDelData from "../../../Apis/useDelData";
import { useLayouData } from "../../../Context/MainLayoutContext";
import { useDispatch } from "react-redux";
import { addMenu } from "../../../Redux/TopTabSlice";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TableDataComp } from "../../../Global/Table/TableData";
import { TableButton } from "../../../Components/GreenButton";
import useGetData from "../../../Apis/useGetData";

const CompanyTable = () => {
  const { setId } = useLayouData(); // setId to get the id for form editing --not using react-router So setting id manually
  const dispatch = useDispatch();
  const {Deldata}= useDelData('Company/Delete/')   //use custom delete hook
  const { data,fetchData } = useGetData(`Company/GetAll?IsDeleted=${false}`)   //use custom hook to get all data...passing url
  const [tableData,setTableData]= useState([])          
  const [filterText, setFilterText] = React.useState('');

  
  useEffect(()=>
  {
     setTableData(data?.data)  //set fetched data to tableData for filtering 
  },[tableData,data])

  const handleDelete = async (id) => {
    await Deldata(id);
    fetchData()
    
  };

  const handleEdit = (id) => {
    console.log(id)
    setId(id);
    dispatch(addMenu({ id: id, menu: "companyform" }));   // dispatched menu for component navigation..using object mapping for navigation so passing menu as key
  };

  const filteredItems = tableData?.filter(
    item =>  item?.name.toLowerCase().includes(filterText.toLowerCase()),  //filter fetched data on the basis of name
);

// set columns acc to the menu
  const columns = [
    {
      name: 'Company Name',
      selector: row => row.name,
      sortable: true,
      // grow: 2,
      // width:'30%'
     
    },
    {
      name: ' Code',
      selector: row => row.code,
      // width:'20%'
      
    },
    {
      name: ' Reg No',
      selector: row => row.regestrationNo,
      // width:'20%'
      
    },
  
   
    {
      name: 'Head Office',
      hide: 'md',
      // width:'15%',
      selector: row => row.isHeadOffice,
      cell: row => (
        <>
            {row.isEditable ? (
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
      // width: '20%',
    

    }
  ];

  return (
    <div className="px-[50px] flex flex-col  items-center">
      <div>
        <h2 className="font-inter font-semibold text-[30px]">Company Table</h2>
      </div>
      <TableDataComp 
       columns={columns}
        filteredItems={filteredItems}
         filterText={filterText}
          setFilterText={setFilterText}
          menuname='companyform'
          width='100%' />
    </div>
  );
};

export default CompanyTable;
