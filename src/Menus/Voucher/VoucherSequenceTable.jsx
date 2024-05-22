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

const VoucherSeqTable = () => {
  const { data ,Deldata} = useGetData(`VoucherSequence/GetAll?IsDeleted=${false}`,"VoucherSequence/Delete/");   // use custom hook to get all data...passing url
  const [filterText, setFilterText] = React.useState('');
  const navigate = useNavigate();
  const { DeleteList, setDeleteList } = useLayouData();
  const [DeleteId, setDeleteId] = useState("");

  const handleDelete = async (id) => {
    setDeleteList(true);
    setDeleteId(id);
  };

;
  
  const handleEdit = (id) => {
    navigate(`/vouchersequence/form/${id}`);
  };

  const filteredItems = data?.filter(
    item => item?.name.toLowerCase().includes(filterText.toLowerCase())  // filter fetched data on the basis of name
  );

  // set columns acc to the menu
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Fiscal Year',
      selector: row => row.fiscalYearId,
    },
    {
      name: 'Number',
      selector: row => row.Number,
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
      
    }
  ];

  return (
    <div className="px-[50px]">
      <div>
        <h2 className="font-inter font-semibold text-[30px]">Voucher Sequence Table</h2>
      </div>
      <TableDataComp 
        columns={columns}
        filteredItems={filteredItems}
        filterText={filterText}
        setFilterText={setFilterText}
        menuname='voucherseqform'
        width='100%' 
        link='/vouchersequence/form'
      />
      {DeleteList && (
        <DeletePopup
          DeleteId={DeleteId}
          Deldata={Deldata}        />
      )}
    </div>
  );
};

export default VoucherSeqTable;
