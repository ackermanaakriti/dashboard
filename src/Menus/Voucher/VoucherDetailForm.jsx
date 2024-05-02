import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup'; import Voucher from './VoucherForm'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useLayouData } from '../../Context/MainLayoutContext';
import { addVoucherDetail, editvoucherDetail } from '../../Redux/Slices/VoucherSlice';
import { addVoucher, addVoucherType, editvouchertype } from '../../Redux/Slices/VoucherSlice';
import { addMenu } from '../../Redux/TopTabSlice';
import { IoMdAddCircleOutline } from "react-icons/io";
import VoucherDetailTable from './VoucheDetailTable';
import useGetData from '../../Apis/useGetData';
import usePostData from '../../Apis/usePostData';
import { editAccountgrp } from '../../Redux/Slices/AccountGroupSlice';



const VoucherDetailform = ({onDataSubmit,dataByid,setDetailformError}) => {
  const fiscaldata = useSelector((state) => state.voucherData.voucherDetail);


  const id =uuidv4();
  const {postdata} = usePostData('VoucherDetail/Add')
  const {data}= useGetData('ChartOfAccount/GetAll')


  const { setId, getId,voucherId,setVoucherId } = useLayouData();
  const [editMode, setEditMode] = useState(false)
  const [editData, seteditData] = useState();
  const[detaildata,setdetailData]= useState()
  const [isamount,setisAmount]= useState(false);
  const [d,setD] =useState([])
  const dispatch = useDispatch();


  useEffect(()=>
{
  if(dataByid)
  {
    setEditMode(true)
  }
},[dataByid])
 


  const initialValues = {
    // chartOfAccountId: '',
    // debitAmount: '', 
    // creditAmount: '', 
    // chequeNumber: '',
    // narration: '',
    // Amount:'',
    // voucherId:'',
    // code:'',
    // voucherNumber:'',
    // exchangeRate:'0',
    // currencyId:'',
    // accountName:'',
    // currencyName:''
    
      voucherId: 0,
      chartOfAccountId: 1,
      code: "",
      chequeNumber: "",
      voucherNumber: "",
      // debitAmount: 0,
      // creditAmount: 0,
      narration: "",
      exchangeRate: 0,
       currencyId: 1,
      // accountName: "",
      // currencyName: "",
      isActive: true


  };

  
  const validationSchema = Yup.object().shape({
    // chartOfAccountId: Yup.string().required('required'),
    // debitAmount: Yup.number().typeError('enter number').required('required'),
    // creditAmount: Yup.number().required('required'),
    narration: Yup.string().required('required'),
    Amount: Yup.number().required('required'),
    // isAmount : Yup.boolean().required('required'),
    chequeNumber: Yup.number().required('required')

  });

  



  // const handleSubmit = (values, { resetForm }) => {
  //   const VoucherDataId = { ...values ,debitAmount:isamount ? values.Amount : '0',   creditAmount: isamount ? '0' : values.Amount,};
  //   // postdata(VoucherDataId)
  //   setD(prevD => [...prevD, VoucherDataId])
  //   console.log(d)
  //   // onDataSubmit([...d, VoucherDataId]);
  //  console.log(VoucherDataId)
  //     // dispatch(addVoucherDetail(VoucherDataId))
  //     resetForm()

  // };

  const handleSubmit = (values) => {
    setDetailformError()
   
       const VoucherDataId = { ...values ,debitAmount:isamount ? values.Amount : 0,   creditAmount: isamount ? 0 : values.Amount,};

   
    if(editMode)
    {
      setD(prevD => [...prevD, VoucherDataId])
      seteditData([...d, VoucherDataId])
      onDataSubmit([...d, VoucherDataId]);
    }
    else 
    {
      setD(prevD => [...prevD, VoucherDataId])
      setdetailData([...d, VoucherDataId])
       onDataSubmit([...d, VoucherDataId]);
       dispatch(addVoucherDetail(VoucherDataId))
       

    }
  
   
  };
  return (
    <>
      <div className=' '>

     
        {/* <div className='pt-[20px]'>
          <h4 className='text-[18px] font-semibold text-center my-[10px]'>Voucher Detail</h4>
        </div> */}
        <Formik
          initialValues={ initialValues}
            validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
          enableReinitialize={true}
        >
          {(formik) => (
            <Form className='pt-[30px]'>
              <div className=' w-[70%] flex flex-col justify-center m-auto' >
                <div className='grid grid-cols-4 gap-[20px]'>
                  <div className='py-[8px]'>
                    <label className='block py-[5px] font-[500] font-inter '>ChartofAccount</label>
                    <Field
                      className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                      type='text'
                      name='chartOfAccountId'
                      as='select'
                    >
                      <option disabled selected value=''>Select ChartofAccount</option>
                      {data?.data?.map((item, index) =>
                      (
                        <option key={index} name='chartOfAccountId' value={parseInt(item?.id)}>{item?.accountName}</option>
                      ))}
                    </Field>
                    <ErrorMessage component='div' className='text-[14px] text-redclr' name='chartOfAccountId' />
                  </div>
                  <div className="py-[8px]">
                    <div role="group">
                      <label className='block py-[8px] font-[500] font-inter '> Type <span>*</span></label>
                      <div>
                        <label className=""> <input className='mx-[5px]' type="radio" name="isAmount"  value={true}
                          onChange={() => setisAmount(true)} />Debit</label>
                        <label className="ml-[10px]"><input className='ml-[30px]' type="radio" name="isAmount"  value={false}
                          onChange={() => setisAmount(false)} /> Credit</label>
                      </div>
                      <ErrorMessage component="div" className='text-[14px] text-redclr ' name="isAmount" />
                    </div>
                  </div>

                  <div className='py-[8px]'>
                    <label className='block py-[5px] font-[500] font-inter '> Amount</label>
                    <Field
                      className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                      type='number'
                      name='Amount'
                      //  onChange={(e)=>setAmount(e.target.value)}
                      //  value={amount}
                    />
                    <ErrorMessage component='div' className='text-[14px] text-redclr ' name='Amount' />
                  </div>

                  <div className='py-[8px]'>
                    <label className='block py-[5px] font-[500] font-inter '>Cheque Number</label>
                    <Field
                      className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                      type='text'
                      name='chequeNumber'
                    />
                    <ErrorMessage component='div' className='text-[14px] text-redclr ' name='chequeNumber' />
                  </div>
                </div>




                <div className='py-[8px] grid grid-cols-7 '>
                  <div className='col-span-6'>
                    <label className='block py-[5px] font-[500] font-inter '>Remarks</label>
                    <Field
                      className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none  border-borderclr '
                      type='text'
                      name='narration'
                     
                    />
                    <ErrorMessage component='div' className='text-[14px] text-redclr' name='narration' />
                  </div>
                  <div className='col-span-1 flex justify-center items-center'>
                    <button type='submit' className='text-[40px] text-PrimaryColor cursor-pointer pt-[15px]'><IoMdAddCircleOutline /></button>
                  </div>
                </div>

              </div>

            </Form>
          )}

        </Formik>
        <VoucherDetailTable dataByid={dataByid} editData={editData}/>
      </div>

    </>
  )
}

export default VoucherDetailform
