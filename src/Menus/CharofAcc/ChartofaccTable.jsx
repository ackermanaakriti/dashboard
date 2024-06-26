import React, { useEffect, useState } from "react";
import { useLayouData } from "../../Context/MainLayoutContext";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TableDataComp } from "../../Global/Table/TableData";
import { useNavigate } from "react-router";
import { TbListTree } from "react-icons/tb";
import DeletePopup from "../../Components/DeletePopup";
import { useDispatch, useSelector } from 'react-redux';
import { deleteCharofAccount, fetchChartofAccount } from "../../Redux/Slices/ChartOfAccountSlice";
import useGetData from "../../Apis/useGetData";


const ChartofAccTable = () => {
  const dispatch = useDispatch();
  const { DeleteList, setDeleteList } = useLayouData();
  const [DeleteId, setDeleteId] = useState("");
  const {data,Deldata} = useGetData(`ChartOfAccount/GetAll?ShowTransactionalOnly=${false}`,`ChartOfAccount/Delete/`)
const [DatatobeDeleted,setDatatobeDeleted]= useState('')
  const [filterText, setFilterText] = useState("");

 

  const navigate = useNavigate();

  const handleDelete = async (id,name) => {
    setDeleteList(true);
    setDeleteId(id);
    setDatatobeDeleted(name)
     
  };

  const handleEdit = (id) => {
    console.log(id);
    navigate(`/chartofaccount/form/${id}`);
  };

  const filteredItems =data?.filter((item) =>
    item?.accountName.toLowerCase().includes(filterText.toLowerCase())
  );

  

  const tabletree = () => {
    return (
      <div className="cursor-pointer flex items-center justify-end gap-[7px]" onClick={() => navigate("/chartofaccount")}>
        <span className="text-PrimaryColor">Tree View</span>
        <span className="text-[24px] text-PrimaryColor">
          <TbListTree />
        </span>
      </div>
    );
  };


  const columns = [
    {
      name: "Name",
      selector: (row) => row.accountName,
      sortable: true,
     
    },
    {
      name: " Code",
      selector: (row) => row.accountCode,
   
    },
    {
      name: "Account Group",
      hide: "md",
      selector: (row) => row.accountName,
   
    },
    {
      name: "Main Parent Account",
      hide: "md",
      selector: (row) => row.mainParentName,
    
    },
    {
      name: "Parent Account",
      hide: "md",
      selector: (row) => row.parentAccountName,
     
    },
    {
      name: "Actions",
      width: "8%",
      cell: (row) => (
        <div className="flex gap-[24px]">
          <button onClick={() => handleEdit(row.id)}>
            <span className="text-[20px] text-PrimaryColor  mx-[3px]">
              <MdEdit />
            </span>
          </button>
          <button onClick={() => handleDelete(row.id,row?.accountName)}>
            <span className="text-[20px] text-redclr  mx-[3px]">
              <RiDeleteBin6Line />
            </span>
          </button>
        </div>
      ),
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="px-[50px]">
      <div>
        <h2 className="font-inter font-semibold text-[30px]">ChartofAccount </h2>
      </div>
      <TableDataComp
        columns={columns}
        filteredItems={filteredItems}
        filterText={filterText}
        setFilterText={setFilterText}
        tabletree={tabletree}
        link="/chartofaccount/form"
        fileName='CharofAccount'
      />
      {DeleteList && (
        <DeletePopup
         DatatobeDeleted={DatatobeDeleted}
          DeleteId={DeleteId}
         DelData= {Deldata}
           
        />
      )}
    </div>
  );
};

export default ChartofAccTable;
