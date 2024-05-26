
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
import { useNavigate } from "react-router";
import DeletePopup from "../../Components/DeletePopup";

const BankTable = () => {
  const { data,fetchData ,Deldata} = useGetData(`Bank/GetAll?IsDeleted=${false}`,'Bank/Delete/')   //use custom hook to get all data...passing url
  const [tableData,setTableData]= useState([])          
  const [filterText, setFilterText] = React.useState('');
  const navigate=useNavigate()
  const { DeleteList, setDeleteList } = useLayouData();
  const [DeleteId, setDeleteId] = useState("");
  const [DatatobeDeleted,setDatatobeDeleted]= useState('')



  const handleDelete = async (id,name) => {
    setDeleteList(true);
    setDeleteId(id);
    setDatatobeDeleted(name)
  };


  const handleEdit = (id) => {
navigate(`/bank/form/${id}`)
  };

  const filteredItems = data?.filter(
    item =>  item?.name.toLowerCase().includes(filterText.toLowerCase()),  //filter fetched data on the basis of name
);

// set columns acc to the menu
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
      // grow: 2,
      // width:'25%'
     
    },
    {
      name: ' Account Number',
      selector: row => row.accountNumber,
      // width:'30%'
    },
    {
      name: ' Company Name',
      selector: row => row.companyName,
      // width:'25%'
    },
    {
      name: 'Actions',
      // width:'20%',
      cell: row => (
        <div className="flex gap-[24px]">
          <button onClick={() => handleEdit(row.id)}> <span className="text-[20px] text-PrimaryColor  mx-[3px]"><MdEdit /></span></button>
          <button onClick={() => handleDelete(row.id,row?.name)}><span className="text-[20px] text-redclr  mx-[3px]"><RiDeleteBin6Line /></span></button>
          {/* <button onClick={() => handleView(row)}> <span className="text-[20px]   mx-[3px]"><IoEyeOutline/></span></button> */}
        </div>
      ),
      
  
    }
  ];

  return (
    <div className="px-[50px]">
      <div>
        <h2 className="font-inter font-semibold text-[30px]">Bank Table</h2>
      </div>
      <TableDataComp 
       columns={columns}
        filteredItems={filteredItems}
         filterText={filterText}
          setFilterText={setFilterText}
          link='/bank/form' />
            {DeleteList && (
        <DeletePopup
          url="Bank/Delete/"
          DeleteId={DeleteId}
         Deldata={Deldata}
         DatatobeDeleted={DatatobeDeleted}
        />
      )}
    </div>
  );
};

export default BankTable;
















