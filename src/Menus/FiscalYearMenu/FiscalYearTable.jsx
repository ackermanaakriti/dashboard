import React, { useEffect, useState } from "react";
import useDelData from "../../Apis/useDelData";
import { useLayouData } from "../../Context/MainLayoutContext";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TableDataComp } from "../../Global/Table/TableData";
import useGetData from "../../Apis/useGetData";
import { Outlet, useNavigate } from "react-router";
import DeletePopup from "../../Components/DeletePopup";

const FiscalYearTable = () => {
  const { data, fetchData } = useGetData(`FiscalYear/GetAll?isDeleted=${false}`);
  const [tableData, setTableData] = useState([]);
  const [filterText, setFilterText] = React.useState('');
  const navigate = useNavigate();
  const { DeleteList, setDeleteList } = useLayouData();
  const [DeleteId, setDeleteId] = useState("");

  useEffect(() => {
    setTableData(data?.data);
  }, [tableData, data]);

  console.log(data?.data);

  const handleDelete = async (id) => {
    setDeleteList(true);
    setDeleteId(id);
  };

  const handleDeleteConfirmation = async () => {
    fetchData();
  };

  const handleEdit = (id) => {
    navigate(`/fiscalyear/form/${id}`);
  };
  const filteredItems = tableData?.filter(
    (item) => item?.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
      width: '30%',
    },
    {
      name: ' Code',
      selector: (row) => row.code,
      width: '10%',
    },
    {
      name: 'Start Date',
      hide: 'md',
      selector: (row) => row.startDate,
      width: '20%',
    },
    {
      name: 'End Date',
      hide: 'md',
      selector: (row) => row.endDate,
      width: '20%',
    },
    {
      name: 'Actions',
      width: '20%',
      cell: (row) => (
        <div className="flex gap-[24px]">
          <button onClick={() => handleEdit(row?.id)}>
            <span className="text-[20px] text-PrimaryColor  mx-[3px]">
              <MdEdit />
            </span>
          </button>
          <button onClick={() => handleDelete(row?.id)}>
            <span className="text-[20px] text-redclr  mx-[3px]">
              <RiDeleteBin6Line />
            </span>
          </button>
        </div>
      ),
     
    },
  ];

  return (
    <div className="px-[50px]">
      <div>
        <h2 className="font-inter font-semibold text-[30px]">Fiscal Year Table</h2>
      </div>
      <TableDataComp
        columns={columns}
        filteredItems={filteredItems}
        filterText={filterText}
        setFilterText={setFilterText}
        link="/fiscalyear/form"
        width="100%"
      />
      {DeleteList && (
        <DeletePopup
          url="FiscalYear/Delete/"
          id={DeleteId}
          handleDeleteConfirmation={handleDeleteConfirmation}
        />
      )}
    </div>
  );
};

export default FiscalYearTable;
