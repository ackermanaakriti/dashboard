import React from 'react'
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import './Fiscalyear.css'

const FiscalYearTable = () => {
  return (
    <>
    <div className='px-[50px]'>
        <div>
            <h2 className='font-inter font-semibold text-[30px]'>
                Fiscal Year Table
            </h2>
        </div>
        <div>
        <table className="shadow-lg">
                <thead>
                  <tr>
                    <th> Fiscal Year</th>
                    <th> Code</th>
                    <th> Start Date</th>
                    <th> End Date</th>
                    <th> Action</th>
                  </tr>
                </thead>
                <tbody>
                 
                      <tr >
                 
                  
                      <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      
                    </td>
                    <td className="">
                    <div className="flex gap-[25px] items-center">
                        <span  className="text-PrimaryColor cursor-pointer">
                          <MdEdit />
                        </span>
                        <span  className="text-[#d13838] cursor-pointer">
                          <RiDeleteBin5Fill />
                        </span>
                      </div>
                    </td>
                   
                  </tr>
                   
                
                  
                </tbody>
              </table>
        </div>
    </div>
    </>
  )
}

export default FiscalYearTable