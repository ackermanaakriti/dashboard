import React, { useEffect } from 'react'
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import '../FiscalYearMenu/Fiscalyear.css'
import { useDispatch, useSelector } from 'react-redux';
import { removeFiscalYear ,editFiscalYear} from '../../Redux/Slices/FiscalYearSlice';
import { addMenu } from '../../Redux/TopTabSlice';
import { useLayouData } from '../../Context/MainLayoutContext';
import { GreenButton, TableButton } from '../../Components/GreenButton';
import { removeCurrency } from '../../Redux/Slices/CurrencySlice';
import { removeCharofAcc } from '../../Redux/Slices/CharofAccSlice';
import useGetData from '../../Apis/useGetData';
import useDelData from '../../Apis/useDelData';

const ChartofAccTable = () => {
  const {setId,getId} = useLayouData();
  const dispatch = useDispatch()
  const {data}= useGetData('ChartOfAccount/GetAll')
  const {Deldata}= useDelData('ChartOfAccount/Delete/')


  const handleDel = async(id)=>
  {
    const response = await Deldata(id);

    
  }
  const handleEdit = (id) => {
    setId(id)
    dispatch(addMenu({ id:id, menu:'chartofaccForm'}))
  };

  return (
    <>
      <div className='px-[50px]'>
        <div>
          <h2 className='font-inter font-semibold text-[30px]'>
      Chart of Account Table
          </h2>
        </div>
        <div>
          <div className='mt-[20px]' onClick={()=>dispatch(addMenu({ id:'', menu:'chartofaccForm'}))}>
            <GreenButton className='bg-PrimaryColor px-[15px] py-[4px] text-white font-inter' text='Add New +' />
          </div>
          <div className="table--wrapper h-[500px] overflow-y-auto">
          <table className="shadow-lg">
            <thead>
              <tr>
                <th> Name</th>
                <th> Code</th>
                <th>  Account Group</th>
                <th>Main Parent</th>
                <th> Parent</th>
                <th> Active</th>
                <th> Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.accountName}</td>
                  <td>{item?.accountCode}</td>
                  <td>{item?.accountGroupId}</td>
                  <td>{item?.mainParentId}</td>
                  <td>{item?.parentAccountId}</td>
                  {/* <td>
                    {item?.isActive ? (<TableButton className='bg-PrimaryColor rounded-[20px] px-[12px] py-[5px] text-white' text='Yes'/>)
                    : (<TableButton className='bg-[#378f80] rounded-[20px] px-[12px] py-[5px] text-white' text='No'/>)}
                    </td> */}

                    <td><TableButton className={item.isActive? `bg-PrimaryColor rounded-[20px] px-[12px] py-[5px] text-white` : `bg-[#378f80] rounded-[20px] px-[12px] py-[5px] text-white`} text={item.isActive ? 'yes' : 'No'}/> </td>
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

export default ChartofAccTable;
