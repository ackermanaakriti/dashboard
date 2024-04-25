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
  const id =uuidv4();


  const { setId, getId,voucherId,setVoucherId } = useLayouData();
  const [editMode, setEditMode] = useState(false)
  const [editData, seteditData] = useState('')
  const [isamount,setisAmount]= useState(false);
  const dispatch = useDispatch();
 

  const initialValues = {
    chartOfAccountId: '',
    debitAmount: '', 
    creditAmount: '', 
    chequeNumber: '',
    Narration: '',
    Amount:''
  };

  
  const validationSchema = Yup.object().shape({
    chartOfAccountId: Yup.string().required('required'),
    // debitAmount: Yup.number().typeError('enter number').required('required'),
    // creditAmount: Yup.number().required('required'),
    Narration: Yup.string().required('required'),
    Amount: Yup.number().required('required'),
    // isAmount : Yup.boolean().required('required'),
    chequeNumber: Yup.number().required('required')

  });

  

  

  const handleSubmit = (values, { resetForm }) => {
   
    const VoucherDataId = { ...values ,debitAmount:isamount ? values.Amount : '0', id:id,  creditAmount: isamount ? '0' : values.Amount,uid:getId ? getId : voucherId};
   console.log(VoucherDataId)
      dispatch(addVoucherDetail(VoucherDataId))
      resetForm()

  };
  return (
    <>
      <div className=' '>

     
        {/* <div className='pt-[20px]'>
          <h4 className='text-[18px] font-semibold text-center my-[10px]'>Voucher Detail</h4>
        </div> */}
        <Formik
          initialValues={editMode ? editData : initialValues}
            validationSchema={validationSchema}
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
                    >
                      <option disabled selected value=''>Select ChartofAccount</option>
                      {chartofAccData?.map((item, index) =>
                      (
                        <option key={index} name='chartOfAccountId' value={item?.accountName}>{item?.accountName}</option>
                      ))}
                    </Field>
                    <ErrorMessage component='div' className='text-[14px] text-redclr' name='chartOfAccountId' />
                  </div>
                  <div className="py-[8px]">
                    <div role="group">
                      <label className='block py-[8px] font-[500] font-inter '> Amount <span>*</span></label>
                      <div>
                        <label className=""> <input className='mx-[5px]' type="radio" name="isAmount"  value={true}
                          onChange={() => setisAmount(true)} />Debit</label>
                        <label className="ml-[10px]"><input className='ml-[30px]' type="radio" name="isAmount"  value={false}
                          onChange={() => setisAmount(false)} /> Credit</label>
                      </div>
                      <ErrorMessage component="div" className='text-[14px] text-redclr ' name="isAmount" />
                    </div>
                  </div>

                  <div className='py-[8px]'>
                    <label className='block py-[5px] font-[500] font-inter '> Amount</label>
                    <Field
                      className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                      type='number'
                      name='Amount'
                      //  onChange={(e)=>setAmount(e.target.value)}
                      //  value={amount}
                    />
                    <ErrorMessage component='div' className='text-[14px] text-redclr ' name='Amount' />
                  </div>

                  <div className='py-[8px]'>
                    <label className='block py-[5px] font-[500] font-inter '>Cheque Number</label>
                    <Field
                      className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                      type='text'
                      name='chequeNumber'
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
                     
                    />
                    <ErrorMessage component='div' className='text-[14px] text-redclr' name='Narration' />
                  </div>
                  <div className='col-span-1 flex justify-center items-center'>
                    <button type='submit' className='text-[40px] text-PrimaryColor cursor-pointer pt-[15px]'><IoMdAddCircleOutline /></button>
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
