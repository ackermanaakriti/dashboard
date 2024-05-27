import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLayouData } from '../../Context/MainLayoutContext';
import usePostData from '../../Apis/usePostData';
import axios from 'axios';
import { baseUrl } from '../../Apis/Baseurl';
import useUpdateData from '../../Apis/useUpdate';
import useGetById from '../../Apis/useGetById';
import useGetData from '../../Apis/useGetData';
import { useNavigate, useParams } from 'react-router-dom';
import useFormNavigation from '../../Components/FormNavigation';
import SubmitButton from '../../Components/Buttons/SubmitButton';
import CancelButton from '../../Components/Buttons/CancelButton';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CharofAccForm = () => {
  
    const {postdata,postError}= usePostData('ChartOfAccount/Add')
    const {updateData} = useUpdateData('ChartOfAccount/Update');
    const {data}= useGetData(`AccountGroup/GetAll?isDeleted=${false}`)
    const {GiveId,dataByid} = useGetById('ChartOfAccount/GetById/')
    const {formDirty,setFormDirty,token } = useLayouData();
    const [mainparentAcc,setMainparentAcc]= useState([])
    const [parentAcc,setparentAcc]= useState([])
    const [editMode, setEditMode] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const paramId = useParams()
    const formref = useFormNavigation()
 
 
    useEffect(() => {
        
        if (paramId?.id && data) {
            setEditMode(true)
            GiveId(paramId?.id)
            
        } 
        const  fetchDropDownsData=async()=>
            {
              const responseA = await axios.get(`${baseUrl}ChartOfAccount/GetTree`,{headers:{Authorization: `Bearer ${token}`}})
              setMainparentAcc(responseA.data.data)
              
            }
            fetchDropDownsData()
    }, [data,paramId?.id]
    )


 console.log(mainparentAcc)
    const initialValues = {
        id:0,
        accountCode: '',
        accountName: '',
        isTransactional: true,
        accountGroupId: '',
        description: '',
        isTaxApplicable: true,
        parentAccountId: 0,
        mainParentId: 0,
        // createdByUserId: true,
        // createdByBranchId: true,
         treeLevel: 0,
        isActive: true,
        isLedger: true,
        isAllBranchApplicable: true,
        // accountGroupName:''
    };

    const validationSchema = Yup.object().shape({
 
        // accountCode: Yup.string().typeError('invalid data').required('required'),
        // accountName: Yup.string().required('required'),
        parentAccountId:Yup.string().required('required'),
        mainParentId: Yup.string().required('required'),
        accountName:Yup.string().required('required'),
        // description: Yup.string().required('required'),
        isTaxApplicable: Yup.boolean().required('required'),
        // isActive: Yup.boolean().required('required'),
        // isLedger: Yup.boolean().required('required'),
        // isAllBranchApplicable: Yup.boolean().required('required'),
        // isTransactional: Yup.boolean().required('required'),
        // accountGroupId:Yup.number().required('required')
    });

    const handleSubmit = async (formik) => {
        const datawithInt = {...formik.values,accountGroupId: parseInt(formik.values.accountGroupId)}
        if (editMode) {
          updateData(formik.values)  ;
           navigate('/chartofaccount') }
        else {
          
            postdata(datawithInt ,'Chart Of Account');
        formik.resetForm()
        setparentAcc('')
         }
         document.getElementById('accountName').focus()
  
    };
    const handleParentAccounts=(e,setFieldValue)=>
        {
            const mainparentAccountId = e.target.value;
            console.log(mainparentAccountId)
            console.log(mainparentAcc)
            const findByIdMainparent = mainparentAcc.find((item)=>item.id === parseInt(mainparentAccountId))
            console.log(findByIdMainparent)
            if(findByIdMainparent)
                {
                    setFieldValue('parentAccountId','')
                    setparentAcc(findByIdMainparent?.children)
                }
           
            setFieldValue('mainParentId', mainparentAccountId);
        }

    return (
        <>
            <div className='px-[50px]'>
                <div>
                    <h2 className='font-inter font-semibold text-[30px]'> {editMode ? 'Update' : 'Add'} Chart of Account</h2>
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
                    onSubmit={(values, {resetForm}) => {
                        handleSubmit(values, {resetForm});
                      }}
                    enableReinitialize={true}
                >
                    {(formik) => (
                        <Form onChange={()=>setFormDirty(true)} ref={formref} className='grid grid-cols-2 gap-[90px]'>
                            <div className=''>
                                <div className='py-[8px]'>
                                    <label className='block py-[5px] font-[500] font-inter '>Name <span className='text-redclr'>*</span></label>
                                    <Field
                                        className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                                        type='text'
                                        name='accountName'
                                        id='accountName'
                                    />
                                    <ErrorMessage component='div' className='text-[14px] text-redclr' name='accountName' />
                                </div>

                                <div className='grid grid-cols-2 gap-[20px]'>
                                    <div className='py-[8px]'>
                                        <label className='block py-[8px] font-[500] font-inter '>Code </label>
                                        <Field
                                            className='border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr  cursor-not-allowed'
                                            name='accountCode'
                                            type='text'
                                            disabled
                                        />
                                        <ErrorMessage component='div' className='text-[14px] text-redclr ' name='accountCode' />
                                    </div>
                                    <div className='py-[8px]'>
                                        <label className='block py-[8px] font-[500] font-inter '>Account Group <span className='text-redclr'>*</span></label>
                                        <Field
                                            className='border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr '
                                            name='accountGroupId'
                                            id='accountGroupId'
                                            as='select'
                                            placeholder='Select Account Group'

                                        >
                                            <option disabled value='' selected >Select Account Group</option>
                                            {data?.map((item, index) =>
                                            (
                                                <option key={index} value={item?.id}>{item.name}</option>
                                            ))}
                                            
                                        </Field>
                                        <ErrorMessage component='div' className='text-[14px] text-redclr ' name='accountGroupId' />
                                    </div>
                                </div>


                                <div className='grid grid-cols-2 gap-[20px]'>
                                    <div className='py-[8px]'>
                                        <label className='block py-[8px] font-[500] font-inter '>Main Parent Account <span className='text-redclr'>*</span> </label>
                                        <Field
                                            className='border-[1px]  py-[8px] px-[12px] pr-[10px]  w-full outline-none border-borderclr '
                                            name='mainParentId'
                                            id='mainParentId'
                                            as='select'
                                            onChange={(e)=>handleParentAccounts(e,formik.setFieldValue)}
                                            placeholder='Select Main Parent Account'
                                        >
                                            <option className='text-[#717378] text-[15px]'  selected >Select Main Parent Account</option>
                                           {mainparentAcc?.map((item,index)=>
                                           (
                                            <option key={index} value={item?.id}>{item?.accountName}</option>
                                           ))}
                                        </Field>
                                        <ErrorMessage component='div' className='text-[14px] text-redclr ' name='mainParentId' />
                                    </div>
                                    <div className='py-[8px]'>
                                        <label className='block py-[8px] font-[500] font-inter '>Parent Account <span className='text-redclr'>*</span></label>
                                        <Field
                                            className='border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr '
                                            name='parentAccountId'
                                            id='parentAccountId'
                                            as='select'
                                        >
                                             <option className='text-[#717378] text-[15px]' value='' disabled  >Select  Parent Account</option>
                                           {parentAcc ? (parentAcc?.map((item,index)=>
                                           (
                                            <option key={index} value={item?.id}>{item?.accountName}</option>
                                           ))): <option value=''>No Parent Data</option>}
                                        </Field>
                                        <ErrorMessage component='div' className='text-[14px] text-redclr ' name='parentAccountId' />
                                    </div>
                                </div>


                                <div className='grid grid-cols-2 gap-[20px]'>
                                    <div className="py-[6px]">
                                    <div role="group">
                                            <label className='block py-[8px] font-[500] font-inter '> Tax Applicable </label>
                                            <div>
                                                <label className=""> <Field className='mx-[5px]' type="radio" id='texapplicable' name="isTaxApplicable"  checked={formik.values.isTaxApplicable === true} value={true}
                                               onChange={() => formik.setFieldValue('isTaxApplicable', true)} />Yes</label>
                                                <label className="ml-[10px]"><Field className='mx-[5px]'id='texapplicable' type="radio" name="isTaxApplicable" checked={formik.values.isTaxApplicable === false} value={false}
                                                  onChange={() => formik.setFieldValue('isTaxApplicable', false)} /> No</label>
                                            </div>
                                            <ErrorMessage component="div" className='text-[14px] text-redclr ' name="isTaxApplicable" />
                                        </div>
                                    </div>


                                    <div className="py-[6px]">
                                        <div role="group">
                                            <label className='block py-[8px] font-[500] font-inter '>Active</label>
                                            <div>
                                                <label className=""> <Field className='mx-[5px]' type="radio" id='isActive'  name="isActive"  checked={formik.values.isActive === true} value={true}
                                               onChange={() => formik.setFieldValue('isActive', true)} />Yes</label>
                                                <label className="ml-[10px]"><Field className='mx-[5px]' type="radio" id='isActive' name="isActive" checked={formik.values.isActive === false} value={false}
                                                  onChange={() => formik.setFieldValue('isActive', false)} /> No</label>
                                            </div>
                                            <ErrorMessage component="div" className='text-[14px] text-redclr ' name="isActive" />
                                        </div>
                                    </div>
                                </div>



                                <div className='py-[8px]'>
                                    <label className='block py-[5px] font-[500] font-inter '>Description</label>
                                    <Field
                                        className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                                        type='text'
                                        name='description'
                                        as='textarea'
                                        id='description'
                                    />
                                    <ErrorMessage component='div' className='text-[14px] text-redclr' name='description' />
                                </div>


                            </div>

                            <div className='relative'>

                                <div className='grid grid-cols-2 gap-[20px]'>
                                    <div className="py-[6px]">
                                    <div role="group">
                                            <label className='block py-[8px] font-[500] font-inter '> Transactional </label>
                                            <div>
                                                <label className=""> <Field className='mx-[5px]' type="radio" id='transactional'  name="isTransactional"  checked={formik.values.isTransactional === true} value={true}
                                               onChange={() => formik.setFieldValue('isTransactional', true)} />Yes</label>
                                                <label className="ml-[10px]"><Field className='mx-[5px]' type="radio" id='transactional' name="isTransactional" checked={formik.values.isTransactional === false} value={false}
                                                  onChange={() => formik.setFieldValue('isTransactional', false)} /> No</label>
                                            </div>
                                            <ErrorMessage component="div" className='text-[14px] text-redclr 'name="isTransactional" />
                                        </div>
                                    </div>


                                </div>


                                <div className='grid grid-cols-2 gap-[20px]'>
                                    <div className="py-[6px]">
                                    <div role="group">
                                            <label className='block py-[8px] font-[500] font-inter '> Apply for All Branch </label>
                                            <div>
                                                <label className=""> <Field className='mx-[5px]' type="radio" id='applyforbranch' name="isAllBranchApplicable"  checked={formik.values.isAllBranchApplicable === true} value={true}
                                               onChange={() => formik.setFieldValue('isAllBranchApplicable', true)} />Yes</label>
                                                <label className="ml-[10px]"><Field className='mx-[5px]' id='applyforbranch' type="radio" name="isAllBranchApplicable" checked={formik.values.isAllBranchApplicable === false} value={false}
                                                  onChange={() => formik.setFieldValue('isAllBranchApplicable', false)} /> No</label>
                                            </div>
                                            <ErrorMessage component="div" className='text-[14px] text-redclr ' name="isAllBranchApplicable" />
                                        </div>
                                    </div>


                                    <div className="py-[6px]">
                                    <div role="group">
                                            <label className='block py-[8px] font-[500] font-inter '>Ledger </label>
                                            <div>
                                                <label className=""> <Field className='mx-[5px]' type="radio" id='ledger' name="isLedger"  checked={formik.values.isLedger === true} value={true}
                                               onChange={() => formik.setFieldValue('isLedger', true)} />Yes</label>
                                                <label className="ml-[10px]"><Field id='ledger' className='mx-[5px]' type="radio"
                                                 onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                      e.preventDefault();
                                                      document.getElementById('btnsubmit').focus();
                                                    }
                                                  }} name="isLedger" checked={formik.values.isLedger === false} value={false}
                                                  onChange={() => formik.setFieldValue('isLedger', false)} /> No</label>
                                            </div>
                                            <ErrorMessage component="div" className='text-[14px] text-redclr ' name="isLedger" />
                                        </div>
                                    </div>
                                </div>


                                <div className=' mt-[40px] flex gap-[20px] right-0  absolute bottom-[2em]' >
                                <CancelButton link='/chartofaccount/listview'/>
                <SubmitButton type='submit'
                 editMode={editMode}
                  formik={formik}
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

export default CharofAccForm;
