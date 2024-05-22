import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
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
import { useNavigate, useParams } from 'react-router';
import SubmitButton from '../../Components/Buttons/SubmitButton';
import CancelButton from '../../Components/Buttons/CancelButton';
import useFormNavigation from '../../Components/FormNavigation';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const VocherSequenceForm = () => {

  const {postdata} = usePostData('VoucherSequence/Add')
  const {data}= useGetData('VoucherType/GetAll')
  const {updateData} = useUpdateData('Bank/Update')
  const {GiveId,dataByid}= useGetById('Bank/GetById/')
  const {setId,getId,token}= useLayouData();
  const [editMode,setEditMode]= useState(false)
const [fiscalYearData,setfiscalYearData]= useState([])
const [ChartofAccData,setChartofAccData]= useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const paramId = useParams()
  const formref = useFormNavigation()



  const fetchData = async () => {
    try {
     

        // Fetch Fiscal Year data
        const fiscalResponse = await axios.get(`${baseUrl}FiscalYear/GetAll?IsDeleted=${false}`,{ headers: { Authorization: `Bearer ${token}` }});
        setfiscalYearData(fiscalResponse.data);
        console.log(fiscalResponse)
        // Fetch Chart of Account data
        const charOfAccResponse = await axios.get(`${baseUrl}ChartOfAccount/GetAll`,{ headers: { Authorization: `Bearer ${token}` }});
        setChartofAccData(charOfAccResponse.data);
        console.log(ChartofAccData.data)
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {

    if (paramId?.id) {
        setEditMode(true);
        GiveId(paramId?.id);
    }
    
  
    fetchData();
  }, [paramId?.id]); 



  const initialValues = {
  
      name: "",
  currentNumber: '',
  prefix: "",
  voucherTypeId: '',
  fiscalYearId: '',
  charCount: '',
    isActive: true 
  };

  const validationSchema = Yup.object().shape({
   
    name: Yup.string().required('required'),
    currentNumber: Yup.string().required('required'),
    prefix: Yup.string().required('required'),
    voucherTypeId: Yup.string().required('required'),
    charCount: Yup.string().required('required'),
    fiscalYearId: Yup.string().required('required'),
  });


  const handleSubmit = async (formik) => {

    if(editMode)
    { updateData(formik.values) 
      navigate('/vouchersequence')
    }
    else 
    {  await postdata(formik.values,'Voucher Sequence') 
      formik.resetForm()
    }
    
    document.getElementById('name').focus()
 
    
  };

  return (
    <>
      <div className='px-[50px]'>
        <div>
          <h2 className='font-inter font-semibold text-[30px]'>{editMode ? 'Update' : 'Add'} Voucher Sequence</h2>
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
            <Form ref={formref} className='grid grid-cols-2 gap-[90px]'>
                <div>
              <div className='grid grid-cols-2 gap-[30px]'>
                <div className='py-[8px]'>
                  <label className='block py-[5px] font-[500] font-inter '> Name <span className='text-redclr'> *</span></label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                   id='name'
                    name='name'
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr' name='name' />
                </div>
                <div className='py-[8px]'>
                  <label className='block py-[5px] font-[500] font-inter '> Number <span className='text-redclr'> *</span></label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                   id='currentNumber'
                    name='currentNumber'
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr' name='currentNumber' />
                </div>

               
                </div>

                

                <div className='grid grid-cols-2 gap-[20px]'>
                  <div className='py-[8px]'>
                    <label className='block py-[8px] font-[500] font-inter '>Prefix <span className='text-redclr'> *</span></label>
                    <Field
                      className='border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr '
                      name='prefix'
                      id='prefix'
                    />
                    <ErrorMessage component='div' className='text-[14px] text-redclr ' name='prefix' />
                  </div>
                  <div className="py-[8px]">
                  <label className="block py-[5px] font-[500] font-inter ">Voucher Type <span className='text-redclr'> *</span></label>
                  <Field type="text"
                    name="voucherTypeId"
                    as='select'
                   id='voucherTypeId'
                    className="w-[100%] border-[1px] px-[8px] py-[8px] outline-none border-borderclr"
                    placeholder=""
                    // value={CompanyAutofillData}
                    // onChange={(e) => setCompanyAutofillData((e.target.value))}
                    
                  >
                    <option disabled value="">
                        select voucher
                      </option>
                      {data?.map((item, index) => (
                        <option key={item?.id} value={item?.id}>{item?.name}</option>
                      ))}

                  </Field>
                  <ErrorMessage component="div" className="error text-[14px] text-redclr" name="voucherTypeId" />
                </div>
                  
               
                </div>
                <div className='grid grid-cols-2 gap-[20px]'>
                <div className="py-[8px]">
                  <label className="block py-[5px] font-[500] font-inter ">Fiscal Year <span className='text-redclr'> *</span></label>
                  <Field type="text"
                    name="fiscalYearId"
                    as='select'
                    id='fiscalYearId'
                    className="w-[100%] border-[1px] px-[8px] py-[8px] outline-none border-borderclr"
                    placeholder=""
                    // value={CompanyAutofillData}
                    // onChange={(e) => setCompanyAutofillData((e.target.value))}
                    
                  >
                    <option disabled value="">
                        select fiscal year
                      </option>
                      {data?.map((item, index) => (
                        <option key={item?.id} value={item?.id}>{item?.name}</option>
                      ))}

                  </Field>
                  <ErrorMessage component="div" className="error text-[14px] text-redclr" name="fiscalYearId" />
                </div>
                 
                  <div className="py-[8px]">
                  <label className="block py-[5px] font-[500] font-inter ">ChartofAccount <span className='text-redclr'> *</span></label>
                  <Field type="text"
                    name="charCount"
                    as='select'
                   id='cha'
                    className="w-[100%] border-[1px] px-[8px] py-[8px] outline-none border-borderclr"
                    placeholder=""
                    // value={CompanyAutofillData}
                    // onChange={(e) => setCompanyAutofillData((e.target.value))}
                    
                  >
                    <option disabled value="">
                        select chartofaccount
                      </option>
                      {ChartofAccData?.data?.map((item, index) => (
                        <option key={item?.id} value={item?.id}>{item?.accountName}</option>
                      ))}

                  </Field>
                  <ErrorMessage component="div" className="text-[14px] text-redclr" name="charCount" />
                </div>
                  
               
                </div>

                

              
                   <div className="py-[6px]">
                    <div role="group">
                       <label className='block py-[8px] font-[500] font-inter '>  Active </label>
                           <div>
                           <label className=""> <Field className='mx-[5px]' type="radio"  name="isActive"  checked={formik.values.isActive === true} value={true}
                             onChange={() => formik.setFieldValue('isActive', true)} />Yes</label>
                             <label className="ml-[10px]"><Field className='mx-[5px]' type="radio"
                              name="isActive" checked={formik.values.isActive === false} value={false}
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
                <CancelButton link='/vouchersequence'/>
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

export default VocherSequenceForm;
