import React, { useEffect, useState,useCallback } from 'react';
import { RiDeleteBin5Fill } from "react-icons/ri";
import '../FiscalYearMenu/Fiscalyear.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLayouData } from '../../Context/MainLayoutContext';
import useGetData from '../../Apis/useGetData';
import { baseUrl } from '../../Apis/Baseurl';
import axios from 'axios';


const VoucherDetailTable = ({ dataByid, editData, detaildata,dataforvoucherDetailtable,setDataforvoucherDetailtable, editMode, setdebCredAmount }) => {

  const [voucherDetaildata, setVoucherDetaildata] = useState([]);
  // const { Deldata } = useDelData('VoucherDetail/Delete/');
  const { data, fetchData,Deldata } = useGetData( `VoucherDetail/GetAll/IsDeleted=${true}`,'VoucherDetail/Delete/');
 const [creditsum,setCreditsum]= useState('');
const [debitSum,setDebitSum]= useState('')
 const {token} = useLayouData()
 console.log(detaildata,dataforvoucherDetailtable)

  useEffect(() => {
    setdebCredAmount(false);
  
    if (editMode) {
      setVoucherDetaildata(dataByid?.voucherDetailDTOs);  //yo chai children get gareko from voucher 
      if (editData.length > 0) {
        setVoucherDetaildata(prevData => [...prevData, ...editData]); //edit garda feri data add garyo bhaney locally to children ma data add garne
      }
    } else {
      setVoucherDetaildata(dataforvoucherDetailtable); // edit mode xaina bhane voucherdetail data ma detaildata rakhne
    }
  }, [editMode, dataByid, detaildata, editData,dataforvoucherDetailtable, setdebCredAmount]);

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
  

  const handleDel = (id, voucherId) => {
    if (editMode) {
      console.log(editData,editMode)
      if(editMode && editData.length === 0)
        {
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
             
            } catch (err) {
              console.log(err);
            }
        }
      
        if(editData.length > 0)
          {
            console.log(voucherDetaildata)
            setVoucherDetaildata((prevData) => prevData.filter(item => item.id !== id));
           
          }
    
    }

    
    
    else {
      console.log('bye')
      console.log(voucherDetaildata,voucherId)
      const indexToRemove = voucherDetaildata.findIndex(item => item.voucherId === voucherId);
      if (indexToRemove !== -1) {
            dataforvoucherDetailtable.splice(indexToRemove, 1);
            setDataforvoucherDetailtable([...dataforvoucherDetailtable]); // Update state or re-render if needed
        }
      const updateddata = dataforvoucherDetailtable.filter(item => item.voucherId !== voucherId);
      setDataforvoucherDetailtable(updateddata)
      console.log(dataforvoucherDetailtable)
      setVoucherDetaildata(updateddata)
      

     console.log(voucherDetaildata)
     console.log(dataforvoucherDetailtable)
    }
  };

  return (
    <>
      <div className='px-[50px] pb-[50px] '>
        <table className='shadow-lg voucherDetailTable'>
          <thead className='bg-tblbg '>
            <tr className='px-[10px] py-[5px]'>
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
                    <span onClick={() => handleDel(item?.id, item?.voucherId)} className='text-[#d13838] cursor-pointer'>
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
