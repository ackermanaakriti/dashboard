


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

const CurrencyTable = () => {
  const { setId } = useLayouData();
  const dispatch = useDispatch();
  const {Deldata}= useDelData('Currency/Delete')
  const { data } = useGetData('Currency/GetAll')
  const [tableData,setTableData]= useState([])
  const [filterText, setFilterText] = React.useState('');

  
  useEffect(()=>
  {
     setTableData(data?.data)
  },[tableData,data])

  console.log(data?.data)
  

  const handleDelete = async (id) => {
    await Deldata(id);
  };
  const handleEdit = (id) => {
    console.log(id)
    setId(id);
    dispatch(addMenu({ id: id, menu: "currencyform" }));
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
      width:'30%'
     
    },
    {
      name: ' Country',
      selector: row => row.country,
      width:'20%'
      
    },
    {
      name: 'Country Code',
      hide: 'md',
      selector: row => row.currencyCode,
      width:'15%'
    },
    {
      name: 'Exchange Rate',
      hide: 'md',
      width:'15%',
      selector: row => row.currentExchangeRate,
    },
  
    {
      name: 'Actions',
      width:'20%'
,      cell: row => (
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
        <h2 className="font-inter font-semibold text-[30px]">Currency Table</h2>
      </div>
      <TableDataComp  columns={columns}
       filteredItems={filteredItems}
        filterText={filterText}
       setFilterText={setFilterText}
       menuname='currencyform' />
    </div>
  );
};

export default CurrencyTable;
