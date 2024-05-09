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
import { addCurrency, editCurrency } from '../../Redux/Slices/CurrencySlice';
import { addChartofAcc, editCharofAcc } from '../../Redux/Slices/CharofAccSlice';
import usePostData from '../../Apis/usePostData';
import axios from 'axios';
import { baseUrl } from '../../Apis/Baseurl';
import useUpdateData from '../../Apis/useUpdate';
import useGetData from '../../Apis/useGetData';

const CharofAccTreeForm = ({node,mainParentId,parentAccountId,accountGroupId}) => {
   
    const {postdata,postError}= usePostData('ChartOfAccount/Add')
    // const {data}= useGetData('ChartOfAccount/GetAll')
    const {updateData} = useUpdateData('ChartOfAccount/Update');
    const {data}= useGetData('AccountGroup/GetAll')
    const { setId, getId,token } = useLayouData();
    const [editMode, setEditMode] = useState(false)
    const [editData, seteditData] = useState()
    const [groupIddata,setGroupIdData]= useState()
    const dispatch = useDispatch();

 
    useEffect(() => {
        if (getId && data) {
            setEditMode(true)
            seteditData(data?.data?.find((item) => item?.id === getId))
        } 
        if(accountGroupId)
        {
            const accId = data?.data?.find((item)=>item.id === accountGroupId)
            console.log(accId)
            setGroupIdData(accId)
            console.log(groupIddata)
        }
    }, [data,setId]
    )

    const initialValues = {
        accountCode: '',
        accountName: '',
        isTransactional: true,
        accountGroupId: '',
        description: '',
        isTaxApplicable: true,
        parentAccountId: '',
        mainParentId: '',
        // createdByUserId: null,
        // createdByBranchId: null,
        // treeLevel: null,
        isActive: true,
        isLedger: true,
        isAllBranchApplicable: true,
        accountGroupName:'hghgj',
        
       
    };

    const validationSchema = Yup.object().shape({
 
        accountCode: Yup.string().typeError('invalid data').required('required'),
        accountName: Yup.string().required('required'),
        description: Yup.string().required('required'),
        isTaxApplicable: Yup.boolean().required('required'),
        isActive: Yup.boolean().required('required'),
        isLedger: Yup.boolean().required('required'),
        isAllBranchApplicable: Yup.boolean().required('required'),
        isTransactional: Yup.boolean().required('required'),
        // accountGroupId:Yup.number().required('required')
    });


    const handleSubmit = async (values) => {
        
        const treeData = { ...values,
            mainParentId: mainParentId,
          
            parentAccountId: parentAccountId? parentAccountId : 0}
       
        console.log(treeData)
       
        if (editMode) {
          updateData(values)  }
        else { postdata(treeData ); }
       
        dispatch(addMenu({ id: '', menu: 'chartofacctable' }))
        setId('')

    };

    return (
        <>
            <div className='py-[20px] px-[80px] bg-[#def1ed] my-[20px] shadow-lg'>
                <div>
                    <h2 className='font-inter font-semibold text-[20px]'> {editMode ? 'Update' : 'Add'} Chart of Account</h2>
                </div>

                <Formik
                    initialValues={editMode ? editData : initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                >
                    {(formik) => (
                        <Form className='grid grid-cols-2 gap-[90px] relative'>
                            <div className=''>
                                <div className='py-[8px]'>
                                    <label className='block py-[5px] font-[500] font-inter '>Name</label>
                                    <Field
                                        className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                                        type='text'
                                        name='accountName'
                                    />
                                    <ErrorMessage component='div' className='text-[14px] text-redclr' name='accountName' />
                                </div>

                                <div className='grid grid-cols-2 gap-[20px]'>
                                    <div className='py-[8px]'>
                                        <label className='block py-[8px] font-[500] font-inter '>Code </label>
                                        <Field
                                            className='border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr '
                                            name='accountCode'
                                            type='text'
                                        />
                                        <ErrorMessage component='div' className='text-[14px] text-redclr ' name='accountCode' />
                                    </div>
                                    <div className='py-[8px]'>
                                        <label className='block py-[8px] font-[500] font-inter '>Account Group</label>
                                        <Field
                                            className='border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr '
                                            name='accountGroupId'
                                           
                                            as='select'
                                            placeholder='Select Account Group'

                                        >
                                            {/* <option disabled value=''  >Select Account Group</option> */}
                                            <>
                                           {/* { accountGroupId  ?  <><option selected  value={groupIddata?.id} >{groupIddata?.name}</option>
                                                 ({data?.data?.map((item)=>
                                                <option value={item.id}>{item.name}</option>)})
                                              </> : (data?.data?.map((item)=>
                                              (
                                                <option value={item.id}>{item.name}</option>
                                              )))  
                                           
                                            } */}
                                             { accountGroupId  ?  <><option selected  value={groupIddata?.id} >{groupIddata?.name}</option>
                                                 ({data?.data?.filter((item)=>(item?.id !== accountGroupId)).map((item)=>
                                                <option value={item.id}>{item.name}</option>)})
                                              </> : (data?.data?.map((item)=>
                                              (
                                                <option value={item.id}>{item.name}</option>
                                              )))  
                                           
                                            }
                                         
                                            </>
                                        
                                          {}
                                            
                                        </Field>
                                        <ErrorMessage component='div' className='text-[14px] text-redclr ' name='accountGroupId' />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-[20px]'>
                                    <div className="py-[6px]">
                                    <div role="group">
                                            <label className='block py-[8px] font-[500] font-inter '>Is Tax Applicable <span>*</span></label>
                                            <div>
                                                <label className=""> <input className='mx-[5px]' type="radio"  name="isTaxApplicable"  checked={formik.values.isTaxApplicable === true} value={true}
                                               onChange={() => formik.setFieldValue('isTaxApplicable', true)} />Yes</label>
                                                <label className="ml-[10px]"><input className='mx-[5px]' type="radio" name="isTaxApplicable" checked={formik.values.isTaxApplicable === false} value={false}
                                                  onChange={() => formik.setFieldValue('isTaxApplicable', false)} /> No</label>
                                            </div>
                                            <ErrorMessage component="div" className='text-[14px] text-redclr ' name="isTaxApplicable" />
                                        </div>
                                    </div>


                                    <div className="py-[6px]">
                                        <div role="group">
                                            <label className='block py-[8px] font-[500] font-inter '>Is Active <span>*</span></label>
                                            <div>
                                                <label className=""> <input className='mx-[5px]' type="radio"  name="isActive"  checked={formik.values.isActive === true} value={true}
                                               onChange={() => formik.setFieldValue('isActive', true)} />Yes</label>
                                                <label className="ml-[10px]"><input className='mx-[5px]' type="radio" name="isActive" checked={formik.values.isActive === false} value={false}
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
                                    />
                                    <ErrorMessage component='div' className='text-[14px] text-redclr' name='description' />
                                </div>


                            </div>

                            <div>

                                <div className='grid grid-cols-2 gap-[20px]'>
                                    <div className="py-[6px]">
                                    <div role="group">
                                            <label className='block py-[8px] font-[500] font-inter '>Is Transactional <span>*</span></label>
                                            <div>
                                                <label className=""> <input className='mx-[5px]' type="radio"  name="isTransactional"  checked={formik.values.isTransactional === true} value={true}
                                               onChange={() => formik.setFieldValue('isTransactional', true)} />Yes</label>
                                                <label className="ml-[10px]"><input className='mx-[5px]' type="radio" name="isTransactional" checked={formik.values.isTransactional === false} value={false}
                                                  onChange={() => formik.setFieldValue('isTransactional', false)} /> No</label>
                                            </div>
                                            <ErrorMessage component="div" className='text-[14px] text-redclr 'name="isTransactional" />
                                        </div>
                                    </div>


                                </div>


                                <div className='grid grid-cols-2 gap-[20px]'>
                                    <div className="py-[6px]">
                                    <div role="group">
                                            <label className='block py-[8px] font-[500] font-inter '>Is Apply for All Branch <span>*</span></label>
                                            <div>
                                                <label className=""> <input className='mx-[5px]' type="radio"  name="isAllBranchApplicable"  checked={formik.values.isAllBranchApplicable === true} value={true}
                                               onChange={() => formik.setFieldValue('isAllBranchApplicable', true)} />Yes</label>
                                                <label className="ml-[10px]"><input className='mx-[5px]' type="radio" name="isAllBranchApplicable" checked={formik.values.isAllBranchApplicable === false} value={false}
                                                  onChange={() => formik.setFieldValue('isAllBranchApplicable', false)} /> No</label>
                                            </div>
                                            <ErrorMessage component="div" className='text-[14px] text-redclr ' name="isAllBranchApplicable" />
                                        </div>
                                    </div>


                                    <div className="py-[6px]">
                                    <div role="group">
                                            <label className='block py-[8px] font-[500] font-inter '>Is Ledger <span>*</span></label>
                                            <div>
                                                <label className=""> <input className='mx-[5px]' type="radio"  name="isLedger"  checked={formik.values.isLedger === true} value={true}
                                               onChange={() => formik.setFieldValue('isLedger', true)} />Yes</label>
                                                <label className="ml-[10px]"><input className='mx-[5px]' type="radio" name="isLedger" checked={formik.values.isLedger === false} value={false}
                                                  onChange={() => formik.setFieldValue('isLedger', false)} /> No</label>
                                            </div>
                                            <ErrorMessage component="div" className='text-[14px] text-redclr ' name="isLedger" />
                                        </div>
                                    </div>
                                </div>


                                <div className=' mt-[40px] flex gap-[50px] absolute bottom-[2em] right-[5em]' >
                                    <button onClick={() => dispatch(addMenu({ id: '', menu: 'chartofacc' }))} className=' border-[1px] border-redclr px-[15px] py-[4px] text-redclr font-inter'  type='button'>Cancel</button>

                                    <button className='bg-PrimaryColor px-[15px] py-[4px] text-white font-inter' type='submit' >
                                        {editMode ? 'Update' : 'Save'} </button>
                                </div>
                            </div>

                        </Form>
                    )}

                </Formik>
            </div>
        </>
    )
}

export default CharofAccTreeForm;
