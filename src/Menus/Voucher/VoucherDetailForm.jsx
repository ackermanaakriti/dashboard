// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import React, { useEffect, useRef, useState } from 'react';
// import * as Yup from 'yup'; import Voucher from './VoucherForm'
// import { v4 as uuidv4 } from 'uuid';
// import { useDispatch, useSelector } from 'react-redux';
// import { useLayouData } from '../../Context/MainLayoutContext';
// import { addVoucherDetail, editvoucherDetail } from '../../Redux/Slices/VoucherSlice';
// import { addVoucher, addVoucherType, editvouchertype } from '../../Redux/Slices/VoucherSlice';
// import { addMenu } from '../../Redux/TopTabSlice';
// import { IoMdAddCircleOutline } from "react-icons/io";
// import VoucherDetailTable from './VoucheDetailTable';
// import useGetData from '../../Apis/useGetData';
// import usePostData from '../../Apis/usePostData';
// import { editAccountgrp } from '../../Redux/Slices/AccountGroupSlice';
// import Select from 'react-select';
// import useFormNavigation from '../../Components/FormNavigation';



// const VoucherDetailform = ({ onDataSubmit, dataByid,editMode,setdebCredAmount ,setChildRef },) => {
// const idforTable = uuidv4();
//   const { postdata } = usePostData('VoucherDetail/Add')
//   const { data } = useGetData(`ChartOfAccount/GetAll?ShowTransactionalOnly=${false}`)
//   // const [editMode, setEditMode] = useState(false)
//   const [editData, seteditData] = useState([]);
//   const [detaildata, setdetailData] = useState([])
//   const [isamount, setisAmount] = useState(false);
//   const [d, setD] = useState([])
//   const [selectedChartOfAccount, setSelectedChartOfAccount] = useState([]); // State to store the selected ChartofAccount
// const [hiddenCharofAccdata,setHiddenChartofAccData]= useState([])
//   const firstFieldRef = useRef()
//   const formref = useFormNavigation()
//   const [dataforvoucherDetailtable,setDataforvoucherDetailtable] = useState([])
//   const [hideSelectedCharofAcc,setHideSelectedChartofAcc]= useState(true)
//   const [CharofAccInitialData,setchartofAccInitialData]= useState([])


//   useEffect(() => {
//     // Pass the childRef to the parent component
//     setChildRef(firstFieldRef);
//     console.log(data)
// setchartofAccInitialData(data)
// console.log(CharofAccInitialData)
//   }, [data]);



//   const initialValues = {

//     // voucherId: 0,
//     chartOfAccountId: '',
//     // code: "",
//     chequeNumber: "",
//     // voucherNumber: "",
//     // debitAmount: 0,
//     // creditAmount: 0,
//     narration: "",
//     exchangeRate: 0,
//     currencyId: 1,
//     currencyName:'Nepal',
//     // accountName: "",
//     // currencyName: "",
//     isActive: true,
//     chartOfAccountAccountName: '',


//   };


//   const validationSchema = Yup.object().shape({
//     chartOfAccountId: Yup.string().required('required'),
//     // debitAmount: Yup.number().typeError('enter number').required('required'),
//     // creditAmount: Yup.number().required('required'),
//     // narration: Yup.string().required('required'),
//     Amount: Yup.number().required('required'),
//     // isAmount : Yup.boolean().required('required'),
//     // chequeNumber: Yup.number().required('required')

//   });
//   const handleChartOfAccountChange = (event, formik) => {
  
//     const selectedOption = data?.find(item => item?.id.toString() === event.target.value);
//     setSelectedChartOfAccount(selectedOption);
//     formik.setFieldValue('chartOfAccountId',selectedOption?.id ); // Update the formik field value
//     formik.setFieldValue('chartOfAccountAccountName',selectedOption?.accountName ); // Update the formik field value
  
