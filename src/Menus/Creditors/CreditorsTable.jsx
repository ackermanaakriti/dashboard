import React, { useEffect, useState } from "react";
import useDelData from "../../Apis/useDelData";
import { useLayouData } from "../../Context/MainLayoutContext";
import { useDispatch, useSelector } from "react-redux";
import { addMenu } from "../../Redux/TopTabSlice";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TableDataComp } from "../../Global/Table/TableData";
import { TableButton } from "../../Components/GreenButton";
import useGetData from "../../Apis/useGetData";
import { useNavigate } from "react-router";
import DeletePopup from "../../Components/DeletePopup";

const VendorTable = () => {
 

  const { data, Deldata } = useGetData(`Creditors/GetAll?IsDeleted=${false}`,"Creditors/Delete/");   //use custom hook to get all data...passing url
  const [filterText, setFilterText] = React.useState('');
  const navigate = useNavigate();
  const { DeleteList, setDeleteList } = useLayouData();
  const [DeleteId, setDeleteId] = useState("");
  const [DatatobeDeleted,setDatatobeDeleted]= useState('')



  const handleDelete = async (id,name) => {
    setDeleteList(true);
    setDeleteId(id);
    setDatatobeDeleted(name)
  };


  const handleEdit = (id) => {
    navigate(`/creditors/form/${id}`);
  };

  const filteredItems = data?.filter(
    item => item?.name.toLowerCase().includes(filterText.toLowerCase())  //filter fetched data on the basis of name
  );

  // set columns acc to the menu
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Company',
      selector: row => row.companyName,
      selector:row=>row.email
    },
    {
      name: 'Contact No',
      selector: row => row.contactNumber,
    },
    {
      name: 'Email',
      selector: row => row.email,
    },
    {
      name: 'Actions',
      width:'6%',
      cell: row => (
        <div className="flex gap-[24px]">
          <button onClick={() => handleEdit(row.id)}>
            <span className="text-[20px] text-PrimaryColor mx-[3px]"><MdEdit /></span>
          </button>
          <button onClick={() => handleDelete(row.id,row?.name)}>
            <span className="text-[20px] text-redclr mx-[3px]"><RiDeleteBin6Line /></span>
          </button>
        </div>
      ),
    
    }
  ];

  return (
    <div className="px-[50px] flex flex-col">
      <div>
        <h2 className="font-inter font-semibold text-[30px]">Creditors </h2>
      </div>
      <TableDataComp
        columns={columns}
        filteredItems={filteredItems}
        filterText={filterText}
        setFilterText={setFilterText}
        link='/creditors/form'
        width='100%'
        fileName='Creditors'
      />
      {DeleteList && (
        <DeletePopup
          DeleteId={DeleteId}
         Deldata={Deldata}
         DatatobeDeleted={DatatobeDeleted}
        />
      )}
    </div>
  );
};

export default VendorTable;
