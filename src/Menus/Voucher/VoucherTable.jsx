import React, { useEffect, useState } from "react";
// import useDelData from "../../Apis/useDelData";
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

const VoucherTable = () => {
  const { data, fetchData,Deldata } = useGetData(`Voucher/GetAll?IsDeleted=${false}`);   // use custom hook to get all data...passing url
  const [tableData, setTableData] = useState([]);          
  const [filterText, setFilterText] = React.useState('');
  const navigate = useNavigate();
  const { DeleteList, setDeleteList } = useLayouData();
  const [DeleteId, setDeleteId] = useState("");
  
  console.log(data);

  useEffect(() => {
    setTableData(data?.data); 
    // set fetched data to tableData for filtering 
  }, [tableData, data]);

  const handleDelete = async (id) => {
    setDeleteList(true);
    setDeleteId(id);
  };

  const handleDeleteConfirmation = async () => {
    fetchData();
  };

  const handleEdit = (id) => {
    navigate(`/voucher/form/${id}`);
  };

  const filteredItems = tableData?.filter(
    item => item?.voucherTypeName.toLowerCase().includes(filterText.toLowerCase())  // filter fetched data on the basis of name
  );

  // set columns acc to the menu
  const columns = [
    {
      name: 'Voucher Type',
      selector: row => row.voucherTypeName,
      sortable: true,
    },
    {
      name: 'Voucher Number',
      selector: row => row.voucherNumber,
    },
    {
      name: 'Invoice Number',
      selector: row => row.invoiceNumber,
    },
    {
      name: 'Transaction Date',
      selector: row => row.transactionDate,
    },
    {
      name: 'Transaction Date (BS)',
      selector: row => row.transactionDateBS,
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
        </div>
      ),
      allowOverflow: true,
      button: true,
    }
  ];

  return (
    <div className="px-[50px] flex flex-col">
      <div>
        <h2 className="font-inter font-semibold text-[30px]">Voucher Table</h2>
      </div>
      <TableDataComp 
        columns={columns}
        filteredItems={filteredItems}
        filterText={filterText}
        setFilterText={setFilterText}
        link='/voucher/form'
        width='100%'
      />
      {DeleteList && (
        <DeletePopup
          url="Voucher/Delete/"
          id={DeleteId}
          handleDeleteConfirmation={handleDeleteConfirmation}
        />
      )}
    </div>
  );
};

export default VoucherTable;
