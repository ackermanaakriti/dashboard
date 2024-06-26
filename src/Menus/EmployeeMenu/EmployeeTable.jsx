import React, { useEffect, useState, useCallback } from "react";
import { useLayouData } from "../../Context/MainLayoutContext";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TableDataComp } from "../../Global/Table/TableData";
import useGetData from "../../Apis/useGetData";
import { useNavigate } from "react-router";
import DeletePopup from "../../Components/DeletePopup";
const EmployeeTable = () => {
  const { data, Deldata } = useGetData(`Employee/GetAll?isDeleted=${false}`,"Employee/Delete/");
  const [filterText, setFilterText] = React.useState('');
  const navigate = useNavigate();
  const { DeleteList, setDeleteList,token } = useLayouData();
  const [DeleteId, setDeleteId] = useState("");
  const [DatatobeDeleted,setDatatobeDeleted]= useState('')

  const handleDelete = async (id,name) => {
    setDeleteList(true);
    setDeleteId(id);
    setDatatobeDeleted(name)
  };

  const handleEdit = (id) => {
    navigate(`/employee/form/${id}`);
  };

  const filteredItems = data?.filter(
    item => item?.firstName.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    {
      name: 'First Name',
      selector: row => row.firstName,
      sortable: true,
      width: '15%',
    },
    {
      name: 'Last Name',
      selector: row => row.lastName,
      width: '15%',
    },
    {
      name: 'Position',
      hide: 'md',
      selector: row => row.positon,
      width: '15%',
      conditionalCellStyles: [
        {
          when: row => row.positon === 'string',
          style: {
            backgroundColor: 'rgba(63, 195, 128, 0.9)',
            color: 'white',
            '&:hover': {
              cursor: 'pointer',
            },
          },
        },
      ]
    },
    {
      name: 'Contact No',
      selector: row => row.contactNumber,
      hide: 'md',
      width: '15%',
    },
    {
      name: 'Email',
      selector: row => row.email,
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="flex gap-[24px]">
          <button onClick={() => handleEdit(row.id)}>
            <span className="text-[20px] text-PrimaryColor  mx-[3px]"><MdEdit /></span>
          </button>
          <button onClick={() => handleDelete(row.id,row?.firstName)}>
            <span className="text-[20px] text-redclr  mx-[3px]"><RiDeleteBin6Line /></span>
          </button>
        </div>
      ),
      width: '10%',
    }
  ];

  return (
    <div className="px-[50px]">
      <div>
        <h2 className="font-inter font-semibold text-[30px]">Employee </h2>
      </div>
      <TableDataComp
        columns={columns}
        filteredItems={filteredItems}
        filterText={filterText}
        setFilterText={setFilterText}
        link='/employee/form'
        fileName='Employee'
      />
      {DeleteList && (
        <DeletePopup
          DeleteId={DeleteId}
          Deldata={Deldata}    
          DatatobeDeleted={DatatobeDeleted}    />
      )}
    </div>
  );
};

export default EmployeeTable;
