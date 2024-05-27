import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useLayouData } from '../../Context/MainLayoutContext';
import { useNavigate, useParams } from 'react-router';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import usePostData from '../../Apis/usePostData';
import useGetData from '../../Apis/useGetData';
import useUpdateData from '../../Apis/useUpdate';
import useGetById from '../../Apis/useGetById';
import SubmitButton from '../../Components/Buttons/SubmitButton';
import CancelButton from '../../Components/Buttons/CancelButton';
import useFormNavigation from '../../Components/FormNavigation';
import { useBeforeUnload } from '../../Components/usePromptHook';


const initialValues = {
  name: "",
  companyId: '',
  companyName: "tes01",
  accountNumber: "",
  balance: '',
  isActive: true,
};

const BankForm = () => {
  const { postdata } = usePostData('Bank/Add');
  const { data } = useGetData(`Company/GetAll?IsDeleted=${false}`);
  const { updateData } = useUpdateData('Bank/Update');
  const { GiveId, dataByid } = useGetById('Bank/GetById/');
  const {  formDirty,setFormDirty } = useLayouData();
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const paramId = useParams();
  const formref = useFormNavigation();



  useEffect(() => {
    if (paramId?.id) {
      setEditMode(true);
      GiveId(paramId?.id);
    
    }

   

  }, [paramId?.id,formDirty]);


const handleFormChange=(formik)=>
  {



    const keys = Object.keys(formik.values)
    const valuesofFormik = keys.map((item)=>formik.values[item])
    const valuesofInitialvalue = keys.map((item)=>initialValues[item])
     setFormDirty(true)

  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('required'),
    companyId: Yup.string().required('required'),
    accountNumber: Yup.string().required('required'),
    balance: Yup.string().required('required'),
  });

  const handleSubmit = async (formik) => {
    if (editMode) {
      await updateData(formik.values);
      navigate('/bank');
    } else {
      await postdata(formik.values, 'Bank');
    }

    document.getElementById('name').focus();
    formik.resetForm();
  };

  return (
    <>
      <div className='px-[50px] '>
    
        <div>
          <h2 className='font-inter font-semibold text-[30px]'>{editMode ? 'Update' : 'Add'} Bank</h2>
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
            <Form onChange={() => handleFormChange(formik)} ref={formref} className='grid grid-cols-2 gap-[90px]'>
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
                    <label className="block py-[5px] font-[500] font-inter ">Company <span className='text-redclr'>*</span></label>
                    <Field type="text"
                      name="companyId"
                      as='select'
                      id='companyId'
                      className="w-[100%] border-[1px] px-[8px] py-[8px] outline-none border-borderclr"
                      placeholder=""
                    >
                      <option disabled value="">
                        select company
                      </option>
                      {data?.map((item) => (
                        <option key={item?.id} value={item?.id}>{item?.name}</option>
                      ))}
                    </Field>
                    <ErrorMessage component="div" className="error" name="companyId" />
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-[20px]'>
                  <div className='py-[8px]'>
                    <label className='block py-[8px] font-[500] font-inter '>Account Number <span className='text-redclr'>*</span></label>
                    <Field
                      className='border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr '
                      name='accountNumber'
                      id='accountNumber'
                    />
                    <ErrorMessage component='div' className='text-[14px] text-redclr ' name='accountNumber' />
                  </div>
                  <div className='py-[8px]'>
                    <label className='block py-[8px] font-[500] font-inter '>Balance <span className='text-redclr'>*</span></label>
                    <Field
                      className='border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr '
                      name='balance'
                      type='number'
                      id='balance'
                    />
                    <ErrorMessage component='div' className='text-[14px] text-redclr ' name='balance' />
                  </div>
                </div>

                <div className="py-[6px]">
                  <div role="group">
                    <label className='block py-[8px] font-[500] font-inter '> Active </label>
                    <div>
                      <label className=""> <Field className='mx-[5px]' type="radio" id='isActive' name="isActive" checked={formik.values.isActive === true} value={true}
                        onChange={() => formik.setFieldValue('isActive', true)} />Yes</label>
                      <label className="ml-[10px]"><Field className='mx-[5px]' type="radio" id='isActive'
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            document.getElementById('btnsubmit').focus();
                          }
                        }} name="isActive" checked={formik.values.isActive === false} value={false}
                        onChange={() => formik.setFieldValue('isActive', false)} /> No</label>
                    </div>
                    <ErrorMessage component="div" className='text-[14px] text-redclr ' name="isAllBranchApplicable" />
                  </div>
                </div>

                <div className=' mt-[40px] flex gap-[20px] justify-end'>
                  <CancelButton link='/bank' />
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
  );
};

export default BankForm;
