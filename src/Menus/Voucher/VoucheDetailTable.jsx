
import React, { useEffect, useState } from 'react'
import { RiDeleteBin5Fill } from "react-icons/ri";
import '../FiscalYearMenu/Fiscalyear.css'
import { useDispatch, useSelector } from 'react-redux';
import { useLayouData } from '../../Context/MainLayoutContext';
import useDelData from '../../Apis/useDelData';


const VoucherDetailTable = ({dataByid,editData}) => {
  const { setId, getId, } = useLayouData();
  const dispatch = useDispatch();
  const voucherDetail = useSelector((state) => state.voucherData?.voucherDetail);
  const [voucherDetaildata,setvoucherDetaildata] = useState([])
  const {Deldata} = useDelData('VoucherDetail/Delete/')
  const {data,fetchData} = useDelData('VoucherDetail/GetAll')



useEffect(()=>
{
  if(dataByid || editData )
  {
    setvoucherDetaildata(dataByid?.voucherDetailDTOs)
    if(editData)
    {
      setvoucherDetaildata([...voucherDetail,...editData])

    }
  
  }
 },
[getId,editData,dataByid])



const handleDel = (id) => {
  console.log('hello')
  Deldata(id)

//  const updateddata = voucherDetaildata.filter(item=>item.id !== id);

//  setvoucherDetaildata(updateddata)
//  console.log(updateddata)
};
 


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
                  <td>{item?.chartOfAccountId}</td>
                  <td>{item?.debitAmount}</td>
                  <td>{item?.creditAmount}</td>
                  <td>{item?.narration}</td>
                  <td className=''>
                    <div className='flex gap-[25px] items-center justify-center'>
                      {/* <span onClick={()=>handleEdit(item.id)} className="text-PrimaryColor cursor-pointer">
                        <MdEdit />
                      </span> */}
                      <span onClick={() => handleDel(item?.id)} className='text-[#d13838] cursor-pointer'>
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
