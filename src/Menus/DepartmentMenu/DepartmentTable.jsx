import React, { useEffect, useState } from "react";
import { useLayouData } from "../../Context/MainLayoutContext";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TableDataComp } from "../../Global/Table/TableData";
import { useNavigate } from "react-router";
import DeletePopup from "../../Components/DeletePopup";
import useGetData from "../../Apis/useGetData";

const DepartmentTable = () => {
  const { data, fetchData,Deldata } = useGetData(`Department/GetAll?IsDeleted=${false}`,'Department/Delete/');
  const [tableData, setTableData] = useState([]);
  const [filterText, setFilterText] = React.useState('');
  const navigate = useNavigate();
  const { DeleteList, setDeleteList } = useLayouData();
  const [DeleteId, setDeleteId] = useState("");


  const handleDelete = async (id) => {
    setDeleteList(true);
    setDeleteId(id);
  };

  

  const handleEdit = (id) => {
    navigate(`/department/form/${id}`);
  };

  const filteredItems = data?.filter(
    item => item?.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#000",
        color: "#fff",
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        fontSize: "14px",
      },
    },
  };

  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Code',
      selector: row => row.code,
      width: '20%',
    },
    {
      name: 'Company Name',
      selector: row => row.companyName,
    },
    {
      name: 'Actions',
      width: '20%',
      cell: row => (
        <div className="flex gap-[24px]">
          <button onClick={() => handleEdit(row.id)}>
            <span className="text-[20px] text-PrimaryColor  mx-[3px]"><MdEdit /></span>
          </button>
          <button onClick={() => handleDelete(row.id)}>
            <span className="text-[20px] text-redclr  mx-[3px]"><RiDeleteBin6Line /></span>
          </button>
        </div>
      ),
      allowOverflow: true,
      button: true,
    }
  ];

  return (
    <div className="px-[50px]">
      <div>
        <h2 className="font-inter font-semibold text-[30px]">Department Table</h2>
      </div>
      <TableDataComp
        columns={columns}
        filteredItems={filteredItems}
        filterText={filterText}
        customStyles={customStyles}
        setFilterText={setFilterText}
        link='/department/form'
      />
      {DeleteList && (
        <DeletePopup
         
          DeleteId={DeleteId}
          Deldata={Deldata}
         
        />
      )}
    </div>
  );
};

export default DepartmentTable;
