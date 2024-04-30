import React, { useEffect } from 'react'
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import './Fiscalyear.css'
import { useDispatch, useSelector } from 'react-redux';
import { removeFiscalYear ,editFiscalYear} from '../../Redux/Slices/FiscalYearSlice';
import { addMenu } from '../../Redux/TopTabSlice';
import { useLayouData } from '../../Context/MainLayoutContext';
import { GreenButton } from '../../Components/GreenButton';
import { TableButton } from '../../Components/GreenButton';
import useGetData from '../../Apis/useGetData';
import useDelData from '../../Apis/useDelData';

const FiscalYearTable = () => {
  const {setId} = useLayouData();
  const dispatch = useDispatch()
  const fiscaldata = useSelector((state) => state.fiscalyear) 
  const {data}= useGetData('FiscalYear/GetAll')
  const {Deldata} = useDelData('FiscalYear/Delete/')


 

  const handleDel =(id)=>
  {
    Deldata(id)
  }
  const handleEdit = (index) => {
    setId(index)
    dispatch(addMenu({ id:index, menu:'fiscalform'}))
  };

  return (
    <>
      <div className='px-[50px]'>
        <div>
          <h2 className='font-inter font-semibold text-[30px]'>
            Fiscal Year Table
          </h2>
        </div>
        <div>
          <div className='mt-[20px]' onClick={()=>dispatch(addMenu({ id:'', menu:'fiscalform'}))}>
            <GreenButton className='bg-PrimaryColor px-[15px] py-[4px] text-white font-inter' text='Add New +' />
          </div>
          <div className="table--wrapper h-[800px] overflow-y-auto">
          <table className="shadow-lg">
            <thead>
              <tr>
                <th> Fiscal Year</th>
                <th> Code</th>
                <th> Start Date</th>
                <th> End Date</th>
                <th> Active</th>
                <th> Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.name}</td>
                  <td>{item?.code}</td>
                  <td>{item?.startDate}</td>
                  <td>{item?.endDate}</td>
                  <td>
                    {item?.isActive ? (<TableButton className='bg-PrimaryColor rounded-[20px] px-[12px] py-[5px] text-white' text='Yes'/>)
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
      </div>
    </>
  )
}

export default FiscalYearTable;
