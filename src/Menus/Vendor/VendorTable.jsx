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
import useGetData from '../../Apis/useGetData';
import useDelData from '../../Apis/useDelData';

const VendorTable = () => {
  const {setId} = useLayouData();
  const dispatch = useDispatch()
  const fiscaldata = useSelector((state) => state.fiscalyear) 
  const {data}= useGetData('Vendor/GetAll')
  const {Deldata} = useDelData('Vendor/Delete/')


 

  const handleDel = async(id)=>
  {
     await Deldata(id)
  }
  const handleEdit = (index) => {
    setId(index)
    dispatch(addMenu({ id:index, menu:'vendorForm'}))
  };

  return (
    <>
      <div className='px-[50px]'>
        <div>
          <h2 className='font-inter font-semibold text-[30px]'>
            Vendor Table
          </h2>
        </div>
        <div>
          <div className='mt-[20px]' onClick={()=>dispatch(addMenu({ id:'', menu:'vendorForm'}))}>
            <GreenButton className='bg-PrimaryColor px-[15px] py-[4px] text-white font-inter' text='Add New +' />
          </div>
          <div className="table--wrapper h-[800px] overflow-y-auto">
          <table className="shadow-lg">
            <thead>
              <tr>
                <th> Name</th>
                <th> ChartofAccount</th>
                <th> Company Name</th>
                
                <th> Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.name}</td>
                  <td>{item?.chartOfAccountId}</td>
                  <td>{item?.companyName}</td>
                
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

export default VendorTable;
