import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { CancelButton, GreenButton } from '../../Components/GreenButton';
import { useDispatch, useSelector } from 'react-redux';
import { useLayouData } from '../../Context/MainLayoutContext';
import { addMenu } from '../../Redux/TopTabSlice';
import { v4 as uuidv4 } from 'uuid';
import { addCurrency, editCurrency } from '../../Redux/Slices/CurrencySlice';

const CurrencyForm = () => {
  const id =uuidv4();

  const {setId,getId}= useLayouData();
  const [editMode,setEditMode]= useState(false)
  const [editData,seteditData]= useState('')
  const dispatch = useDispatch();
  const currency = useSelector((state)=>state.currency)

  console.log(getId)
  useEffect(()=>
  {
    if(getId)
    {
      setEditMode(true)
    seteditData(currency.find((item)=>item.id === getId))
    }   
    console.log(editData)
   
  },[setId])


  const initialValues = {
    name: '',
    country: '',
    symbol: '',
    currentExchangeRate: '',
    syPlacement: '' ,
    isLocal: ''
  };

  const validationSchema = Yup.object().shape({
    symbol: Yup.number().typeError('enter number').required('required'),
    currentExchangeRate: Yup.number().typeError('enter number').required('required'),
    name: Yup.string().required('required'),
    country: Yup.string().required('required'),
    syPlacement: Yup.string().required('required'),
  });


  const handleSubmit = (values) => {
   
    const currencyId = { ...values, id: id };
    console.log(currencyId)
   
    if(editMode)
    {
      console.log(getId)
      const editedId = {...values,id:getId}
      console.log(editedId)
      dispatch(editCurrency(editedId))
    }
    else 
    {
      dispatch(addCurrency(currencyId))
    }
    addMenu({ id: "", menu: "fiscalyear" })
    setId('')
    // Perform form submission logic here
  };

  return (
    <>
      <div className='px-[50px]'>
        <div>
          <h2 className='font-inter font-semibold text-[30px]'> {editMode ? 'Update': 'Add'} Currency</h2>
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
                    name='name'
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr' name='name' />
                </div>

                <div className='py-[8px]'>
                  <label className='block py-[5px] font-[500] font-inter '>Country</label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                    type='text'
                    name='country'
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr ' name='country' />
                </div>

                <div className='grid grid-cols-2 gap-[20px]'>
                  <div className='py-[8px]'>
                    <label className='block py-[8px] font-[500] font-inter '>Symbol</label>
                    <Field
                      className='border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr '
                      name='symbol'
                      type='text'
                    />
                    <ErrorMessage component='div' className='text-[14px] text-redclr ' name='symbol' />
                  </div>
                  <div className='py-[8px]'>
                    <label className='block py-[8px] font-[500] font-inter '>Symbol Align</label>
                    <Field
                      className='border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr '
                      name='syPlacement'
                      type='text'
                      as='select'
                    >
                      <option value='left'>Left</option>
                      <option value='Right'>Right</option>


                    </Field>
                    <ErrorMessage component='div' className='text-[14px] text-redclr ' name='syPlacement' />
                  </div>
                </div>

               
                 <div className='py-[8px]'>
                  <label className='block py-[5px] font-[500] font-inter '>Current Exchange Rate</label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                    type='text'
                    name='currentExchangeRate'
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr' name='currentExchangeRate' />
                </div>

                <div className="py-[6px]">
                                    <div role="group">
                                            <label className='block py-[8px] font-[500] font-inter '>Is Local Currency <span>*</span></label>
                                            <div>
                                                <label className=""> <input className='mx-[5px]' type="radio"  name="isLocal"  checked={formik.values.isLocal === true} value={true}
                                               onChange={() => formik.setFieldValue('isLocal', true)} />Yes</label>
                                                <label className="ml-[10px]"><input className='mx-[5px]' type="radio" name="isLocal" checked={formik.values.isLocal === false} value={false}
                                                  onChange={() => formik.setFieldValue('isLocal', false)} /> No</label>
                                            </div>
                                            <ErrorMessage component="div" className='text-[14px] text-redclr ' name="isAllBranchApplicable" />
                                        </div>
                                    </div>


                <div className=' mt-[40px] flex gap-[20px] justify-end'>
                <CancelButton onClick={()=>dispatch(addMenu({ id:'', menu:'currency'}))} className=' border-[1px] border-redclr px-[15px] py-[4px] text-redclr font-inter' text='Cancel' type='button' />

                  <button onClick={()=>dispatch(addMenu({ id:'', menu:'currency'}))}  className='bg-PrimaryColor px-[15px] py-[4px] text-white font-inter' type='submit' > 
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

export default CurrencyForm;
