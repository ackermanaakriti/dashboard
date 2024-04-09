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

const FiscalYearForm = () => {
  const id =uuidv4();

  const {setId,getId}= useLayouData();
  const [editMode,setEditMode]= useState(false)
  const [editData,seteditData]= useState('')
  const dispatch = useDispatch();
  const fiscaldata = useSelector((state)=>state.fiscalyear)

  console.log(getId)
  useEffect(()=>
  {
    if(getId)
    {
      setEditMode(true)
    seteditData(fiscaldata.find((item)=>item.id === getId))
    }   
    console.log(editData)
   
  },[setId])


  const initialValues = {
    code: '',
    fullName: '',
    fromDate: '',
    toDate: '',
    isActive: null // added isActive field
  };

  const validationSchema = Yup.object().shape({
    code: Yup.number().typeError('enter number').required('required'),
    fullName: Yup.number().typeError('enter number').required('required'),
    fromDate: Yup.string().required('required'),
    toDate: Yup.string().required('required'),
  });


  const handleSubmit = (values) => {
   
    const fiscalDataWithId = { ...values, id: id };
    console.log(fiscalDataWithId)
   
    if(editMode)
    {
      console.log(getId)
      const editedId = {...values,id:getId}
      console.log(editedId)
      dispatch(editFiscalYear(editedId))
    }
    else 
    {
      dispatch(addFiscalYear(fiscalDataWithId))
    }
    dispatch(addMenu({ id:'', menu:'fiscalyear'}))
   
    setId('')
    // Perform form submission logic here
  };

  return (
    <>
      <div className='px-[50px]'>
        <div>
          <h2 className='font-inter font-semibold text-[30px]'>{editMode ? 'Update' : 'Add'} Fiscal Year</h2>
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
                  <label className='block py-[5px] font-[500] font-inter '>Fiscal Year Name</label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                    type='text'
                    name='fullName'
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr' name='fullName' />
                </div>

                <div className='py-[8px]'>
                  <label className='block py-[5px] font-[500] font-inter '>Code</label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                    type='text'
                    name='code'
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr ' name='code' />
                </div>

                <div className='grid grid-cols-2 gap-[20px]'>
                  <div className='py-[8px]'>
                    <label className='block py-[8px] font-[500] font-inter '>Start Date AD</label>
                    <Field
                      className='border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr '
                      name='fromDate'
                      type='date'
                    />
                    <ErrorMessage component='div' className='text-[14px] text-redclr ' name='fromDate' />
                  </div>
                  <div className='py-[8px]'>
                    <label className='block py-[8px] font-[500] font-inter '>End Date AD</label>
                    <Field
                      className='border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr '
                      name='toDate'
                      type='date'
                    />
                    <ErrorMessage component='div' className='text-[14px] text-redclr ' name='toDate' />
                  </div>
                </div>

                {/* <div className='grid grid-cols-2 gap-[20px]'>
                  <div className='py-[8px]'>
                    <label className='block py-[8px] font-[500] font-inter '>Start Date BS</label>
                    <Field
                      className='border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr '
                      name='fromDate'
                      value={formik.values.fromDate}
                      onChange={(date) => formik.setFieldValue('fromDate', date)}
                    />
                    <ErrorMessage component='div' className='text-[14px] text-redclr ' name='fromDate' />
                  </div>
                  <div className='py-[8px]'>
                    <label className='block py-[8px] font-[500] font-inter '>End Date BS</label>
                    <Field
                      className='border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr '
                      name='toDate'
                      value={formik.values.toDate}
                      onChange={(date) => formik.setFieldValue('toDate', date)}
                    />
                    <ErrorMessage component='div' className='text-[14px] text-redclr ' name='toDate' />
                  </div>
                </div> */}

                            <div className="py-[6px]">
                                    <div role="group">
                                            <label className='block py-[8px] font-[500] font-inter '> Is Active <span>*</span></label>
                                            <div>
                                                <label className=""> <input className='mx-[5px]' type="radio"  name="isActive"  checked={formik.values.isActive === true} value={true}
                                               onChange={() => formik.setFieldValue('isActive', true)} />Yes</label>
                                                <label className="ml-[10px]"><input className='mx-[5px]' type="radio" name="isActive" checked={formik.values.isActive === false} value={false}
                                                  onChange={() => formik.setFieldValue('isActive', false)} /> No</label>
                                            </div>
                                            <ErrorMessage component="div" className='text-[14px] text-redclr ' name="isAllBranchApplicable" />
                                        </div>
                                    </div>

                <div className=' mt-[40px] flex gap-[20px] justify-end'>
                <CancelButton onClick={()=>dispatch(addMenu({ id:'', menu:'fiscalyear'}))} className=' border-[1px] border-redclr px-[15px] py-[4px] text-redclr font-inter' text='Cancel' type='button' />
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

export default FiscalYearForm;
