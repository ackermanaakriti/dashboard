import React from "react";
import { FaEdit } from "react-icons/fa";
import { LuDelete } from "react-icons/lu";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";


const BranchTable = () => {
  return (
    <>
      <div className="bg-bgclr branchtable">
        <div className="container mx-auto">
          <div className="py-[30px]">
            <h3 className="font-inter font-semibold text-[30px]">
              Branch List
            </h3>
          </div>
          <div className="branchtable">
            <div className="py-[18px] addbtn">
              <button>Add New +</button>
            </div>
            <div>
              <table className="shadow-lg">
                <thead>
                  <tr>
                    <th> Branch name</th>
                    <th> Code</th>
                    <th> Reg.no</th>
                    <th> Head Office</th>
                    <th> Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>ABc Pvt.Ltd</td>
                    <td>1234</td>
                    <td>1234</td>
                    <td>
                      <button>Yes</button>
                    </td>
                    <td className="">
                    <div className="flex gap-[25px] items-center">
                        <span className="text-PrimaryColor">
                          <MdEdit />
                        </span>
                        <span className="text-[#d13838]">
                          <RiDeleteBin5Fill />
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>ABc Pvt.Ltd</td>
                    <td>1234</td>
                    <td>1234</td>
                    <td>
                      <button>Yes</button>
                    </td>
                    <td className="">
                      <div className="flex gap-[25px] items-center">
                        <span className="text-PrimaryColor">
                          <MdEdit />
                        </span>
                        <span className="text-[#d13838]">
                          <RiDeleteBin5Fill />
                        </span>
                      </div>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>ABc Pvt.Ltd</td>
                    <td>1234</td>
                    <td>1234</td>
                    <td>
                      <button>Yes</button>
                    </td>
                    <td className="">
                    <div className="flex gap-[25px] items-center">
                        <span className="text-PrimaryColor">
                          <MdEdit />
                        </span>
                        <span className="text-[#d13838]">
                          <RiDeleteBin5Fill />
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BranchTable;
