
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
import { BackgroundColor, Width } from "devextreme-react/cjs/chart";

const DepartmentTable = () => {
  const { setId } = useLayouData(); // setId to get the id for form editing --not using react-router So setting id manually
  const dispatch = useDispatch();
  const { Deldata } = useDelData('Department/Delete/')   //use custom delete hook
  const { data } = useGetData('Department/GetAll')   //use custom hook to get all data...passing url
  const [tableData, setTableData] = useState([])
  const [filterText, setFilterText] = React.useState('');


  useEffect(() => {
    setTableData(data?.data)  //set fetched data to tableData for filtering 
  }, [tableData, data])

  const handleDelete = async (id) => {
    await Deldata(id);
  };

  const handleEdit = (id) => {
    console.log(id)
    setId(id);
    dispatch(addMenu({ id: id, menu: "departmentform" }));   // dispatched menu for component navigation..using object mapping for navigation so passing menu as key
  };

  const filteredItems = tableData?.filter(
    item => item?.name.toLowerCase().includes(filterText.toLowerCase()),  //filter fetched data on the basis of name
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

  // set columns acc to the menu
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
      // grow: 2,

    },
    {
      name: ' Code',
      selector: row => row.code,
      width:'20%'
    },
    {
      name: ' Company Name',
      selector: row => row.companyName,
    },

    {
      name: 'Actions',
      width:'20%',
      cell: row => (
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
        <h2 className="font-inter font-semibold text-[30px]">Department Table</h2>
      </div>
      <TableDataComp
        columns={columns}
        filteredItems={filteredItems}
        filterText={filterText} 
        customStyles={customStyles}
        setFilterText={setFilterText}
        menuname='departmentform' />
    </div>
  );
};

export default DepartmentTable;
















