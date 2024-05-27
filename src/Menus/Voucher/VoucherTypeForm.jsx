import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useLayouData } from '../../Context/MainLayoutContext';
import { v4 as uuidv4 } from 'uuid';
import useGetData from '../../Apis/useGetData';
import usePostData from '../../Apis/usePostData';
import useUpdateData from '../../Apis/useUpdate';
import useGetById from '../../Apis/useGetById';
import { useNavigate, useParams } from 'react-router';
import SubmitButton from '../../Components/Buttons/SubmitButton';
import CancelButton from '../../Components/Buttons/CancelButton';
import useFormNavigation from '../../Components/FormNavigation';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VouchertypeForm = () => {
  const id =uuidv4();

  const {formDirty,setFormDirty}= useLayouData();
  const [editMode,setEditMode]= useState(false)
  const [editData,seteditData]= useState('')
  const dispatch = useDispatch();
const {postdata}= usePostData('VoucherType/Add')
const {data}= useGetData('VoucherType/GetAll')
const {updateData} = useUpdateData('VoucherType/Update')
const {GiveId,dataByid}= useGetById('VoucherType/GetById/')
const navigate = useNavigate()
const paramid = useParams()
const formref = useFormNavigation()
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


  const handleSubmit = (formik) => {

    if(editMode)
    {
  
      updateData(formik.values)
      navigate('/vouchertype')
    }
    else 
    {
       postdata(formik.values,'Voucher Type')
    }
    document.getElementById('name').focus()
   formik.resetForm()
  
  };

  return (
    <>
      <div className='px-[50px]'>
        <div>
          <h2 className='font-inter font-semibold text-[30px]'>{editMode ? 'Update' : 'Add'} Voucher Type</h2>
        </div>
        <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />


        <Formik
          initialValues={editMode ? dataByid : initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {(formik) => (
            <Form onChange={()=>setFormDirty(true)} ref={formref} className='grid grid-cols-2 gap-[90px]'>
              <div className=''>
                <div className='py-[8px]'>
                  <label className='block py-[5px] font-[500] font-inter '>Name <span className='text-redclr'> *</span></label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                    type='text'
                    name='name'
                    id='name'
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr' name='name' />
                </div>

                <div className='py-[8px]'>
                  <label className='block py-[5px] font-[500] font-inter '>Prefix <span className='text-redclr'> *</span></label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                    type='text'
                    name='prefix'
                    id='prefix'
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        document.getElementById('btnsubmit').focus();
                      }
                    }}
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr ' name='prefix' />
                </div>
              
               
              

              

                <div className=' mt-[40px] flex gap-[20px] justify-end'>
                <CancelButton link='/vouchertype'/>
                <SubmitButton type='submit'
                 editMode={editMode}
                  formik={formik}
                  id='btnsubmit'
                   handleSubmit={(values) => handleSubmit(values)}/>
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
