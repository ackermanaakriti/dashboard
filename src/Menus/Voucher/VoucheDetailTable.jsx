import React, { useEffect } from 'react'
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import '../FiscalYearMenu/Fiscalyear.css'
import { useDispatch, useSelector } from 'react-redux';
import { removeFiscalYear ,editFiscalYear} from '../../Redux/Slices/FiscalYearSlice';
import { addMenu } from '../../Redux/TopTabSlice';
import { useLayouData } from '../../Context/MainLayoutContext';
import { GreenButton } from '../../Components/GreenButton';
import { TableButton } from '../../Components/GreenButton';
import { removeVoucherdetail } from '../../Redux/Slices/VoucherSlice';

const VoucherDetailTable = () => {
  const {setId} = useLayouData();
  const dispatch = useDispatch()
  const fiscaldata = useSelector((state) => state.voucherD.voucherDetail) 


 

  const handleDel =(index)=>
  {
    dispatch(removeVoucherdetail(index))
  }
  const handleEdit = (index) => {
    setId(index)
    dispatch(addMenu({ id:index, menu:'fiscalform'}))
  };

  return (
    <>
      <div className='px-[50px] pb-[50px]'>
        {/* <div>
          <h2 className='font-inter font-semibold text-[30px]'>
            Fiscal Year Table
          </h2>
        </div> */}
        <div>
          {/* <div className='mt-[20px]' onClick={()=>dispatch(addMenu({ id:'', menu:'fiscalform'}))}>
            <GreenButton className='bg-PrimaryColor px-[15px] py-[4px] text-white font-inter' text='Add New +' />
          </div> */}
          <table className="shadow-lg">
            <thead>
              <tr>
                <th> ChartofAccount</th>
                <th> Debit Amount</th>
                <th> Credit Amount</th>
                <th> Remarks</th>
                
                <th> Action</th>
              </tr>
            </thead>
            <tbody>
              {fiscaldata?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.chartOfAccountId}</td>
                  <td>{item?.debitAmount}</td>
                  <td>{item?.creditAmount}</td>
                  <td>{item?.Narration}</td>
                 
                  <td className="">
                    <div className="flex gap-[25px] items-center justify-center">
                      {/* <span onClick={()=>handleEdit(item?.id)} className="text-PrimaryColor cursor-pointer">
                        <MdEdit />
                      </span> */}
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

export default VoucherDetailTable;