//     // if( !hideSelectedCharofAcc)
//     //   {
//     //      const filteredchartofAcc = data?.filter(item=>item?.id.toString() !== event.target.value)
//     //      console.log(filteredchartofAcc)
//     //      setchartofAccInitialData(filteredchartofAcc)
//     //      console.log(hiddenCharofAccdata)
         
//     //   }
//   };

 
 

//   const handleSubmit = async (values, { resetForm ,setFieldValue}) => {
   
//     setHideSelectedChartofAcc(false)
//       const VoucherDataiwthNoId = { ...values, debitAmount: isamount ? values.Amount : 0, creditAmount: isamount ? 0 : values.Amount };
//       console.log(VoucherDataiwthNoId)
     
//       if (editMode) {
//         const dataWithId = {...VoucherDataiwthNoId, id: 0, voucherId:dataByid.id}
//         setD(prevD => [...prevD, dataWithId])
//         seteditData([...d,dataWithId]);
//         onDataSubmit([...d,dataWithId]);
        
//       } else {
//         setD(prevD => [...prevD, VoucherDataiwthNoId]);
//         setdetailData([...d,VoucherDataiwthNoId]);
//         onDataSubmit([...d, VoucherDataiwthNoId]);
//         const datawidhId = {...VoucherDataiwthNoId,  voucherId:idforTable} //delete ko lagi with id voucherdetail table ma pathako
//        setDataforvoucherDetailtable([...d,datawidhId])
//       }
//       // Reset the form
//       resetForm();
//       setFieldValue('Amount',values.Amount)
//       setisAmount(prevIsAmount => !prevIsAmount);
//       document.getElementById('chartofaccount').focus()
//     } 

  

//   return (
//     <>
//       <div className=' '>


//         {/* <div className='pt-[20px]'>
//           <h4 className='text-[18px] font-semibold text-center my-[10px]'>Voucher Detail</h4>
//         </div> */}
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={(values, { resetForm,setFieldValue }) => handleSubmit(values, { resetForm,setFieldValue })}
//           enableReinitialize={true}
//         >
//           {(formik) => (
//             <Form ref={formref} className='pt-[30px]'>
//               <div className=' w-[70%] flex flex-col justify-center m-auto' >
//                 <div className='grid grid-cols-4 gap-[20px]'>
//                   <div className='py-[8px]'>
//                     <label className='block py-[5px] font-[500] font-inter '>ChartofAccount</label>
//                     <Field
//                       innerRef={firstFieldRef}
//                       as='select'
//                       id='chartofaccount'
//                       name='chartOfAccountId'
//                       value={selectedChartOfAccount.id}
//                       className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr'
//                       onChange={(event) => {
//                         formik.handleChange(event); // This ensures that Formik handles the change event
//                         handleChartOfAccountChange(event,formik); // Your custom handler
//                       }}
//                     >
//                       <option value='' selected >Select ChartofAccount</option>
//                       { CharofAccInitialData?.map((item, index) => (
//                         <option key={index} value={item.id}>{item.accountName}</option>
//                       ))}
//                     </Field>
                     
//                     <ErrorMessage component='div' className='text-[14px] text-redclr' name='chartOfAccountId' />
//                   </div>
               


//                   <div className="py-[8px]">
//                     <div role="group">
//                       <label className='block py-[8px] font-[500] font-inter '> Type <span>*</span></label>
//                       <div>
//                         <label className=""> <Field className='mx-[5px]' id='isamounttrue'     type="radio" name="isAmount" value={true}
//                           onChange={() => setisAmount(true)}  checked={isamount} />Debit</label>
//                         <label className="ml-[10px]"><Field className='ml-[30px]' id='isamountfalse' type="radio"     name="isAmount" value={false}
//                           onChange={() => setisAmount(false)} checked={!isamount} /> Credit</label>
//                       </div>
//                       <ErrorMessage component="div" className='text-[14px] text-redclr ' name="isAmount" />
//                     </div>
//                   </div>

