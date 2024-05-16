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
import { useParams } from 'react-router';

const FiscalYearForm = () => {

  const {postdata} = usePostData('FiscalYear/Add')
  const {data}= useGetData('FiscalYear/GetAll')
  const {updateData} = useUpdateData('FiscalYear/Update')
  const {GiveId,dataByid}= useGetById('FiscalYear/GetById/')
  const {setId,getId}= useLayouData();
  const [editMode,setEditMode]= useState(false)
  const [editData,seteditData]= useState('')
  const dispatch = useDispatch();
  const paramId = useParams()




  useEffect(()=>
  {
    if(paramId?.id )
    {
  setEditMode(true)
  GiveId(paramId?.id)
    }   
  },[paramId?.id])


  const initialValues = {
    code: '',
    name: '',
    startDate: '',
    endDate: '',
    isActive: true 
  };

  const validationSchema = Yup.object().shape({
    // code: Yup.string().typeError('enter number').required('required'),
    name: Yup.string().typeError('enter number').required('required'),
  });


  const handleSubmit = async (values) => {
    values.startDate = moment(values.startDate).toDate();
    values.endDate = moment(values.endDate).toDate();
    console.log(values)
    if(editMode)
    { updateData(values) }
    else 
    {  await postdata(values) }
    
    dispatch(addMenu({ id:'', menu:'fiscalyeartable'}))
    setId('')
    
  };

  return (
    <>
      <div className='px-[50px]'>
        <div>
          <h2 className='font-inter font-semibold text-[30px]'>{editMode ? 'Update' : 'Add'} Fiscal Year</h2>
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
                  <label className='block py-[5px] font-[500] font-inter '>Fiscal Year Name <span className='text-redclr'>*</span></label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                 
                    name='name'
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr' name='name' />
                </div>

                <div className='py-[8px]'>
                  <label className='block py-[5px] font-[500] font-inter '>Code</label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr cursor-not-allowed'
                    disabled
                    name='code'
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr ' name='code' />
                </div>

                <div className='grid grid-cols-2 gap-[20px]'>
                  <div className='py-[8px]'>
                    <label className='block py-[8px] font-[500] font-inter '>Start Date AD</label>
                    <Field
                      className='border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr '
                      name='startDate'
                      type='date'
                    />
                    <ErrorMessage component='div' className='text-[14px] text-redclr ' name='startDate' />
                  </div>
                  <div className='py-[8px]'>
                    <label className='block py-[8px] font-[500] font-inter '>End Date AD</label>
                    <Field
                      className='border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr '
                      name='endDate'
                      type='date'
                    />
                    <ErrorMessage component='div' className='text-[14px] text-redclr ' name='endDate' />
                  </div>
                </div>

              
                   <div className="py-[6px]">
                    <div role="group">
                       <label className='block py-[8px] font-[500] font-inter '>  Active</label>
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
                <CancelButton onClick={()=>dispatch(addMenu({ id:'', menu:'fiscalyeartable'}))} className=' border-[1px] border-redclr px-[15px] py-[4px] text-redclr font-inter' text='Cancel' type='button' />
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

export default FiscalYearForm;
