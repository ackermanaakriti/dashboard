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
import { removeVoucher } from '../../Redux/Slices/VoucherSlice';

const VoucherTable = () => {
  const {setId} = useLayouData();
  const dispatch = useDispatch()
  const voucherData = useSelector((state) => state.voucherData.voucher) 
console.log(voucherData)

 

  const handleDel =(index)=>
  {
    dispatch(removeVoucher(index))
  }
  const handleEdit = (index) => {
    setId(index)
    dispatch(addMenu({ id:index, menu:'voucherForm'}))
  };

  return (
    <>
      <div className='px-[50px]'>
        <div>
          <h2 className='font-inter font-semibold text-[30px]'>
            Voucher Table
          </h2>
        </div>
        <div>
          <div className='mt-[20px]' onClick={()=>dispatch(addMenu({ id:'', menu:'voucherForm'}))}>
            <GreenButton className='bg-PrimaryColor px-[15px] py-[4px] text-white font-inter' text='Add New +' />
          </div>
          <table className="shadow-lg">
            <thead>
              <tr>
                <th> Voucher Type</th>
                <th> Voucher Number</th>
                <th> Invoice Number</th>
                <th> Transaction Date</th>
                <th> Transaction Data Bs</th>
                <th> Action</th>
              </tr>
            </thead>
            <tbody>
              {/* {voucherData?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.VoucherTypeId}</td>
                  <td>{item?.voucherNumber}</td>
                  <td>{item?.InvoiceNumber}</td>
                  <td>{item?.TransactionDate}</td>
                  <td>{item?.TransactionDateBS}</td>
                
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
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default VoucherTable;
