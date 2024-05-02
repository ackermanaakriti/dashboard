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
import { TableButton } from '../../Components/GreenButton';
import { removeVoucherType } from '../../Redux/Slices/VoucherSlice';
import useGetData from '../../Apis/useGetData';
import useDelData from '../../Apis/useDelData';
import { baseUrl } from '../../Apis/Baseurl';
import axios from 'axios';

const VoucherTypeTable = () => {
  const {setId} = useLayouData();
  const dispatch = useDispatch()
  const {data}= useGetData('VoucherType/GetAll')
  console.log(data)
  const {Deldata}= useDelData('VoucherType/Delete/')


 

  const handleDel =(id)=>
  {
   Deldata(id)
  }
  const handleEdit = (id) => {
    setId(id)
    dispatch(addMenu({ id:id, menu:'vouchertypeform'}))
  };

  return (
    <>
      <div className='px-[50px]'>
        <div >
          <h2 className='font-inter font-semibold text-[30px]'>
           Voucher Type Table
          </h2>
        </div>
        <div>
          <div className='mt-[20px] flex justify-end' onClick={()=>dispatch(addMenu({ id:'', menu:'vouchertypeform'}))}>
            <GreenButton className='bg-PrimaryColor px-[15px] py-[4px] text-white font-inter' text='Add New +' />
          </div>
          <table className="shadow-lg">
            <thead>
              <tr>
                <th> Name</th>
                <th> Prefix</th>
                <th>Editable</th>
                <th>   System Define</th>
                <th>   Action</th>
               
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.name}</td>
                  <td>{item?.prefix}</td>
                  <td>
                    {item?.isEditable ? (<TableButton className='bg-PrimaryColor rounded-[20px] px-[12px] py-[5px] text-white' text='Yes'/>)
                    : (<TableButton className='bg-[#378f80] rounded-[20px] px-[12px] py-[5px] text-white' text='No'/>)}
                    </td>
                  <td>
                    {item?.isSystemDefined ? (<TableButton className='bg-PrimaryColor rounded-[20px] px-[12px] py-[5px] text-white' text='Yes'/>)
                    : (<TableButton className='bg-[#378f80] rounded-[20px] px-[12px] py-[5px] text-white' text='No'/>)}
                    </td>
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

export default VoucherTypeTable;
