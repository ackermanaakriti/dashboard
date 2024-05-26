import React, { useEffect, useState } from "react";
import useDelData from "../../Apis/useDelData";
import { useLayouData } from "../../Context/MainLayoutContext";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TableDataComp } from "../../Global/Table/TableData";
import { TableButton } from "../../Components/GreenButton";
import useGetData from "../../Apis/useGetData";
import { useNavigate } from "react-router";
import DeletePopup from "../../Components/DeletePopup";

const ModuleTable = () => {
  const { data, fetchData,Deldata,loading } = useGetData(`Module/GetAll?IsDeleted=${false}`,'Module/Delete/');
  const [tableData, setTableData] = useState([]);
  const [filterText, setFilterText] = React.useState('');
  const navigate = useNavigate();
  const { DeleteList, setDeleteList } = useLayouData();
  const [DeleteId, setDeleteId] = useState("");
  const [DatatobeDeleted,setDatatobeDeleted]= useState('')
  
console.log(data)

  const handleDelete = async (id,name) => {
    setDeleteList(true);
    setDeleteId(id);
    setDatatobeDeleted(name)
  };

  
  
  const handleEdit = (id) => {
    navigate(`/module/form/${id}`);
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
      name: 'Code',
      selector: row => row.code,
    },
    {
      name: 'Prefix',
      hide: 'md',
      selector: row => row.prefix, 
    },
    {
      name: 'isActive',
      hide: 'md',
      selector: row => row.isActive, 
      cell: row => (
        <>
          {row.isActive ? (
            <TableButton className='bg-PrimaryColor rounded-[20px] px-[12px] py-[5px] text-white' text='Yes'/>
          ) :  (
            <TableButton className="bg-[#378f80] rounded-[20px] px-[12px] py-[5px] text-white" text="No"/>
          )}
        </>
      ),
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="flex gap-[24px]">
          <button onClick={() => handleEdit(row.id)}>
            <span className="text-[20px] text-PrimaryColor mx-[3px]">
              <MdEdit />
            </span>
          </button>
          <button onClick={() => handleDelete(row.id,row?.name)}>
            <span className="text-[20px] text-redclr mx-[3px]">
              <RiDeleteBin6Line />
            </span>
          </button>
        </div>
      ),
      allowOverflow: true,
      button: true,
      width: '15%',
    }
  ];

  return (
    <div className="px-[50px]">
      <div>
        <h2 className="font-inter font-semibold text-[30px]">Module </h2>
      </div>
      <TableDataComp
        columns={columns}
        filteredItems={filteredItems}
        filterText={filterText}
        setFilterText={setFilterText}
        link='/module/form'
        loading
      />
      {DeleteList && (
        <DeletePopup
          DatatobeDeleted={DatatobeDeleted}
          DeleteId={DeleteId}
          Deldata={Deldata}
        />
      )}
    </div>
  );
};

export default ModuleTable;
