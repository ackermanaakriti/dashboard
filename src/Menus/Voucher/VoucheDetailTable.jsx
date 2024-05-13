
import React, { useEffect, useState } from 'react'
import { RiDeleteBin5Fill } from "react-icons/ri";
import '../FiscalYearMenu/Fiscalyear.css'
import { useDispatch, useSelector } from 'react-redux';
import { useLayouData } from '../../Context/MainLayoutContext';
import useDelData from '../../Apis/useDelData';


const VoucherDetailTable = ({dataByid,editData,detaildata,editMode}) => {
  const { setId, getId, } = useLayouData();
  const dispatch = useDispatch();
  const voucherDetail = useSelector((state) => state.voucherData?.voucherDetail);
  const [voucherDetaildata,setvoucherDetaildata] = useState([])
  const {Deldata} = useDelData('VoucherDetail/Delete/')
  const {data,fetchData} = useDelData(`VoucherDetail/GetAll/IsDeleted=${true}`)
  const [dataFetchedById,setDatafetchedByid]= useState([])


console.log(editData)
useEffect(()=>
{

console.log('useEffect')
  if(editMode)
  {
    console.log('edit data')
    setDatafetchedByid(dataByid?.voucherDetailDTOs)
    console.log(dataFetchedById)
    console.log(dataByid)
    if(editData.length>0)
      {
        setDatafetchedByid([...dataFetchedById,...editData])
        console.log(dataFetchedById)
      }
  }
   
    else {
      setvoucherDetaildata(detaildata);
    }

 },
[voucherDetaildata,dataByid,editData])

const handleDel = (id,name) => {
  if(dataByid && editData)
    {
      Deldata(id)
      console.log('hello')
    }
    else 
    {
      console.log(voucherDetaildata)
 const updateddata = voucherDetaildata.filter(item=>item.chartOfAccountName!== name);
 setvoucherDetaildata(updateddata)
 console.log(updateddata)
    }
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
             
             
              { dataFetchedById?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.chartOfAccountAccountName}</td>
                  <td>{item?.debitAmount}</td>
                  <td>{item?.creditAmount}</td>
                  <td>{item?.narration}</td>
                  <td className=''>
                    <div className='flex gap-[25px] items-center justify-center'>
                      {/* <span onClick={()=>handleEdit(item.id)} className="text-PrimaryColor cursor-pointer">
                        <MdEdit />
                      </span> */}
                      <span onClick={() => handleDel(item?.id,item?.chartOfAccountName)} className='text-[#d13838] cursor-pointer'>
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
