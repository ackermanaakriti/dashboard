import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { CancelButton, GreenButton } from '../../Components/GreenButton';
import { useDispatch, useSelector } from 'react-redux';
import { useLayouData } from '../../Context/MainLayoutContext';
import { addMenu } from '../../Redux/TopTabSlice';
import VoucherDetailform from './VoucherDetailForm';
import usePostData from '../../Apis/usePostData';
import useGetById from '../../Apis/useGetById';
import useGetData from '../../Apis/useGetData';
import { useNavigate, useParams } from 'react-router';


const Voucher = () => {


  const {setId,getId,}= useLayouData(); //getting id from the list using context api
  const dispatch = useDispatch();
  const {postdata} = usePostData('Voucher/UpSert')
  const {GiveId,dataByid}= useGetById('Voucher/GetById/')
  const [detailformError,setDetailformError]= useState()
  const [voucherType,setVouhcerType]= useState([])
  const {data}= useGetData(`VoucherType/GetAll?IsDeleted=${false}`)
  const [vouhcerDetailData,setVoucherDetailData]= useState([])  //state to hold voucherformDetail data
  const [editMode,setEditMode]= useState(false)
const [debCredAmount,setdebCredAmount]= useState(null)
const navigate = useNavigate()
const paramId = useParams()

 

  useEffect(()=>
  {
    if(paramId?.id)
    {setEditMode(true)
     GiveId(paramId?.id) 
      //passing id to the getbyid  hook
    }  



  },[paramId?.id,vouhcerDetailData])

  
  console.log(debCredAmount)
  const initialValues = {  
  fiscalYearId: 1,
 // fiscalYearName: "",
  // voucherCode: null,
  voucherNumber: "",
  voucherTypeId: '',
 voucherTypeName: "sdfs",
  transactionDateBS: "2024-04-28T04:59:21.347Z",
  narration: "",
  moduleId: 1,
  branchId: 1,
  invoiceNumber: "",
  approvedDate: "2024-04-28T04:59:21.347Z",
  approvedBy: 0,
  transactionDate: "2024-04-28T04:59:21.347Z",
  isVoid: true,
  isActive: true
  };
 

  const validationSchema = Yup.object().shape({
    // voucherTypeId: Yup.string().typeError('').required('required'),
    // voucherNumber: Yup.number().typeError('invalid data').required('required'),
    // narration: Yup.string().required('required'),
    // invoiceNumber: Yup.number().typeError('invalid data').required('required'),
  });
  
 


  const handleSubmit = (values) => {
    if (debCredAmount) {
      // Combining voucherform and vocherdetail form data
      if (editMode) {
        const mergedData = [...values.voucherDetailDTOs, ...vouhcerDetailData];
        const combinedData = { ...values, voucherDetailDTOs: mergedData };
        postdata(combinedData);
      } else {
        const combinedData = { ...values, voucherDetailDTOs: vouhcerDetailData };
        postdata(combinedData);
      }
      navigate('/voucher')
    } else {
      setDetailformError("Please ensure debCredAmount is true before submitting.");
    }
  };
  
  return (
    <>
      <div className='px-[50px] pb-[120px]'>
        <div>
          {/* <h2 className='font-inter font-semibold text-[30px] text-center'>{editMode ? 'Update' : 'Add'} Voucher </h2> */}
          <h4 className='text-[18px] font-semibold text-center my-[10px]'>Voucher </h4>
        </div>

        <Formik
          initialValues={editMode ? dataByid : initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {(formik) => (
            <Form className='bg-[#e8fcfc] pb-[10px]'>
              <div className=' w-[70%] flex flex-col justify-center m-auto' >
                <div className='grid grid-cols-3 gap-[10px]'>

                <div className='py-[8px]'>
                  <label className='block py-[5px] font-[500] font-inter '>Voucher Type</label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                    type='text'
                   disabled={editMode}
                    name='voucherTypeId'
                    as='select'>
                    <option disabled selected value=''>  Select Voucher Type</option>
                    {data?.data?.map((item,index)=>(
                    <option value={item?.id}>{item?.name}</option>
                    ))}
                  </Field>
                  <ErrorMessage component='div' className='text-[14px] text-redclr' name='voucherTypeId' />
                </div>

                <div className='py-[8px]'>
                  <label className='block py-[5px] font-[500] font-inter '>Voucher Number</label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr  cursor-not-allowed'
                    type='text'
                    disabled
                    name='voucherNumber' />
                  <ErrorMessage component='div' className='text-[14px] text-redclr ' name='voucherNumber' />
                </div>

                
                <div className='py-[8px]'>
                  <label className='block py-[5px] font-[500] font-inter '>Invoice Number</label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                    type='text'
                    name='invoiceNumber'/>
                  <ErrorMessage component='div' className='text-[14px] text-redclr ' name='invoiceNumber' />
                </div></div>


                <div className='grid grid-cols-3 gap-[20px] items-center'>
                  <div className='py-[8px]'>
                    <label className='block py-[8px] font-[500] font-inter '> Date AD</label>
                    <Field
                      className='border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr '
                      name='transactionDate'
                      type='date'
                    />
                    {/* <ErrorMessage component='div' className='text-[14px] text-redclr ' name='transactionDate' /> */}
                  </div>
                  <div className='py-[8px]'>
                    <label className='block py-[8px] font-[500] font-inter '> Date BS</label>
                    <Field
                      className='border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr '
                      name='transactionDateBS'
                      type='date'
                    />
                    {/* <ErrorMessage component='div' className='text-[14px] text-redclr ' name='transactionDateBS' /> */}
                  </div>
                  <div className='py-[8px]'>
                  <label className='block py-[8px] font-[500] font-inter '>narration</label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                    type='text'
                    name='narration'
                   
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr' name='narration' />
                </div>
                </div>

              </div>
              <div className=' mt-[10px] flex gap-[20px] justify-end  absolute right-[2em] bottom-[70px]'>
                    <CancelButton onClick={() =>  navigate('/voucher')
                    } className='border-[1px] border-redclr px-[15px] py-[4px] text-redclr font-inter' text='Cancel' type='button' />
                  <button   className='bg-PrimaryColor px-[15px] py-[4px] text-white font-inter' type='submit' > 
                  {editMode ? 'Update': 'Save'} </button>
                 </div>

                  </Form>
                 )}

         </Formik>
        <div className='relative'>
        <VoucherDetailform
        onDataSubmit={setVoucherDetailData}
         dataByid={dataByid} 
         setDetailformError={setDetailformError}
         editMode={editMode}
        setdebCredAmount={setdebCredAmount}
         />
        </div>
 </div>
    </>
  )
}

export default Voucher;
