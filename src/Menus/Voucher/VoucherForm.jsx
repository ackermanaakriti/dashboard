import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { CancelButton, GreenButton } from '../../Components/GreenButton';
import { useDispatch, useSelector } from 'react-redux';
import { addFiscalYear, editFiscalYear } from '../../Redux/Slices/FiscalYearSlice';
import { useLayouData } from '../../Context/MainLayoutContext';
import { addMenu } from '../../Redux/TopTabSlice';
import { v4 as uuidv4 } from 'uuid';
import { addVoucher, addVoucherType, editVoucher, editvouchertype } from '../../Redux/Slices/VoucherSlice';
import MainVoucherForm from './VoucherDetailForm';
import VoucherDetailTable from './VoucheDetailTable';
import VoucherDetailform from './VoucherDetailForm';

const Voucher = () => {
  const id =uuidv4();

  const {setId,getId, voucherId,setVoucherId}= useLayouData();
  const [editMode,setEditMode]= useState(false)
  const [editData,seteditData]= useState('')
  const dispatch = useDispatch();
  const voucherData = useSelector((state)=>state.voucherData.voucher)
  const voucherType = useSelector((state)=>state.voucherData.voucherType)


  useEffect(()=>
  {
    if(getId)
    {
      setEditMode(true)
    seteditData(voucherData.find((item)=>item.uid === getId))
    }   

    setVoucherId(id)
  },[setId])
  console.log(getId)


  const initialValues = {
    VoucherTypeId: '',
    voucherNumber: '',
    TransactionDate:'',
    TransactionDateBS:'',
    Narration:'',
    InvoiceNumber:''
  };
 

  const validationSchema = Yup.object().shape({
    // VoucherTypeId: Yup.string().typeError('').required('required'),
    voucherNumber: Yup.number().typeError('invalid data').required('required'),
    Narration: Yup.string().required('required'),
    InvoiceNumber: Yup.number().typeError('invalid data').required('required'),

   
  });


  const handleSubmit = (values) => {
    const VoucherDataId = { ...values, uid:voucherId };
    console.log(values)
    
    if(editMode)
    {
      const editedId = {...values,uid:getId}
      dispatch(editVoucher(editedId))
    }
    else 
    {
      dispatch(addVoucher(VoucherDataId))
    }
    dispatch(addMenu({ id:'', menu:'voucher'}))
   
    setId('')
    // Perform form submission logic here
  };

  return (
    <>
      <div className='px-[50px] pb-[120px]'>
        <div>
          {/* <h2 className='font-inter font-semibold text-[30px] text-center'>{editMode ? 'Update' : 'Add'} Voucher </h2> */}
          <h4 className='text-[18px] font-semibold text-center my-[10px]'>Voucher </h4>
        </div>

        <Formik
          initialValues={editMode ? editData : initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {(formik) => (
            <Form className='bg-[#e8fcfc] pb-[10px]'>
              <div className=' w-[70%] flex flex-col justify-center m-auto' >
                <div className='grid grid-cols-3 gap-[10px]'>
                <div className='py-[8px]'>
                  <label className='block py-[5px] font-[500] font-inter '>Voucher Type</label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                    type='text'
                    name='VoucherTypeId'
                    as='select'
                  
                  >
                    <option disabled selected value=''>  Select Voucher Type</option>
                    {voucherType?.map((item,index)=>(
                    <option value={item?.vouchername}>{item?.vouchername}</option>
                    ))}
                   

                  </Field>
                  <ErrorMessage component='div' className='text-[14px] text-redclr' name='VoucherTypeId' />
                </div>

                <div className='py-[8px]'>
                  <label className='block py-[5px] font-[500] font-inter '>Voucher Number</label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                    type='text'
                    name='voucherNumber'
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr ' name='voucherNumber' />
                </div>

                
                <div className='py-[8px]'>
                  <label className='block py-[5px] font-[500] font-inter '>Invoice Number</label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                    type='text'
                    name='InvoiceNumber'
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr ' name='InvoiceNumber' />
                </div>
                </div>


                <div className='grid grid-cols-3 gap-[20px] items-center'>
                  <div className='py-[8px]'>
                    <label className='block py-[8px] font-[500] font-inter '> Date AD</label>
                    <Field
                      className='border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr '
                      name='TransactionDate'
                      type='date'
                    />
                    {/* <ErrorMessage component='div' className='text-[14px] text-redclr ' name='TransactionDate' /> */}
                  </div>
                  <div className='py-[8px]'>
                    <label className='block py-[8px] font-[500] font-inter '> Date BS</label>
                    <Field
                      className='border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr '
                      name='TransactionDateBS'
                      type='date'
                    />
                    {/* <ErrorMessage component='div' className='text-[14px] text-redclr ' name='TransactionDateBS' /> */}
                  </div>
                  <div className='py-[8px]'>
                  <label className='block py-[8px] font-[500] font-inter '>Narration</label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                    type='text'
                    name='Narration'
                   
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr' name='Narration' />
                </div>
                </div>

              </div>
              <div className=' mt-[10px] flex gap-[20px] justify-end  absolute right-[2em] bottom-[70px]'>
     <CancelButton onClick={() => { dispatch(addMenu({ id:'', menu:'voucher'}));
     }} className='border-[1px] border-redclr px-[15px] py-[4px] text-redclr font-inter' text='Cancel' type='button' />
                  <button   className='bg-PrimaryColor px-[15px] py-[4px] text-white font-inter' type='submit' > 
                  {editMode ? 'Update': 'Save'} </button>
                </div>

            </Form>
          )}

        </Formik>
        <div className='relative'>
        <VoucherDetailform/>
        <VoucherDetailTable/>
   

        </div>
 </div>
    </>
  )
}

export default Voucher;
