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
import { addaccountGroup, editAccountgrp } from '../../Redux/Slices/AccountGroupSlice';
import usePostData from '../../Apis/usePostData';
import useGetById from '../../Apis/useGetById';
import useUpdateData from '../../Apis/useUpdate';

const AccountGroupForm = () => {
  const id =uuidv4();

  const {setId,getId}= useLayouData();
  const [editMode,setEditMode]= useState(false)
  const [editData,seteditData]= useState('')
  const dispatch = useDispatch();
  const currency = useSelector((state)=>state.accgroup)
  const {postdata}= usePostData('AccountGroup/Add')
  const {GiveId,dataByid} = useGetById('AccountGroup/GetById/')
  const {updateData}= useUpdateData('AccountGroup/Update')

  console.log(dataByid)
  useEffect(()=>
  {
    if(getId)
    {
      setEditMode(true)
      GiveId(getId)
    }   
    console.log(editData)
   
  },[setId])


  const initialValues = {
    name: '',
    code: '',
    
  };

  const validationSchema = Yup.object().shape({
    code: Yup.number().typeError('enter number').required('required'),
   
    name: Yup.string().required('required'),
    
  });


  // const handleSubmit = (values) => {
   
  //   const accgrpData = { ...values, id: id };
  //   console.log(accgrpData)
   
  //   if(editMode)
  //   {
  //     console.log(getId)
  //     const editedId = {...values,id:getId}
  //     console.log(editedId)
  //     dispatch(editAccountgrp(editedId))
  //   }
  //   else 
  //   {
  //     dispatch(addaccountGroup(accgrpData))
  //   }
  //   addMenu({ id: "", menu: "fiscalyear" })
  //   setId('')
  //   // Perform form submission logic here
  // };
  const handleSubmit =(values)=>
  {
    if(editMode)
    {
    updateData(values)
    }
    else 
    {
  postdata(values)
    }
  }

  return (
    <>
      <div className='px-[50px]'>
        <div>
          <h2 className='font-inter font-semibold text-[30px]'> {editMode ? 'Update': 'Add'} Account Group</h2>
        </div>

        <Formik
          initialValues={editMode ? dataByid : initialValues}
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
                  <label className='block py-[5px] font-[500] font-inter '>Code</label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                    type='text'
                    name='code'
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr ' name='code' />
                </div>

                

                <div className=' mt-[40px] flex gap-[20px] justify-end'>
                 
                  <CancelButton onClick={()=>dispatch(addMenu({ id:'', menu:'Accgrp'}))} className=' border-[1px] border-redclr px-[15px] py-[4px] text-redclr font-inter' text='Cancel' type='button' />
                  <button onClick={()=>dispatch(addMenu({ id:'', menu:'Accgrp'}))}  className='bg-PrimaryColor px-[15px] py-[4px] text-white font-inter' type='submit' > 
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

export default AccountGroupForm;
