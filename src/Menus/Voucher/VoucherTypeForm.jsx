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
import { addVoucherType, editvouchertype } from '../../Redux/Slices/VoucherSlice';

const VouchertypeForm = () => {
  const id =uuidv4();

  const {setId,getId}= useLayouData();
  const [editMode,setEditMode]= useState(false)
  const [editData,seteditData]= useState('')
  const dispatch = useDispatch();
  const voucherTypedata = useSelector((state)=>state.voucher.voucherType)

  console.log(getId)
  useEffect(()=>
  {
    if(getId)
    {
      setEditMode(true)
    seteditData(voucherTypedata.find((item)=>item.id === getId))
    }   
    console.log(editData)
   
  },[setId])


  const initialValues = {
    vouchername: '',
    prefix: '',
    isSystemDefined: '',
    isEditable:'',
    
  };

  const validationSchema = Yup.object().shape({
    prefix: Yup.string().typeError('enter number').required('required'),
    vouchername: Yup.number().typeError('enter number').required('required'),
    isSystemDefined: Yup.boolean().required('required'),
    isEditable: Yup.boolean().required('required'),
  });


  const handleSubmit = (values) => {
   
    const VoucherTypeId = { ...values, id: id };
    console.log(VoucherTypeId)
   
    if(editMode)
    {
      console.log(getId)
      const editedId = {...values,id:getId}
      console.log(editedId)
      dispatch(editvouchertype(editedId))
    }
    else 
    {
      dispatch(addVoucherType(VoucherTypeId))
    }
    dispatch(addMenu({ id:'', menu:'vouchertype'}))
   
    setId('')
    // Perform form submission logic here
  };

  return (
    <>
      <div className='px-[50px]'>
        <div>
          <h2 className='font-inter font-semibold text-[30px]'>{editMode ? 'Update' : 'Add'} Voucher Type</h2>
        </div>

        <Formik
          initialValues={editMode ? editData : initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {(formik) => (
            <Form className='grid grid-cols-2 gap-[90px]'>
              <div className=''>
                <div className='py-[8px]'>
                  <label className='block py-[5px] font-[500] font-inter '>Name</label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                    type='text'
                    name='fullName'
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr' name='fullName' />
                </div>

                <div className='py-[8px]'>
                  <label className='block py-[5px] font-[500] font-inter '>Prefix</label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                    type='text'
                    name='code'
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr ' name='code' />
                </div>
                <div className="py-[6px]">
                                    <div role="group">
                                            <label className='block py-[8px] font-[500] font-inter '> Is Separate Voucher <span>*</span></label>
                                            <div>
                                                <label className=""> <input className='mx-[5px]' type="radio"  name="isSystemDefined"  checked={formik.values.isSystemDefined === true} value={true}
                                               onChange={() => formik.setFieldValue('isSystemDefined', true)} />Yes</label>
                                                <label className="ml-[10px]"><input className='mx-[5px]' type="radio" name="isSystemDefined" checked={formik.values.isSystemDefined === false} value={false}
                                                  onChange={() => formik.setFieldValue('isSystemDefined', false)} /> No</label>
                                            </div>
                                            <ErrorMessage component="div" className='text-[14px] text-redclr ' name="isSystemDefined" />
                                        </div>
                                    </div>
               
              

              
                            <div className="py-[6px]">
                                    <div role="group">
                                            <label className='block py-[8px] font-[500] font-inter '> Is Editable <span>*</span></label>
                                            <div>
                                                <label className=""> <input className='mx-[5px]' type="radio"  name="isEditable"  checked={formik.values.isEditable === true} value={true}
                                               onChange={() => formik.setFieldValue('isEditable', true)} />Yes</label>
                                                <label className="ml-[10px]"><input className='mx-[5px]' type="radio" name="isEditable" checked={formik.values.isEditable === false} value={false}
                                                  onChange={() => formik.setFieldValue('isEditable', false)} /> No</label>
                                            </div>
                                            <ErrorMessage component="div" className='text-[14px] text-redclr ' name="isEditable" />
                                        </div>
                                    </div>

                <div className=' mt-[40px] flex gap-[20px] justify-end'>
                <CancelButton onClick={()=>dispatch(addMenu({ id:'', menu:'vouchertype'}))} className=' border-[1px] border-redclr px-[15px] py-[4px] text-redclr font-inter' text='Cancel' type='button' />
                  <button  className='bg-PrimaryColor px-[15px] py-[4px] text-white font-inter' type='submit' > 
                  {editMode ? 'Update': 'Save'} </button>
                </div>
              </div>

            </Form>
          )}

        </Formik>
      </div>
    </>
  )
}

export default VouchertypeForm;
