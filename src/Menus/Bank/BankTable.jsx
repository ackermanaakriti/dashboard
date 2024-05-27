import React, { useState } from "react";
import useGetData from "../../Apis/useGetData";
import { useNavigate } from "react-router";
import { useLayouData } from "../../Context/MainLayoutContext";
import DeletePopup from "../../Components/DeletePopup";
import { TableDataComp } from "../../Global/Table/TableData";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Export,{downloadCSV} from "../../Components/ExportCsv";
const BankTable = () => {
  const { data, fetchData, Deldata } = useGetData(`Bank/GetAll?IsDeleted=${false}`, 'Bank/Delete/');
  const [filterText, setFilterText] = useState('');
  const navigate = useNavigate();
  const { DeleteList, setDeleteList } = useLayouData();
  const [DeleteId, setDeleteId] = useState("");
  const [DatatobeDeleted, setDatatobeDeleted] = useState('');

  const handleDelete = async (id, name) => {
    setDeleteList(true);
    setDeleteId(id);
    setDatatobeDeleted(name);
  };

  const handleEdit = (id) => {
    navigate(`/bank/form/${id}`);
  };

  const filteredItems = data?.filter(
    item => item?.name.toLowerCase().includes(filterText.toLowerCase()),
  );

  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Account Number',
      selector: row => row.accountNumber,
    },
    {
      name: 'Company Name',
      selector: row => row.companyName,
    },
    {
      name: 'Actions',
      width:'6%',
      cell: row => (
        <div className="flex gap-[24px]">
          <button onClick={() => handleEdit(row.id)}>
            <span className="text-[20px] text-PrimaryColor mx-[3px]"><MdEdit /></span>
          </button>
          <button onClick={() => handleDelete(row.id, row?.name)}>
            <span className="text-[20px] text-redclr mx-[3px]"><RiDeleteBin6Line /></span>
          </button>
        </div>
      ),
    },
  ];



  return (
    <div className="px-[50px]">
      <div>
        <h2 className="font-inter font-semibold text-[30px]">Bank Table</h2>
      </div>
      
      
      <TableDataComp
        columns={columns}
        filteredItems={filteredItems}
        filterText={filterText}
        setFilterText={setFilterText}
        link='/bank/form'
        fileName='Bank'
      />
      {DeleteList && (
        <DeletePopup
          url="Bank/Delete/"
          DeleteId={DeleteId}
          Deldata={Deldata}
          DatatobeDeleted={DatatobeDeleted}
        />
      )}
    </div>
  );
};

export default BankTable;
