import React from "react";
import useGetData from "../../Apis/useGetData";
import { GreenButton, TableButton } from "../../Components/GreenButton";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import useDelData from "../../Apis/useDelData";
import { useLayouData } from "../../Context/MainLayoutContext";
import { useDispatch } from "react-redux";
import { addMenu } from "../../Redux/TopTabSlice";

const ModuleTable = () => {
  const { setId } = useLayouData();
  const dispatch = useDispatch();

  const { data } = useGetData("Module/GetAll");
  const { Deldata } = useDelData("Module/Delete/");

  const handleDel = async (id) => {
    await Deldata(id);
  };
  const handleEdit = (id) => {
    setId(id);
    dispatch(addMenu({ id: id, menu: "moduleform" }));
  };

  return (
    <div className="px-[50px]">
      <div>
        <h2 className="font-inter font-semibold text-[30px]">Module Table</h2>
      </div>
      <div>
        <div
          className="mt-[20px]"
            onClick={() => dispatch(addMenu({ id: "", menu: "moduleform" }))}
        >
          <GreenButton
            className="bg-PrimaryColor px-[15px] py-[4px] text-white font-inter"
            text="Add New +"
          />
        </div>
        <div className="table--wrapper h-[500px] overflow-y-auto">
          <table className="shadow-lg">
            <thead>
              <tr>
                <th> Name</th>
                <th> Code</th>
                <th> Prefix</th>
                <th> Active</th>
                <th> Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.name}</td>
                  <td>{item?.code}</td>
                  <td>{item?.prefix}</td>
                  <td>
                    {item?.isActive ? (
                      <TableButton
                        className="bg-PrimaryColor rounded-[20px] px-[12px] py-[5px] text-white"
                        text="Yes"
                      />
                    ) : (
                      <TableButton
                        className="bg-[#378f80] rounded-[20px] px-[12px] py-[5px] text-white"
                        text="No"
                      />
                    )}
                  </td>
                  <td className="">
                    <div className="flex gap-[25px] items-center justify-center">
                      <span
                        onClick={() => handleEdit(item?.id)}
                        className="text-PrimaryColor cursor-pointer"
                      >
                        <MdEdit />
                      </span>
                      <span
                        onClick={() => handleDel(item?.id)}
                        className="text-[#d13838] cursor-pointer"
                      >
                        <RiDeleteBin5Fill />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ModuleTable;