//                   <div className='py-[8px]'>
//                     <label className='block py-[5px] font-[500] font-inter '> Amount</label>
//                     <Field
//                       className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
//                       type='number'
//                       name='Amount'
//                       id='amount'
                    
//                     //  onChange={(e)=>setAmount(e.target.value)}
//                     //  value={amount}
//                     />
//                     <ErrorMessage component='div' className='text-[14px] text-redclr ' name='Amount' />
//                   </div>

//                   <div className='py-[8px]'>
//                     <label className='block py-[5px] font-[500] font-inter '>Cheque Number</label>
//                     <Field
//                       className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
//                       type='text'
//                       name='chequeNumber'
//                       id='chequenumber'
                    
//                     />
//                     <ErrorMessage component='div' className='text-[14px] text-redclr ' name='chequeNumber' />
//                   </div>
//                 </div>




//                 <div className='py-[8px] grid grid-cols-7 '>
//                   <div className='col-span-6'>
//                     <label className='block py-[5px] font-[500] font-inter '>Remarks</label>
//                     <Field
//                       className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none  border-borderclr '
//                       type='text'
//                       name='narration'
//                       id='remarks'
                    
//                       onKeyDown={(e) => {
//                         if (e.key === 'Enter') {
//                           e.preventDefault();
//                           document.getElementById('btnsubmit').focus();
//                         }
//                       }}
//                     />
//                     <ErrorMessage component='div' className='text-[14px] text-redclr' name='narration' />
//                   </div>
//                   <div className='col-span-1 flex justify-center items-center'>
//                     <button id='btnsubmit' type='submit' className='text-[40px] text-PrimaryColor cursor-pointer pt-[15px]'><IoMdAddCircleOutline /></button>
//                   </div>
//                 </div>

//               </div>

//             </Form>
//           )}

//         </Formik>
//         <VoucherDetailTable dataByid={dataByid} editMode={editMode} editData={editData} dataforvoucherDetailtable ={dataforvoucherDetailtable} setdebCredAmount={setdebCredAmount} detaildata={detaildata} />
//       </div>

//     </>
//   )
// }

// export default VoucherDetailform

import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
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
import Select from 'react-select';
import useFormNavigation from '../../Components/FormNavigation';

