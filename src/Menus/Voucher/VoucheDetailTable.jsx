import React, { useEffect, useState,useCallback } from 'react';
import { RiDeleteBin5Fill } from "react-icons/ri";
import '../FiscalYearMenu/Fiscalyear.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLayouData } from '../../Context/MainLayoutContext';
import useGetData from '../../Apis/useGetData';


const VoucherDetailTable = ({ dataByid, editData, detaildata, editMode, setdebCredAmount }) => {
  const { setId, getId } = useLayouData();
  const dispatch = useDispatch();
  const voucherDetail = useSelector((state) => state.voucherData?.voucherDetail);
  const [voucherDetaildata, setVoucherDetaildata] = useState([]);
  // const { Deldata } = useDelData('VoucherDetail/Delete/');
  const { data, fetchData,Deldata } = useGetData(`VoucherDetail/GetAll/IsDeleted=${true}`);
 

  useEffect(() => {
    setdebCredAmount(false);
  
    if (editMode) {
      setVoucherDetaildata(dataByid?.voucherDetailDTOs);
      if (editData.length > 0) {
        setVoucherDetaildata(prevData => [...prevData, ...editData]);
      }
    } else {
      setVoucherDetaildata(detaildata);
    }
  }, [editMode, dataByid, detaildata, editData, setdebCredAmount]);

  useEffect(() => {
    calculateSumEquality(voucherDetaildata);
  }, [voucherDetaildata]);

  // const calculateSumEquality = (data) => {
  //   // if (!data || data.length === 0) {
  //   //   setIsSumEqual(false); // Handle case when data is undefined or empty
  //   //   return console.log('hello err');
  //   // }
  
  //   const debitSum = data?.reduce((total, item) => total + (item.debitAmount || 0), 0);
  //   const creditSum = data?.reduce((total, item) => total + (item.creditAmount || 0), 0);
  //   console.log(debitSum);
  //   console.log(creditSum)
  //   if(debitSum === creditSum)
  //     {
  //       setIsSumEqual(true);
  //       console.log('hello')
  //     }
   
    
  // };
  const calculateSumEquality = useCallback((data) => {
    const debitSum = data?.reduce((total, item) => total + (item.debitAmount || 0), 0);
    const creditSum = data?.reduce((total, item) => total + (item.creditAmount || 0), 0);
    console.log(debitSum)
    console.log(creditSum)
    if(debitSum === creditSum)
      {
        setdebCredAmount(true)
      }

    
  }, []);
  

  const handleDel = (id, name) => {
    if (dataByid && editData) {
      Deldata(id);
    } else {
      const updateddata = voucherDetaildata.filter(item => item.chartOfAccountName !== name);
      console.log(updateddata)
      setVoucherDetaildata(updateddata);
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
            {voucherDetaildata?.map((item, index) => (
              <tr key={index}>
                <td>{item?.chartOfAccountAccountName}</td>
                <td>{item?.debitAmount}</td>
                <td>{item?.creditAmount}</td>
                <td>{item?.narration}</td>
                <td>
                  <div className='flex gap-[25px] items-center justify-center'>
                    <span onClick={() => handleDel(item?.id, item?.chartOfAccountName)} className='text-[#d13838] cursor-pointer'>
                      <RiDeleteBin5Fill />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default VoucherDetailTable;
