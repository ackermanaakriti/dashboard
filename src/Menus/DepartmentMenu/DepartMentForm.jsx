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
import useGetData from '../../Apis/useGetData';

const DepartmentForm = () => {

  const {postdata}= usePostData('Department/Add')
  const {GiveId,dataByid} = useGetById('Department/GetById/')
  const {updateData} = useUpdateData('Department/Update')
  const {data}= useGetData('Company/GetAll')
  const {setId,getId}= useLayouData();
  const [editMode,setEditMode]= useState(false)
  const dispatch = useDispatch();

  

  useEffect(()=>
  { if(getId)
        {
      setEditMode(true)
       GiveId(getId) }},
       [setId])

  const initialValues = {
    name: '',
    code: '',
    description: '',
    companyId: '',
    isActive: true ,
    companyName:'sdfkjsd'
   
  };

  const validationSchema = Yup.object().shape({
    // description: Yup.number().typeError('enter number').required('required'),
    companyId: Yup.number().typeError('enter number').required('required'),
    name: Yup.string().required('required'),
    // code: Yup.string().required('required'),
    // syPlacement: Yup.string().required('required'),
  });


  const handleSubmit = (values) => {
    
    console.log(values)
    if(editMode)
    {updateData(values)
    console.log(values)}
    else 
    { postdata(values)}
    addMenu({ id: "", menu: "departmenttable" })
    setId('')
  };

  return (
    <>
      <div className='px-[50px]'>
        <div>
          <h2 className='font-inter font-semibold text-[30px]'> {editMode ? 'Update': 'Add'} Department </h2>
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
                  <label className='block py-[5px] font-[500] font-inter '>Code</label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                    type='text'
                    name='code'
                    disabled
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr ' name='code' />
                </div>
                <div className="py-[5px]">
                  <label className="block py-[5px] font-[500] font-inter">Company <span className='text-redclr'>*</span></label>
                  <Field type="text"
                    name="companyId"
                    as='select'
                 
                    className="w-[100%] border-[1px] px-[8px] py-[8px] outline-0 border-borderclr"
                    placeholder=""
                    // value={CompanyAutofillData}
                    // onChange={(e) => setCompanyAutofillData((e.target.value))}
                    
                  >
                    <option disabled value="">
                        select company
                      </option>
                      {data?.data?.map((item, index) => (
                        <option key={item?.id} value={item?.id}>{item?.name}</option>
                      ))}

                  </Field>
                  <ErrorMessage component="div" className="error" name="companyId" />
                </div>

                <div className=''>
                  <div className='py-[8px]'>
                    <label className='block py-[8px] font-[500] font-inter '>Description</label>
                    <Field
                      className='border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr '
                      name='description'
                      type='text'
                      as='textarea'
                    />
                    <ErrorMessage component='div' className='text-[14px] text-redclr ' name='description' />
                  </div>
                
                </div>

               
             

              

                <div className=' mt-[40px] flex gap-[20px] justify-end'>
                <CancelButton onClick={()=>dispatch(addMenu({ id:'', menu:'departmenttable'}))} className=' border-[1px] border-redclr px-[15px] py-[4px] text-redclr font-inter' text='Cancel' type='button' />

                  <button onClick={()=>dispatch(addMenu({ id:'', menu:'departmenttable'}))}  className='bg-PrimaryColor px-[15px] py-[4px] text-white font-inter' type='submit' > 
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

export default DepartmentForm;
