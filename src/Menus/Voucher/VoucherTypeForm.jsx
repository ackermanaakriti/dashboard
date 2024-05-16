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
import useGetData from '../../Apis/useGetData';
import usePostData from '../../Apis/usePostData';
import useUpdateData from '../../Apis/useUpdate';
import useGetById from '../../Apis/useGetById';
import { useNavigate, useParams } from 'react-router';

const VouchertypeForm = () => {
  const id =uuidv4();

  const {setId,getId}= useLayouData();
  const [editMode,setEditMode]= useState(false)
  const [editData,seteditData]= useState('')
  const dispatch = useDispatch();
const {postdata}= usePostData('VoucherType/Add')
const {data}= useGetData('VoucherType/GetAll')
const {updateData} = useUpdateData('VoucherType/Update')
const {GiveId,dataByid}= useGetById('VoucherType/GetById/')
const navigate = useNavigate()
const paramid = useParams()
  useEffect(()=>
  {
    if(paramid?.id )
    {
      setEditMode(true)
      GiveId(paramid?.id) 
    }   

   
  },[paramid?.id,data])
  console.log(dataByid)


  const initialValues = {
    name: '',
    prefix: '',
    isSystemDefined: false,
    // isEditable:true,
    
  };

  const validationSchema = Yup.object().shape({
    prefix: Yup.string().required('required'),
    name: Yup.string().required('required'),
    // isSystemDefined: Yup.boolean().required('required'),
    // isEditable: Yup.boolean().required('required'),
  });


  const handleSubmit = (values) => {
    console.log('hello')
    if(editMode)
    {
     
      console.log(values)
      updateData(values)
      // const editedId = {...values,id:getId}
      // console.log(editedId)
      // dispatch(editvouchertype(editedId))

    }
    else 
    {
      console.log(values)
       postdata(values)
    }
    navigate('/vouchertype')
   
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
          initialValues={editMode ? dataByid : initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {(formik) => (
            <Form className='grid grid-cols-2 gap-[90px]'>
              <div className=''>
                <div className='py-[8px]'>
                  <label className='block py-[5px] font-[500] font-inter '>Name <span className='text-redclr'> *</span></label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                    type='text'
                    name='name'
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr' name='name' />
                </div>

                <div className='py-[8px]'>
                  <label className='block py-[5px] font-[500] font-inter '>Prefix <span className='text-redclr'> *</span></label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                    type='text'
                    name='prefix'
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr ' name='prefix' />
                </div>
              
               
              

              
                            {/* <div className="py-[6px]">
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
                                    </div> */}

                <div className=' mt-[40px] flex gap-[20px] justify-end'>
                <CancelButton onClick={()=> navigate('/vouchertype')} className=' border-[1px] border-redclr px-[15px] py-[4px] text-redclr font-inter' text='Cancel' type='button' />
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
