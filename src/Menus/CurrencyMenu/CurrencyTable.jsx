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
import DeletePopup from "../../Components/DeletePopup";
import { useNavigate } from "react-router";

const CurrencyTable = () => {

  const { data, Deldata } = useGetData(`Currency/GetAll?IsDeleted=${false}`,"Currency/Delete/");
  const [tableData, setTableData] = useState([]);
  const [filterText, setFilterText] = React.useState('');
  const { DeleteList, setDeleteList } = useLayouData();
  const [DeleteId, setDeleteId] = useState("");
  const navigate = useNavigate()


  const handleDelete = async (id) => {
    setDeleteList(true);
    setDeleteId(id);
  };



  const handleEdit = (id) => {
    navigate(`/currency/form/${id}`);
  };

  const filteredItems = data?.filter(
    item => item?.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Country Code',
      hide: 'md',
      selector: row => row.currencyCode,
    },
    {
      name: 'Exchange Rate',
      hide: 'md',
      selector: row => row.currentExchangeRate,
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="flex gap-[24px]">
          <button onClick={() => handleEdit(row.id)}>
            <span className="text-[20px] text-PrimaryColor mx-[3px]"><MdEdit /></span>
          </button>
          <button onClick={() => handleDelete(row.id)}>
            <span className="text-[20px] text-redclr mx-[3px]"><RiDeleteBin6Line /></span>
          </button>
        </div>
      ),
    }
  ];

  return (
    <div className="px-[50px]">
      <div>
        <h2 className="font-inter font-semibold text-[30px]">Currency Table</h2>
      </div>
      <TableDataComp
        columns={columns}
        filteredItems={filteredItems}
        filterText={filterText}
        setFilterText={setFilterText}
        menuname='currencyform'
        width='100%'
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

export default CurrencyTable;
