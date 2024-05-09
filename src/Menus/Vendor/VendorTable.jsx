// import React, { useEffect } from 'react'
// import { RiDeleteBin5Fill } from "react-icons/ri";
// import { MdEdit } from "react-icons/md";
// import '../FiscalYearMenu/Fiscalyear.css'
// import { useDispatch, useSelector } from 'react-redux';
// import { removeFiscalYear ,editFiscalYear} from '../../Redux/Slices/FiscalYearSlice';
// import { addMenu } from '../../Redux/TopTabSlice';
// import { useLayouData } from '../../Context/MainLayoutContext';
// import { GreenButton } from '../../Components/GreenButton';
// import { TableButton } from '../../Components/GreenButton';
// import useGetData from '../../Apis/useGetData';
// import useDelData from '../../Apis/useDelData';

// const VendorTable = () => {
//   const {setId} = useLayouData();
//   const dispatch = useDispatch()
//   const fiscaldata = useSelector((state) => state.fiscalyear) 
//   const {data}= useGetData('Vendor/GetAll')
//   const {Deldata} = useDelData('Vendor/Delete/')


 

//   const handleDel = async(id)=>
//   {
//      await Deldata(id)
//   }
//   const handleEdit = (index) => {
//     setId(index)
//     dispatch(addMenu({ id:index, menu:'vendorForm'}))
//   };

//   return (
//     <>
//       <div className='px-[50px]'>
//         <div>
//           <h2 className='font-inter font-semibold text-[30px]'>
//             Vendor Table
//           </h2>
//         </div>
//         <div>
//           <div className='mt-[20px]' onClick={()=>dispatch(addMenu({ id:'', menu:'vendorForm'}))}>
//             <GreenButton className='bg-PrimaryColor px-[15px] py-[4px] text-white font-inter' text='Add New +' />
//           </div>
//           <div className="table--wrapper h-[800px] overflow-y-auto">
//           <table className="shadow-lg">
//             <thead>
//               <tr>
//                 <th> Name</th>
//                 <th> ChartofAccount</th>
//                 <th> Company Name</th>
                
//                 <th> Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data?.data?.map((item, index) => (
//                 <tr key={index}>
//                   <td>{item?.name}</td>
//                   <td>{item?.chartOfAccountId}</td>
//                   <td>{item?.companyName}</td>
                
//                   <td className="">
//                     <div className="flex gap-[25px] items-center justify-center">
//                       <span onClick={()=>handleEdit(item?.id)} className="text-PrimaryColor cursor-pointer">
//                         <MdEdit />
//                       </span>
//                       <span onClick={()=>handleDel(item?.id)} className="text-[#d13838] cursor-pointer">
//                         <RiDeleteBin5Fill />
//                       </span>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default VendorTable;


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

const VendorTable = () => {
  const { setId } = useLayouData(); // setId to get the id for form editing --not using react-router So setting id manually
  const dispatch = useDispatch();
  const {Deldata}= useDelData('Vendor/Delete/')   //use custom delete hook
  const { data } = useGetData('Vendor/GetAll')   //use custom hook to get all data...passing url
  const [tableData,setTableData]= useState([])          
  const [filterText, setFilterText] = React.useState('');

  
  useEffect(()=>
  {
     setTableData(data?.data)  //set fetched data to tableData for filtering 
  },[tableData,data])

  const handleDelete = async (id) => {
    await Deldata(id);
  };

  const handleEdit = (id) => {
    console.log(id)
    setId(id);
    dispatch(addMenu({ id: id, menu: "vendorForm" }));   // dispatched menu for component navigation..using object mapping for navigation so passing menu as key
  };

  const filteredItems = tableData?.filter(
    item =>  item?.name.toLowerCase().includes(filterText.toLowerCase()),  //filter fetched data on the basis of name
);

// set columns acc to the menu
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
      // grow: 2,
     
    },
    {
      name: ' Prefix',
      selector: row => row.prefix,
      
    },
  
    {
      name: 'System Define',
      hide: 'md',
      selector: row => row.isSystemDefined,
      cell: row => (
        <>
            {row.isSystemDefined ? (
               <TableButton className='bg-PrimaryColor rounded-[20px] px-[12px] py-[5px] text-white' text='Yes'/>
            ) :  <TableButton
            className="bg-[#378f80] rounded-[20px] px-[12px] py-[5px] text-white"
            text="No"
          />}
        </>
    ),
    },
    {
      name: 'Editable',
      hide: 'md',
      selector: row => row.isEditable,
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
      width: 'fit-content',
    

    }
  ];

  return (
    <div className="px-[50px]">
      <div>
        <h2 className="font-inter font-semibold text-[30px]">Vendor Table</h2>
      </div>
      <TableDataComp 
       columns={columns}
        filteredItems={filteredItems}
         filterText={filterText}
          setFilterText={setFilterText}
          menuname='vendorForm' />
    </div>
  );
};

export default VendorTable;












