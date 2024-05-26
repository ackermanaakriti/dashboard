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
  const { data,Deldata,fetchData } = useGetData(`Voucher/GetAll?IsDeleted=${false}`,"Voucher/Delete/");   // use custom hook to get all data...passing url
  const [filterText, setFilterText] = React.useState('');
  const navigate = useNavigate();
  const { DeleteList, setDeleteList } = useLayouData();
  const [DeleteId, setDeleteId] = useState("");
  const [DatatobeDeleted,setDatatobeDeleted]= useState('')


 useEffect(()=>
{
  fetchData()
},[])
  const handleDelete = async (id,name) => {
    setDeleteList(true);
    setDeleteId(id);
    setDatatobeDeleted(name)
  };


  const handleEdit = (id) => {
    navigate(`/voucher/form/${id}`);
  };
  console.log(data)

  const filteredItems = data?.filter(
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
          <button onClick={() => handleDelete(row.id,row?.voucherTypeName)}>
            <span className="text-[20px] text-redclr  mx-[3px]"><RiDeleteBin6Line /></span>
          </button>
        </div>
      ),
     
    }
  ];
  const ExpandableRow = ({ data }) => (
    <div>
      <p><strong>Voucher Details:</strong></p>
      <p>Voucher Type: {data.voucherTypeName}</p>
      <p>Voucher Number: {data.voucherNumber}</p>
      <p>Invoice Number: {data.invoiceNumber}</p>
      <p>Transaction Date: {data.transactionDate}</p>
      <p>Transaction Date (BS): {data.transactionDateBS}</p>
    </div>
  );

  return (
    <div className="px-[50px] flex flex-col">
      <div>
        <h2 className="font-inter font-semibold text-[30px]">Voucher </h2>
      </div>
      <TableDataComp 
        columns={columns}
        filteredItems={filteredItems}
        filterText={filterText}
        setFilterText={setFilterText}
        link='/voucher/form'
        width='100%'
        expandableRows
        expandableRowsComponent={ExpandableRow}
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

export default VoucherTable;
