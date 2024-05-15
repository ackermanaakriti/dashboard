
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

const ChartofAccTable = () => {
  const { setId } = useLayouData();
  const dispatch = useDispatch();
  const {Deldata}= useDelData('ChartOfAccount/Delete/', `ChartOfAccount/GetAll?ShowTransactionalOnly=${false}`)
  const { data,fetchData } = useGetData(`ChartOfAccount/GetAll?ShowTransactionalOnly=${false}`)
  const [tableData,setTableData]= useState([])
  const [filterText, setFilterText] = React.useState('');

  
  useEffect(()=>
  {
     setTableData(data?.data)
  },[tableData,data])

  console.log(data?.data)
  

  const handleDelete = async (id) => {
    await Deldata(id);
    fetchData()
    // const newData = tableData.filter(item=>item.id !== id)  
    // console.log(newData)
    // setTableData(newData)
    // console.log(tableData)
  };
  const handleEdit = (id) => {
    console.log(id)
    setId(id);
    dispatch(addMenu({ id: id, menu: "chartofaccForm" }));
  };
  const filteredItems = tableData?.filter(
    item =>  item?.accountName.toLowerCase().includes(filterText.toLowerCase()),
);

// const filteredItems =[]
  const columns = [
    {
      name: 'Name',
      selector: row => row.accountName,
      sortable: true,
      // grow: 2,
      width:'25%',
     
    },
    {
      name: ' Code',
      selector: row => row.accountCode,
      width:'15%',
    },
    {
      name: 'Account Group',
      hide: 'md',
      selector: row => row.accountName,
      width:'20%',
    },
    {
      name: 'Main Parent Account',
      hide: 'md',
      selector: row => row.mainParentName,
      width:'15%',
    },
    {
      name: 'Parent Account',
      hide: 'md',
      selector: row => row.parentAccountName,
      width:'10%',
    },
  
    {
      name: 'Actions',
      width:'15%',
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
        <h2 className="font-inter font-semibold text-[30px]">CharofAccount Table</h2>
      </div>
      <TableDataComp 
       columns={columns}
        filteredItems={filteredItems}
         filterText={filterText} 
         setFilterText={setFilterText}
         menuname='chartofaccForm' />
    </div>
  );
};

export default ChartofAccTable;

