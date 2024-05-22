import React, { useEffect, useState,useCallback } from 'react';
import { RiDeleteBin5Fill } from "react-icons/ri";
import '../FiscalYearMenu/Fiscalyear.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLayouData } from '../../Context/MainLayoutContext';
import useGetData from '../../Apis/useGetData';
import { baseUrl } from '../../Apis/Baseurl';
import axios from 'axios';


const VoucherDetailTable = ({ dataByid, editData, detaildata, editMode, setdebCredAmount }) => {

  const [voucherDetaildata, setVoucherDetaildata] = useState([]);
  // const { Deldata } = useDelData('VoucherDetail/Delete/');
  const { data, fetchData,Deldata } = useGetData( `VoucherDetail/GetAll/IsDeleted=${true}`,'VoucherDetail/Delete/');
 const [creditsum,setCreditsum]= useState('');
const [debitSum,setDebitSum]= useState('')
 const {token} = useLayouData()

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

  const calculateSumEquality = useCallback((data) => {
    const debitSum = data?.reduce((total, item) => total + (item.debitAmount || 0), 0);
    setDebitSum(debitSum)
    const creditSum = data?.reduce((total, item) => total + (item.creditAmount || 0), 0);
    setCreditsum(creditSum)
    console.log(debitSum)
    console.log(creditSum)
    if(debitSum === creditSum)
      {
        setdebCredAmount(true)
      }

    
  }, []);
  

  const handleDel = (id, name) => {
    if (editMode) {
      console.log('hello')
      try {
        const response =   axios.post(
            `${baseUrl}VoucherDetail/Delete/${id}`,
            null, // Pass null as the data parameter since it's not needed
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          // Update the local state to remove the deleted item
          setVoucherDetaildata((prevData) => prevData.filter(item => item.id !== id));
          console.log(response)
        } catch (err) {
          console.log(err);
        }
      
    
    } else {
      console.log('bye')
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
            <tr>
              <th>Total</th>
              <td>{debitSum}</td>
              <td>{creditsum}</td>
              <td colSpan={'2'}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default VoucherDetailTable;
