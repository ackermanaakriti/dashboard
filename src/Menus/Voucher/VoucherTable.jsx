
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

const VoucherTable = () => {
  const { setId } = useLayouData(); // setId to get the id for form editing --not using react-router So setting id manually
  const dispatch = useDispatch();
  const {Deldata}= useDelData('Voucher/Delete/')   //use custom delete hook
  const { data ,fetchData} = useGetData(`Voucher/GetAll?IsDeleted=${false}`)   //use custom hook to get all data...passing url
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
    dispatch(addMenu({ id: id, menu: "voucherForm" }));   // dispatched menu for component navigation..using object mapping for navigation so passing menu as key
  };

  const filteredItems = tableData?.filter(
    item =>  item?.voucherTypeName.toLowerCase().includes(filterText.toLowerCase()),  //filter fetched data on the basis of name
);

// set columns acc to the menu
  const columns = [
    {
      name: 'Voucher Type',
      selector: row => row.voucherTypeName,
      sortable: true,
      // grow: 2,
      // width:'30%'
     
    },
    {
      name: ' Voucher Number',
      selector: row => row.voucherNumber,
      // width:'20%'
      
    },
    {
      name: ' Invoice Number',
      selector: row => row.invoiceNumber,
      // width:'20%'
      
    },
    {
      name: ' Transaction Date',
      selector: row => row.transactionDate,
      // width:'20%'
      
    },
    {
      name: ' Transaction Date (BS)',
      selector: row => row.transactionDateBS,
      // width:'20%'
      
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
        <h2 className="font-inter font-semibold text-[30px]">Voucher Table</h2>
      </div>
      <TableDataComp 
       columns={columns}
        filteredItems={filteredItems}
         filterText={filterText}
          setFilterText={setFilterText}
          menuname='voucherForm'
          width='100%' 
          />
    </div>
  );
};

export default VoucherTable;


