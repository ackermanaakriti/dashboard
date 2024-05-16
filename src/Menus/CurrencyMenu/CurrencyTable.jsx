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

const CurrencyTable = () => {
  const { setId } = useLayouData();
  const dispatch = useDispatch();
  const { Deldata } = useDelData('Currency/Delete/');
  const { data, fetchData } = useGetData(`Currency/GetAll?IsDeleted=${false}`);
  const [tableData, setTableData] = useState([]);
  const [filterText, setFilterText] = React.useState('');
  const { DeleteList, setDeleteList } = useLayouData();
  const [DeleteId, setDeleteId] = useState("");

  useEffect(() => {
    setTableData(data?.data);
    console.log(tableData);
  }, [tableData, data]);

  const handleDelete = async (id) => {
    setDeleteList(true);
    setDeleteId(id);
  };

  const handleDeleteConfirmation = async () => {
    fetchData();
  };

  const handleEdit = (id) => {
    console.log(id);
    setId(id);
    dispatch(addMenu({ id: id, menu: "currencyform" }));
  };

  const filteredItems = tableData?.filter(
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
      allowOverflow: true,
      button: true,
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
          url="Currency/Delete/"
          id={DeleteId}
          handleDeleteConfirmation={handleDeleteConfirmation}
        />
      )}
    </div>
  );
};

export default CurrencyTable;
