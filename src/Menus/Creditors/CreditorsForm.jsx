import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import CancelButton from '../../Components/Buttons/CancelButton';
import { useDispatch, useSelector } from 'react-redux';
import { useLayouData } from '../../Context/MainLayoutContext';
import usePostData from '../../Apis/usePostData';
import useGetData from '../../Apis/useGetData';
import useUpdateData from '../../Apis/useUpdate';
import useGetById from '../../Apis/useGetById';
import { baseUrl } from '../../Apis/Baseurl';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import SubmitButton from '../../Components/Buttons/SubmitButton';
import { FocuseErrorField } from '../../Components/FocusErrorField';
import useFormNavigation from '../../Components/FormNavigation';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VendorForm = () => {

  const {postdata} = usePostData('Creditors/Add')
  const {data}= useGetData('ChartOfAccount/GetAll')
  const {updateData} = useUpdateData('Creditors/Update')
  const {GiveId,dataByid}= useGetById('Creditors/GetById/')
  const {token}= useLayouData();
  const [editMode,setEditMode]= useState(false)
const [companyData,setCompanyData]= useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const paramId = useParams()
  const formref= useFormNavigation()




  useEffect(()=>
  {
   
    if(paramId?.id )
    {
  setEditMode(true)
  GiveId(paramId?.id)
    }
  const fetchData = async ()=>
  {
     try {
         const response =  await axios.get(`${baseUrl}Company/GetAll?IsDeleted=${false}`,
           {headers : { Authorization:`Bearer ${token}` }
          
         })
         setCompanyData(response.data.data)
         console.log(response)
        }
      catch (err)
      {
       console.log(err)
       }
     };
     fetchData();
    }   
  ,[paramId?.id])


  const initialValues = {
    companyName: '',
    name: '',
    address:'',
    contactNumber:'',
    email:'',
    chartOfAccountId:'',
   
    isActive: true 
  };

  const validationSchema = Yup.object().shape({
   
    name: Yup.string().required('required'),
    // companyName: Yup.string().required('required'),
    chartOfAccountId: Yup.string().required('required'),
    address: Yup.string().required('required'),
    
  });


  const handleSubmit = async (formik) => {


    if(editMode)
    { updateData(formik.values)
      navigate('/creditors')
     }
    else 
    {   postdata(formik.values,'Creditors') }
    
   
   document.getElementById('name').focus()
   formik.resetForm()
    
  };

  return (
    <>
      <div className='px-[50px]'>
        <div>
          <h2 className='font-inter font-semibold text-[30px]'>{editMode ? 'Update' : 'Add'} Creditors</h2>
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
          onSubmit={(formik)=>handleSubmit(formik)}
          enableReinitialize={true}
        >
          {(formik) => (
            <Form ref={formref} className='grid grid-cols-2 gap-[90px]'>
                <div>
              <div className='grid grid-cols-2 gap-[30px]'>
                <div className='py-[8px]'>
                  <label className='block py-[5px] font-[500] font-inter '> Name <span className='text-redclr'>*</span></label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                     id='name'
                    name='name'
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr' name='name' />
                </div>

                <div className="py-[8px]">
                  <label className="block py-[5px] font-[500] font-inter ">Company  <span className='text-redclr'>*</span></label>
                  <Field type="text"
                    name="companyId"
                    as='select'
                   id='companyId'
                    className="w-[100%] border-[1px] px-[8px] py-[8px] outline-none border-borderclr"
                    placeholder=""
                    // value={CompanyAutofillData}
                    // onChange={(e) => setCompanyAutofillData((e.target.value))}
                    
                  >
                    <option disabled value="">
                        select company
                      </option>
                      {companyData?.map((item, index) => (
                        <option key={item?.id} value={item?.id}>{item?.name}</option>
                      ))}

                  </Field>
                  <ErrorMessage component="div" className="error" name="companyId" />
                </div>
                </div>

                

                <div className='grid grid-cols-2 gap-[20px]'>
                  <div className='py-[8px]'>
                    <label className='block py-[8px] font-[500] font-inter '>Contact Number  <span className='text-redclr'>*</span></label>
                    <Field
                      className='border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr '
                      name='contactNumber'
                     id='contactNumber'
                    />
                    <ErrorMessage component='div' className='text-[14px] text-redclr ' name='contactNumber' />
                  </div>
                  
                <div className="py-[8px]">
                  <label className="block  py-[8px] font-[500] font-inter ">ChartOfAccount  <span className='text-redclr'>*</span></label>
                  <Field type="text"
                    name="chartOfAccountId"
                    as='select'
                    id='chartOfAccountId'
                    className="w-[100%] border-[1px] px-[8px] py-[8px] outline-none border-borderclr"
                    placeholder=""
                    // value={CompanyAutofillData}
                    // onChange={(e) => setCompanyAutofillData((e.target.value))}
                    
                  >
                    <option disabled value="">
                      CharotAccount
                      </option>
                      {data?.map((item, index) => (
                        <option key={item?.id} value={item?.id}>{item?.accountName}</option>
                      ))}

                  </Field>
                  <ErrorMessage component="div" className="error" name="chartOfAccountId" />
                </div>
                </div>

                <div className='grid grid-cols-2 gap-[30px]'>
                <div className='py-[8px]'>
                  <label className='block py-[5px] font-[500] font-inter '> Email</label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                   id='email'
                    name='email'
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr' name='email' />
                </div>

                <div className='py-[8px]'>
                  <label className='block py-[5px] font-[500] font-inter '> Address  <span className='text-redclr'>*</span></label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                    id='address'
                    name='address'
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr' name='address' />
                </div>
                </div>

              
                   <div className="py-[6px]">
                    <div role="group">
                       <label className='block py-[8px] font-[500] font-inter '>  Active </label>
                           <div>
                           <label className=""> <Field className='mx-[5px]' type="radio" id='isActive'  name="isActive"  checked={formik.values.isActive === true} value={true}
                             onChange={() => formik.setFieldValue('isActive', true)} />Yes</label>
                             <label className="ml-[10px]"><Field className='mx-[5px]' type="radio" id='isActive' name="isActive"
                              checked={formik.values.isActive === false} value={false}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  document.getElementById('btnsubmit').focus();
                                }
                              }}
                              onChange={() => formik.setFieldValue('isActive', false)} /> No</label>
                               </div>
                               <ErrorMessage component="div" className='text-[14px] text-redclr ' name="isAllBranchApplicable" />
                             </div>
                        </div>

                <div className=' mt-[40px] flex gap-[20px] justify-end'>
                <CancelButton link='/creditors'/>
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

export default VendorForm;
