import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup'; import Voucher from './VoucherForm'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useLayouData } from '../../Context/MainLayoutContext';
import { addVoucherDetail } from '../../Redux/Slices/VoucherSlice';
import { addVoucher, addVoucherType, editvouchertype } from '../../Redux/Slices/VoucherSlice';
import { addMenu } from '../../Redux/TopTabSlice';
import { IoMdAddCircleOutline } from "react-icons/io";
import VoucherDetailTable from './VoucheDetailTable';







const VoucherDetailform = () => {
  const chartofAccData = useSelector((state) => state.charofacc)
  const id = uuidv4();

  const { setId, getId } = useLayouData();
  const [editMode, setEditMode] = useState(false)
  const [editData, seteditData] = useState('')
  const [isamount,setisAmount]= useState(false);
  const [amount,setAmount]= useState('');
  const [charofa,setcharofa]= useState('hello')
  const dispatch = useDispatch();
  const initialValues = {
    chartOfAccountId: '',
    debitAmount: isamount ? amount : '0', 
    creditAmount: isamount ? '0' : amount, 
    chequeNumber: '',
    Narration: '',
    isActive:false
  };
  console.log(charofa)

  const handleValue =(e)=>
  {
           const {name,value}= e.target;
           console.log(name)
  }

  

  const handleSubmit = (values, { resetForm }) => {
    console.log(values)
    const VoucherDataId = { ...values, id: id };
    if (editMode) {
      const editedId = { ...values, id: getId }
      console.log(editedId)
      dispatch(editvouchertype(editedId))
    }
    else {
      dispatch(addVoucherDetail(VoucherDataId))
      resetForm();
      setAmount('')
    }
    //    dispatch(addMenu({ id:'', menu:'vouchertype'}))

    setId('')
    // Perform form submission logic here
  };
  return (
    <>
      <div className=' '>

        <div className='h-[1px] bg-[#b5b6b5] mt-[50px]'></div>
        <div className='pt-[20px]'>
          <h4 className='text-[18px] font-semibold text-center my-[10px]'>Voucher Detail</h4>
        </div>
        <Formik
          initialValues={editMode ? editData : initialValues}
          //   validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
          enableReinitialize={true}
        >
          {(formik) => (
            <Form className='pt-[30px]'>
              <div className=' w-[70%] flex flex-col justify-center m-auto' >
                <div className='grid grid-cols-4 gap-[20px]'>
                  <div className='py-[8px]'>
                    <label className='block py-[5px] font-[500] font-inter '>ChartofAccount</label>
                    <Field
                      className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                      type='text'
                      name='chartOfAccountId'
                      as='select'
                      onChange={handleValue}
                    >
                      <option disabled selected value=''>Select ChartofAccount</option>
                      {chartofAccData?.map((item, index) =>
                      (
                        <option  key={index} name='chartOfAccountId' value={item?.accountName}>{item?.accountName}</option>
                      ))}
                    </Field>
                    <ErrorMessage component='div' className='text-[14px] text-redclr' name='chartOfAccountId' />
                  </div>
                  <div className="py-[8px]">
                    <div role="group">
                      <label className='block py-[8px] font-[500] font-inter '> Amount <span>*</span></label>
                      <div>
                        <label className=""> <input className='mx-[5px]' type="radio" name="isActive"  value={true}
                          onChange={handleValue}/>Debit</label>
                        <label className="ml-[10px]"><input className='ml-[30px]' type="radio" name="isActive"  value={false}
                          onChange={handleValue} /> Credit</label>
                      </div>
                      <ErrorMessage component="div" className='text-[14px] text-redclr ' name="isAllBranchApplicable" />
                    </div>
                  </div>

                  <div className='py-[8px]'>
                    <label className='block py-[5px] font-[500] font-inter '> Amount</label>
                    <Field
                      className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                      type='number'
                      name='Amount'
                      onChange={handleValue}
                       value={amount}
                    />
                    <ErrorMessage component='div' className='text-[14px] text-redclr ' name='Amount' />
                  </div>

                  <div className='py-[8px]'>
                    <label className='block py-[5px] font-[500] font-inter '>Cheque Number</label>
                    <Field
                      className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                      type='text'
                      name='chequeNumber'
                      onChange={handleValue}
                    />
                    <ErrorMessage component='div' className='text-[14px] text-redclr ' name='chequeNumber' />
                  </div>
                </div>




                <div className='py-[8px] grid grid-cols-7 '>
                  <div className='col-span-6'>
                    <label className='block py-[5px] font-[500] font-inter '>Remarks</label>
                    <Field
                      className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none  border-borderclr '
                      type='text'
                      name='Narration'
                      as='textarea'
                      onChange={handleValue}
                    />
                    <ErrorMessage component='div' className='text-[14px] text-redclr' name='Narration' />
                  </div>
                  <div className='col-span-1 flex justify-center items-center'>
                    <button type='submit' className='text-[40px] text-PrimaryColor cursor-pointer'><IoMdAddCircleOutline /></button>
                  </div>
                </div>









              </div>

            </Form>
          )}

        </Formik>

      </div>

    </>
  )
}

export default VoucherDetailform