const VoucherDetailform = ({ onDataSubmit, dataByid, editMode, setdebCredAmount, setChildRef }) => {
  const idforTable = uuidv4();
  const { postdata } = usePostData('VoucherDetail/Add');
  const { data } = useGetData(`ChartOfAccount/GetAll?ShowTransactionalOnly=${false}`);
  const [editData, seteditData] = useState([]);
  const [detaildata, setdetailData] = useState([]);
  const [isamount, setisAmount] = useState(false);
  const [d, setD] = useState([]);
  const [selectedChartOfAccount, setSelectedChartOfAccount] = useState([]);
  const firstFieldRef = useRef();
  const formref = useFormNavigation();
  const [dataforvoucherDetailtable, setDataforvoucherDetailtable] = useState([]);
  const [hideSelectedCharofAcc, setHideSelectedChartofAcc] = useState(true);
  const [CharofAccInitialData, setchartofAccInitialData] = useState([]);

  useEffect(() => {
    setChildRef(firstFieldRef);
    setchartofAccInitialData(data);
  }, [data]);

  const initialValues = {
    chartOfAccountId: '',
    chequeNumber: '',
    narration: '',
    exchangeRate: 0,
    currencyId: 1,
    currencyName: 'Nepal',
    chartOfAccountAccountName: '',
  };

  const handleChartOfAccountChange = (event) => {
    const selectedOption = data.find(item => item?.id.toString() === event.target.value);
    setSelectedChartOfAccount(selectedOption);
    console.log(selectedChartOfAccount)
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const values = {
      chartOfAccountId: formData.get('chartOfAccountId'),
      chequeNumber: formData.get('chequeNumber'),
      narration: formData.get('narration'),
      Amount: parseFloat(formData.get('Amount')),
      isAmount: formData.get('isAmount') === 'true',
    };

    // Constructing VoucherDataiwthNoId object
    const VoucherDataiwthNoId = { ...values, debitAmount: isamount ? values.Amount : 0, creditAmount: isamount ? 0 : values.Amount };
    console.log(VoucherDataiwthNoId);

    if (editMode) {
      const dataWithId = { ...VoucherDataiwthNoId, id: 0, voucherId: dataByid.id };
      setD(prevD => [...prevD, dataWithId]);
      seteditData([...d, dataWithId]);
      onDataSubmit([...d, dataWithId]);
    } else {
      setD(prevD => [...prevD, VoucherDataiwthNoId]);
      setdetailData([...d, VoucherDataiwthNoId]);
      onDataSubmit([...d, VoucherDataiwthNoId]);
      const datawidhId = { ...VoucherDataiwthNoId, voucherId: idforTable,chartOfAccountAccountName:selectedChartOfAccount?.accountName };
      setDataforvoucherDetailtable([...d, datawidhId]);
    }

    // Reset the form fields
    event.target.reset();
    setisAmount(false);
    document.getElementById('chartofaccount').focus();
  };

  return (
    <>
      <div className=''>
        <form ref={formref} onSubmit={handleSubmit} className='pt-[30px]'>
          <div className=' w-[70%] flex flex-col justify-center m-auto'>
            <div className='grid grid-cols-4 gap-[20px]'>
              <div className='py-[8px]'>
                <label className='block py-[5px] font-[500] font-inter '>ChartofAccount</label>
                <select
                  ref={firstFieldRef}
                  id='chartofaccount'
                  name='chartOfAccountId'
                  value={selectedChartOfAccount.id}
                  className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr'
                  onChange={(event) => {
                    handleChartOfAccountChange(event);
                  }}
                >
                  <option value=''>Select ChartofAccount</option>
                  {CharofAccInitialData?.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.accountName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="py-[8px]">
                <div role="group">
                  <label className='block py-[8px] font-[500] font-inter '> Type <span>*</span></label>
                  <div>
                    <label className=""> <input className='mx-[5px]' id='isamounttrue' type="radio" name="isAmount" value={true}
                      onChange={() => setisAmount(true)} checked={isamount} />Debit</label>
                    <label className="ml-[10px]"><input className='ml-[30px]' id='isamountfalse' type="radio" name="isAmount" value={false}
                      onChange={() => setisAmount(false)} checked={!isamount} /> Credit</label>
                  </div>
                </div>
              </div>

              <div className='py-[8px]'>
                <label className='block py-[5px] font-[500] font-inter '> Amount</label>
                <input
                  className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                  type='number'
                  name='Amount'
                  id='amount'
                />
              </div>

              <div className='py-[8px]'>
                <label className='block py-[5px] font-[500] font-inter '>Cheque Number</label>
                <input
                  className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                  type='text'
                  name='chequeNumber'
                  id='chequenumber'
                />
              </div>
            </div>

            <div className='py-[8px] grid grid-cols-7 '>
              <div className='col-span-6'>
                <label className='block py-[5px] font-[500] font-inter '>Remarks</label>
                <input
                  className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none  border-borderclr '
                  type='text'
                  name='narration'
                  id='remarks'
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      document.getElementById('btnsubmit').focus();
                    }
                  }}
                />
              </div>
              <div className='col-span-1 flex justify-center items-center'>
                <button id='btnsubmit' type='submit' className='text-[40px] text-PrimaryColor cursor-pointer pt-[15px]'><IoMdAddCircleOutline /></button>
              </div>
            </div>

          </div>
        </form>
        <VoucherDetailTable dataByid={dataByid}
         editMode={editMode}
          editData={editData} 
          dataforvoucherDetailtable={dataforvoucherDetailtable}
           setdebCredAmount={setdebCredAmount} 
           setDataforvoucherDetailtable={setDataforvoucherDetailtable}
           detaildata={detaildata} />
      </div>
    </>
  );
};

export default VoucherDetailform;
