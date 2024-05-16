import React, { useEffect, useState } from "react";
import { useLayouData } from "../../Context/MainLayoutContext";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TableDataComp } from "../../Global/Table/TableData";
import useGetData from "../../Apis/useGetData";
import { useNavigate } from "react-router";
import { TbListTree } from "react-icons/tb";
import DeletePopup from "../../Components/DeletePopup";

const ChartofAccTable = () => {
  const { DeleteList, setDeleteList } = useLayouData();
  const [DeleteId, setDeleteId] = useState("");
  const { data, fetchData } = useGetData(
    `ChartOfAccount/GetAll?ShowTransactionalOnly=${false}`
  );
  const [tableData, setTableData] = useState([]);
  const [filterText, setFilterText] = useState("");

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    setDeleteList(true);
    setDeleteId(id);
  };

  const handleEdit = (id) => {
    console.log(id);
    navigate(`/chartofaccount/form/${id}`);
  };

  const filteredItems = tableData?.filter((item) =>
    item?.accountName.toLowerCase().includes(filterText.toLowerCase())
  );

  useEffect(() => {
    setTableData(data?.data);
  }, [data]);

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

  const handleDeleteConfirmation = async () => {
    fetchData();
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.accountName,
      sortable: true,
      width: "25%",
    },
    {
      name: " Code",
      selector: (row) => row.accountCode,
      width: "15%",
    },
    {
      name: "Account Group",
      hide: "md",
      selector: (row) => row.accountName,
      width: "20%",
    },
    {
      name: "Main Parent Account",
      hide: "md",
      selector: (row) => row.mainParentName,
      width: "15%",
    },
    {
      name: "Parent Account",
      hide: "md",
      selector: (row) => row.parentAccountName,
      width: "10%",
    },
    {
      name: "Actions",
      width: "15%",
      cell: (row) => (
        <div className="flex gap-[24px]">
          <button onClick={() => handleEdit(row.id)}>
            <span className="text-[20px] text-PrimaryColor  mx-[3px]">
              <MdEdit />
            </span>
          </button>
          <button onClick={() => handleDelete(row.id)}>
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
        <h2 className="font-inter font-semibold text-[30px]">CharofAccount Table</h2>
      </div>
      <TableDataComp
        columns={columns}
        filteredItems={filteredItems}
        filterText={filterText}
        setFilterText={setFilterText}
        tabletree={tabletree}
        link="/chartofaccount/form"
      />
      {DeleteList && (
        <DeletePopup
          url="ChartOfAccount/Delete/"
          id={DeleteId}
          handleDeleteConfirmation={handleDeleteConfirmation}
        />
      )}
    </div>
  );
};

export default ChartofAccTable;
