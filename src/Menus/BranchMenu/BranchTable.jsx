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

const BranchTable = () => {
  const { data, fetchData } = useGetData(`Branch/GetAll?IsDeleted=${false}`); //use custom hook to get all data...passing url
  const [tableData, setTableData] = useState([]);
  const [filterText, setFilterText] = React.useState('');
  const navigate = useNavigate();
  const { DeleteList, setDeleteList } = useLayouData();
  const [DeleteId, setDeleteId] = useState("");

  useEffect(() => {
    setTableData(data?.data);  //set fetched data to tableData for filtering 
  }, [tableData, data]);

  const handleDelete = async (id) => {
    setDeleteList(true);
    setDeleteId(id);
  };

  const handleDeleteConfirmation = async () => {
    fetchData();
  };

  const handleEdit = (id) => {
    navigate(`/branch/form/${id}`);
  };

  const filteredItems = tableData?.filter(
    item => item?.name.toLowerCase().includes(filterText.toLowerCase())  //filter fetched data on the basis of name
  );

  // set columns according to the menu
  const columns = [
    {
      name: 'Branch Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Code',
      selector: row => row.code,
    },
    {
      name: 'Reg No',
      selector: row => row.regestrationNo,
    },
    {
      name: 'Head Office',
      hide: 'md',
      cell: row => (
        <>
          {row.isEditable ? (
            <TableButton className='bg-PrimaryColor rounded-[20px] px-[12px] py-[5px] text-white' text='Yes' />
          ) : (
            <TableButton
              className="bg-[#378f80] rounded-[20px] px-[12px] py-[5px] text-white"
              text="No"
            />
          )}
        </>
      ),
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="flex gap-[24px]">
          <button onClick={() => handleEdit(row.id)}>
            <span className="text-[20px] text-PrimaryColor  mx-[3px]"><MdEdit /></span>
          </button>
          <button onClick={() => handleDelete(row.id)}>
            <span className="text-[20px] text-redclr  mx-[3px]"><RiDeleteBin6Line /></span>
          </button>
          {/* <button onClick={() => handleView(row)}> <span className="text-[20px]   mx-[3px]"><IoEyeOutline/></span></button> */}
        </div>
      ),
      allowOverflow: true,
      button: true,
    }
  ];

  return (
    <div className="px-[50px] flex flex-col ">
      <div>
        <h2 className="font-inter font-semibold text-[30px]">Branch Table</h2>
      </div>
      <TableDataComp
        columns={columns}
        filteredItems={filteredItems}
        filterText={filterText}
        setFilterText={setFilterText}
        link='/branch/form'
        width='100%'
      />
      {DeleteList && (
        <DeletePopup
          url="Branch/Delete/"
          id={DeleteId}
          handleDeleteConfirmation={handleDeleteConfirmation}
        />
      )}
    </div>
  );
};

export default BranchTable;
