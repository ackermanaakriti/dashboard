
import React, { useEffect, useState } from 'react'
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
  const { setId, getId, voucherId, setVoucherId } = useLayouData();
  const dispatch = useDispatch();
  const fiscaldata = useSelector((state) => state.voucherD.voucherDetail);
  const [voucherDetaildata,setvoucherDetaildata] = useState([])

  const handleDel = (index) => {
    dispatch(removeVoucherdetail(index));
  };
  console.log(getId)
  console.log(fiscaldata)
  
useEffect(()=>
{
   if(getId)
  {
   setvoucherDetaildata(fiscaldata?.filter(item=> item.uid === getId))
  }
  else 
  {
    setvoucherDetaildata(fiscaldata?.filter(item=> item.uid === voucherId))

  }
},[getId,voucherId,fiscaldata])
 


  return (
    <>
      <div className='px-[50px] pb-[50px]'>
        <table className='shadow-lg'>
          <thead>
            <tr>
              <th>ChartofAccount</th>
              <th>Debit Amount</th>
              <th>Credit Amount</th>
              <th>Remarks</th>
              <th>Action</th>
            </tr>
          </thead>
          
            <tbody>
              
              {voucherDetaildata?.map((item, index) => (
                <tr key={index}>
                  <td>{item.chartOfAccountId}</td>
                  <td>{item.debitAmount}</td>
                  <td>{item.creditAmount}</td>
                  <td>{item.Narration}</td>
                  <td className=''>
                    <div className='flex gap-[25px] items-center justify-center'>
                      {/* <span onClick={()=>handleEdit(item.id)} className="text-PrimaryColor cursor-pointer">
                        <MdEdit />
                      </span> */}
                      <span onClick={() => handleDel(item.id)} className='text-[#d13838] cursor-pointer'>
                        <RiDeleteBin5Fill />
                      </span>
                    </div>
                  </td>
                </tr>
              )) }
              
            </tbody>
          
        </table>
      </div>
    </>
  );
};

export default VoucherDetailTable;
