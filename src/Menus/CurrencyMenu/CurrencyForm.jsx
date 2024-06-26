import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { CancelButton, GreenButton } from '../../Components/GreenButton';
import { useDispatch, useSelector } from 'react-redux';
import { useLayouData } from '../../Context/MainLayoutContext';
import { addMenu } from '../../Redux/TopTabSlice';
import usePostData from '../../Apis/usePostData';
import useGetById from '../../Apis/useGetById';
import useUpdateData from '../../Apis/useUpdate';
import { useNavigate, useParams } from 'react-router';
import useFormNavigation from '../../Components/FormNavigation';

const CurrencyForm = () => {

  const {postdata}= usePostData('Currency/Add')
  const {GiveId,dataByid} = useGetById('Currency/GetById/')
  const {updateData} = useUpdateData('Currency/Update')
  const {setId,getId}= useLayouData();
  const [editMode,setEditMode]= useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const paramId = useParams()
  const formref = useFormNavigation()
  const [isDirty, setIsDirty] = useState(false);

  

  useEffect(()=>
  {
    
    
    if(paramId?.id)
        {
      setEditMode(true)
       GiveId(paramId?.id) }},
       [paramId?.id])

  const initialValues = {
    name: '',
    country: '',
    currencyCode: '',
    currentExchangeRate: 500,
    isActive: true ,
    isLocalCurrency: true
  };

  const validationSchema = Yup.object().shape({
    currencyCode: Yup.number().typeError('enter number').required('required'),
    currentExchangeRate: Yup.number().typeError('enter number').required('required'),
    name: Yup.string().required('required'),
    // country: Yup.string().required('required'),
    // syPlacement: Yup.string().required('required'),
  });


  const handleSubmit = (values) => {
    
    
    if(editMode)
    {updateData(values)
    }

    else 
    { postdata(values)}
   navigate('/company')
  };

  return (
    <>
      <div className='px-[50px]'>
        <div>
          <h2 className='font-inter font-semibold text-[30px]'> {editMode ? 'Update': 'Add'} Currency</h2>
        </div>

        <Formik
          initialValues={editMode ? dataByid : initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {(formik) => (
            <Form ref={formref} className='grid grid-cols-2 gap-[90px]'>
              <div className=''>
                <div className='py-[8px]'>
                  <label className='block py-[5px] font-[500] font-inter '>Name <span className='text-redclr'>*</span></label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                    type='text'
                    name='name'
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr' name='name' />
                </div>

                <div className='py-[8px]'>
                  <label className='block py-[5px] font-[500] font-inter '>Country <span className='text-redclr'>*</span></label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                    type='text'
                    name='country'
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr ' name='country' />
                </div>

                <div className='grid grid-cols-2 gap-[20px]'>
                  <div className='py-[8px]'>
                    <label className='block py-[8px] font-[500] font-inter '>Symbol <span className='text-redclr'>*</span></label>
                    <Field
                      className='border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr '
                      name='currencyCode'
                      type='text'
                    />
                    <ErrorMessage component='div' className='text-[14px] text-redclr ' name='currencyCode' />
                  </div>
                  <div className='py-[8px]'>
                    <label className='block py-[8px] font-[500] font-inter '>Symbol Align</label>
                    <Field
                      className='border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr '
                      name='syPlacement'
                      type='text'
                      as='select'
                    >
                      <option value='left'>Left</option>
                      <option value='Right'>Right</option>


                    </Field>
                    <ErrorMessage component='div' className='text-[14px] text-redclr ' name='syPlacement' />
                  </div>
                </div>

               
                 <div className='py-[8px]'>
                  <label className='block py-[5px] font-[500] font-inter '>Current Exchange Rate</label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                    type='text'
                    name='currentExchangeRate'
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr' name='currentExchangeRate' />
                </div>

                <div className="py-[6px]">
                                    <div role="group">
                                            <label className='block py-[8px] font-[500] font-inter '> Local Currency </label>
                                            <div>
                                                <label className=""> <input className='mx-[5px]' type="radio"  name="isLocalCurrency"  checked={formik.values.isLocalCurrency === true} value={true}
                                               onChange={() => formik.setFieldValue('isLocalCurrency', true)} />Yes</label>
                                                <label className="ml-[10px]"><input className='mx-[5px]' type="radio" name="isLocalCurrency" checked={formik.values.isLocalCurrency === false} value={false}
                                                  onChange={() => formik.setFieldValue('isLocalCurrency', false)} /> No</label>
                                            </div>
                                            <ErrorMessage component="div" className='text-[14px] text-redclr ' name="isAllBranchApplicable" />
                                        </div>
                                    </div>


                <div className=' mt-[40px] flex gap-[20px] justify-end'>
                <CancelButton onClick={()=>navigate('/company')} className=' border-[1px] border-redclr px-[15px] py-[4px] text-redclr font-inter' text='Cancel' type='button' />

                  <button   className='bg-PrimaryColor px-[15px] py-[4px] text-white font-inter' type='submit' > 
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

export default CurrencyForm;
