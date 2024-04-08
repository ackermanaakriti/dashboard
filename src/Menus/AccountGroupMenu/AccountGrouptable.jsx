import React, { useEffect } from 'react'
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import '../FiscalYearMenu/Fiscalyear.css'
import { useDispatch, useSelector } from 'react-redux';
import { removeFiscalYear ,editFiscalYear} from '../../Redux/Slices/FiscalYearSlice';
import { addMenu } from '../../Redux/TopTabSlice';
import { useLayouData } from '../../Context/MainLayoutContext';
import { GreenButton } from '../../Components/GreenButton';
import { removeCurrency } from '../../Redux/Slices/CurrencySlice';
import { removeAcctountgroup } from '../../Redux/Slices/AccountGroupSlice';

const AccountGrpTable = () => {
  const {setId} = useLayouData();
  const dispatch = useDispatch()
  const currencydata = useSelector((state) => state.accgroup) 


 

  const handleDel =(index)=>
  {
    dispatch(removeAcctountgroup(index))
  }
  const handleEdit = (index) => {
    setId(index)
    dispatch(addMenu({ id:index, menu:'accform'}))
  };

  return (
    <>
      <div className='px-[50px]'>
        <div>
          <h2 className='font-inter font-semibold text-[30px]'>
           Account Group Table
          </h2>
        </div>
        <div>
          <div className='mt-[20px]' onClick={()=>dispatch(addMenu({ id:'', menu:'accform'}))}>
            <GreenButton className='bg-PrimaryColor px-[15px] py-[4px] text-white font-inter' text='Add New +' />
          </div>
          <table className="shadow-lg">
            <thead>
              <tr>
                <th> Name</th>
                <th> Code</th>
                
                <th> Action</th>
              </tr>
            </thead>
            <tbody>
              {currencydata?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.name}</td>
                  <td>{item?.code}</td>
                  <td className="">
                    <div className="flex gap-[25px] items-center justify-center">
                      <span onClick={()=>handleEdit(item?.id)} className="text-PrimaryColor cursor-pointer">
                        <MdEdit />
                      </span>
                      <span onClick={()=>handleDel(item?.id)} className="text-[#d13838] cursor-pointer">
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
    </>
  )
}

export default AccountGrpTable;
