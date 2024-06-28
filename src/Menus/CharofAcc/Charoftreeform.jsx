import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useLayouData } from '../../Context/MainLayoutContext';
import usePostData from '../../Apis/usePostData';
import useUpdateData from '../../Apis/useUpdate';
import useGetData from '../../Apis/useGetData';
import { useNavigate } from 'react-router';
import SubmitButton from '../../Components/Buttons/SubmitButton';
import CancelButton from '../../Components/Buttons/CancelButton';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToggleSwitch } from '../../Components/ToggleSwitch';
import { InputField } from '../../Components/InputField';


const initialValues = {
    accountCode: '',
    accountName: '',
    isTransactional: true,
    accountGroupId: '',
    description: '',
    isTaxApplicable: true,
    parentAccountId: '',
    mainParentId: '',
    id: 0,
    isActive: true,
    isLedger: true,
    isAllBranchApplicable: true,
    accountGroupName: 'hghgj',


};

const CharofAccTreeForm = ({ node, mainParentId, parentAccountId, accountGroupId, setShowForm }) => {

    const { postdata, postError } = usePostData('ChartOfAccount/Add')
    const { updateData } = useUpdateData('ChartOfAccount/Update');
    const { data } = useGetData(`AccountGroup/GetAll?IsDeleted=${false}`, '')
    const [editMode, setEditMode] = useState(false)
    const [editData, seteditData] = useState()
    const navigate = useNavigate()


   

    const validationSchema = Yup.object().shape({

        accountName: Yup.string().required('required'),
        
    });


    const handleSubmit = async (formik) => {

        const treeData = {
            ...formik.values,
            mainParentId: mainParentId,
            accountGroupId: parseInt(accountGroupId),
            parentAccountId: parentAccountId ? parentAccountId : 0
        }
        if (editMode) {
            updateData(formik.values)
            setShowForm(false)
        }
        else {

            postdata(treeData,'ChartofAccount');
            formik.resetForm()
         setShowForm(false)


        }

    };

    return (
        <>
            <div className='py-[20px] px-[80px] bg-[#def1ed] my-[20px] shadow-lg' style={{zIndex:9999}} >
                <div>
                    <h2 className='font-inter font-semibold text-[20px]'> {editMode ? 'Update' : 'Add'} Chart of Account</h2>
                </div>
                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false} />
                <Formik
                    initialValues={editMode ? editData : initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                >
                    {(formik) => (
                        <Form className='grid grid-cols-1 gap-[90px] relative '>
                            <div className=''>


                                <div className='grid grid-cols-3 gap-[20px]  justify-center items-center '>
                                    
                <InputField
                  label="Name"
                  name={"accountName"}
                  number={false}
                  required={true}
                  value={formik.values.accountName}
                  onChange={(e) => {
                    formik.setFieldValue("accountName", e.target.value);
                  }}
                  textColor={"black"}
                />
                                   
                <InputField
                  label="Code"
                  name={"accountCode"}
                  number={false}
                  required={true}
                  value={formik.values.accountCode}
                  onChange={(e) => {
                    formik.setFieldValue("accountCode", e.target.value);
                  }}
                  textColor={"black"}
                  disabled={true}
                />
                <InputField
                  label="Description"
                  name={"description"}
                  number={false}
                  required={true}
                  value={formik.values.description}
                  onChange={(e) => {
                    formik.setFieldValue("description", e.target.value);
                  }}
                  textColor={"black"}
                />
                                   
                                    
                                </div>
                                <div className='grid grid-cols-3 gap-[20px] pt-[10px]' >

                                    <ToggleSwitch
                                        label={"Tax Applicable"}
                                        name={"isTaxApplicable"}
                                        required
                                        checked={formik.values.isTaxApplicable}
                                        onChange={() => {
                                            formik.setFieldValue(
                                                "isTaxApplicable",
                                                !formik.values.isTaxApplicable
                                            );
                                        }}
                                    />
                                    <ToggleSwitch
                                        label={"Active"}
                                        name={"isActive"}
                                        required
                                        checked={formik.values.isActive}
                                        onChange={() => {
                                            formik.setFieldValue(
                                                "isActive",
                                                !formik.values.isActive
                                            );
                                        }}
                                    />

                                    <ToggleSwitch
                                        label={"Apply For All Branch"}
                                        name={"isAllBranchApplicable"}
                                        required
                                        checked={formik.values.isAllBranchApplicable}
                                        onChange={() => {
                                            formik.setFieldValue(
                                                "isAllBranchApplicable",
                                                !formik.values.isAllBranchApplicable
                                            );
                                        }}
                                    />
                                </div>
                                <div>
                                    <div className="py-[6px]">
                                        <div role="group">
                                            <label className='block py-[8px] font-[500] font-inter '>Type </label>
                                            <div>
                                                <label className=""> <input className='mx-[5px]' type="radio" name="isTransactional" checked={formik.values.isTransactional === true} value={true}
                                                    onChange={() => formik.setFieldValue('isTransactional', true)} />Ledger</label>
                                                <label className="ml-[10px]"><input className='mx-[5px]' type="radio" name="isTransactional" checked={formik.values.isTransactional === false} value={false}
                                                    onChange={() => formik.setFieldValue('isTransactional', false)} /> Group</label>
                                            </div>
                                            <ErrorMessage component="div" className='text-[14px] text-redclr ' name="isTransactional" />
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div>

                                <div className=' mt-[40px] flex gap-[50px] absolute bottom-[2em] right-[5em]' >
                                    <div onClick={()=>setShowForm(false)}>
                                    <CancelButton  />
                                    </div>
                                    <SubmitButton type='submit'
                                        editMode={editMode}
                                        formik={formik}
                                        id='btnsubmit'
                                        handleSubmit={(values) => handleSubmit(values)} />
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


{/* <div className='py-[8px]'>
                                        <label className='block py-[8px] font-[500] font-inter '>Account Group</label>
                                        <Field
                                            className='border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr '
                                            name='accountGroupId'
                                           
                                            as='select'
                                            placeholder='Select Account Group'

                                        > */}

                                    {/* { accountGroupId  ?  <><option selected  value={groupIddata?.id} >{groupIddata?.name}</option>
                                                 ({data?.filter((item)=>(item?.id !== accountGroupId)).map((item)=>
                                                <option value={item.id}>{item.name}</option>)})
                                              </> : (data?.data?.map((item)=>
                                              (
                                                <option value={item.id}>{item.name}</option>
                                              )))  
                                           
                                            } */}
                                    {/* <option selected disabled >Select Account Group</option>
                                         
                                           
                                            {data?.map((item)=>
                                            (
                                               
                                                <option value={item.id}>{item?.name}</option>
                                            )
                                                
                                            )}
                                         
                                            
                                        </Field>
                                        <ErrorMessage component='div' className='text-[14px] text-redclr ' name='accountGroupId' />
                                    </div>
                                    */}
