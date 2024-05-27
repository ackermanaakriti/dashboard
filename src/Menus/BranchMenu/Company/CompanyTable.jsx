import React, { useEffect, useState,use } from "react";
import useDelData from "../../../Apis/useDelData";
import { useLayouData } from "../../../Context/MainLayoutContext";
import { useDispatch } from "react-redux";
import { addMenu } from "../../../Redux/TopTabSlice";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TableDataComp } from "../../../Global/Table/TableData";
import { TableButton } from "../../../Components/GreenButton";
import useGetData from "../../../Apis/useGetData";
import { useNavigate } from "react-router";
import DeletePopup from "../../../Components/DeletePopup";

const CompanyTable = () => {
  const { data,Deldata } = useGetData(`Company/GetAll?IsDeleted=${false}`,'Company/Delete/'); //use custom hook to get all data...passing url
  const [tableData, setTableData] = useState([]);
  const [filterText, setFilterText] = React.useState("");
  const navigate = useNavigate();
  const { DeleteList, setDeleteList } = useLayouData();
  const [DeleteId, setDeleteId] = useState("");
  const [DatatobeDeleted,setDatatobeDeleted]= useState('')



  const handleDelete =  async (id,name) => {
    setDeleteList(true)
    setDeleteId(id)
    setDatatobeDeleted(name)
  };

 
  const handleEdit = (id) => {
    navigate(`/company/form/${id}`);
  };

  const filteredItems = data?.filter((item) =>
    item?.name.toLowerCase().includes(filterText.toLowerCase())
  ); //filter fetched data on the basis of name

  // set columns acc to the menu
  const columns = [
    {
      name: "Company Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Code",
      selector: (row) => row.code,
    },
    {
      name: "Reg No",
      selector: (row) => row.regestrationNo,
    },
    {
      name: "Head Office",
      hide: "md",
      width:'10%',
      cell: (row) => (
        <>
          {row.isEditable ? (
            <TableButton
              className="bg-PrimaryColor rounded-[20px] px-[12px] py-[5px] text-white"
              text="Yes"
            />
          ) : (
            <TableButton
              className="bg-[#d2e6e2] rounded-[20px] px-[12px] py-[5px] text-black"
              text="No"
            />
          )}
        </>
      ),
    },
    {
      name: "Actions",
      width:'6%',
      cell: (row) => (
        <div className="flex gap-[24px]">
          <button onClick={() => handleEdit(row.id)}>
            <span className="text-[20px] text-PrimaryColor mx-[3px]">
              <MdEdit />
            </span>
          </button>
          <button onClick={() => handleDelete(row.id,row.name)}>
            <span className="text-[20px] text-redclr mx-[3px]">
              <RiDeleteBin6Line />
            </span>
          </button>
        </div>
      ),
    
    },
  ];

  return (
    <div className="px-[50px] flex flex-col">
      <div>
        <h2 className="font-inter font-semibold text-[30px]">Company </h2>
      </div>
      <TableDataComp
        columns={columns}
        filteredItems={filteredItems}
        filterText={filterText}
        setFilterText={setFilterText}
        menuname="companyform"
        width="100%"
        link="/company/form"
        fileName='Company'
      />
      {DeleteList && (
        <DeletePopup
        
          
        DatatobeDeleted={DatatobeDeleted}
          DeleteId={DeleteId}
          Deldata={Deldata}
        
        />
      )}
    </div>
  );
};

export default CompanyTable;
