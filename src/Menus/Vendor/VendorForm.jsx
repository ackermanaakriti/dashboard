import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { CancelButton, GreenButton } from '../../Components/GreenButton';
import { useDispatch, useSelector } from 'react-redux';
import { useLayouData } from '../../Context/MainLayoutContext';
import moment from 'moment';
import { addMenu } from '../../Redux/TopTabSlice';
import usePostData from '../../Apis/usePostData';
import useGetData from '../../Apis/useGetData';
import useUpdateData from '../../Apis/useUpdate';
import useGetById from '../../Apis/useGetById';
import { baseUrl } from '../../Apis/Baseurl';
import axios from 'axios';

const VendorForm = () => {

  const {postdata} = usePostData('Vendor/Add')
  const {data}= useGetData('ChartOfAccount/GetAll')
  const {updateData} = useUpdateData('Vendor/Update')
  const {GiveId,dataByid}= useGetById('Vendor/GetById/')
  const {setId,getId,token}= useLayouData();
  const [editMode,setEditMode]= useState(false)
const [companyData,setCompanyData]= useState([])
  const dispatch = useDispatch();




  useEffect(()=>
  {
   
    if(getId )
    {
  setEditMode(true)
  GiveId(getId)
    }
  const fetchData = async ()=>
  {
     try {
         const response =  await axios.get(`${baseUrl}Company/GetAll`,
           {headers : { Authorization:`Bearer ${token}` }
          
         })
         setCompanyData(response.data)
         console.log(response)
        }
      catch (err)
      {
       console.log(err)
       }
     };
     fetchData();
    }   
  ,[setId])


  const initialValues = {
    companyName: '',
    name: '',
    address:'',
    contactNumber:'',
    email:'',
    chartOfAccountId:'',
   
    isActive: null 
  };

  const validationSchema = Yup.object().shape({
   
    name: Yup.string().typeError('enter number').required('required'),
  });


  const handleSubmit = async (values) => {

    if(editMode)
    { updateData(values) }
    else 
    {  await postdata(values) }
    
    dispatch(addMenu({ id:'', menu:'vendorTable'}))
    setId('')
    
  };

  return (
    <>
      <div className='px-[50px]'>
        <div>
          <h2 className='font-inter font-semibold text-[30px]'>{editMode ? 'Update' : 'Add'} Vendor</h2>
        </div>

        <Formik
          initialValues={editMode ? dataByid : initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {(formik) => (
            <Form className='grid grid-cols-2 gap-[90px]'>
                <div>
              <div className='grid grid-cols-2 gap-[30px]'>
                <div className='py-[8px]'>
                  <label className='block py-[5px] font-[500] font-inter '> Name</label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                 
                    name='name'
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr' name='name' />
                </div>

                <div className="py-[8px]">
                  <label className="block py-[5px] font-[500] font-inter ">Company <span>*</span></label>
                  <Field type="text"
                    name="companyId"
                    as='select'
                 
                    className="w-[100%] border-[1px] px-[8px] py-[8px] outline-none border-borderclr"
                    placeholder=""
                    // value={CompanyAutofillData}
                    // onChange={(e) => setCompanyAutofillData((e.target.value))}
                    
                  >
                    <option disabled value="">
                        select company
                      </option>
                      {companyData?.data?.map((item, index) => (
                        <option key={item?.id} value={item?.id}>{item?.name}</option>
                      ))}

                  </Field>
                  <ErrorMessage component="div" className="error" name="companyId" />
                </div>
                </div>

                

                <div className='grid grid-cols-2 gap-[20px]'>
                  <div className='py-[8px]'>
                    <label className='block py-[8px] font-[500] font-inter '>Contact Number</label>
                    <Field
                      className='border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr '
                      name='contactNumber'
                   
                    />
                    <ErrorMessage component='div' className='text-[14px] text-redclr ' name='contactNumber' />
                  </div>
                  
                <div className="py-[8px]">
                  <label className="block  py-[8px] font-[500] font-inter ">ChartOfAccount <span>*</span></label>
                  <Field type="text"
                    name="chartOfAccountId"
                    as='select'
                 
                    className="w-[100%] border-[1px] px-[8px] py-[8px] outline-none border-borderclr"
                    placeholder=""
                    // value={CompanyAutofillData}
                    // onChange={(e) => setCompanyAutofillData((e.target.value))}
                    
                  >
                    <option disabled value="">
                      CharotAccount
                      </option>
                      {data?.data?.map((item, index) => (
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
                 
                    name='email'
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr' name='email' />
                </div>

                <div className='py-[8px]'>
                  <label className='block py-[5px] font-[500] font-inter '> Address</label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                 
                    name='address'
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr' name='address' />
                </div>
                </div>

              
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

export default VendorForm;
