import { Formik ,Form, Field, ErrorMessage} from 'formik'
import React,{useState} from 'react'
import * as Yup from "yup";
import DatePicker from 'react-date-picker';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import{ CancelButton, GreenButton }from '../../Components/GreenButton';
const FiscalYearForm = () => {
    const [startDate, setStartDate] = useState('');

    // Function to format the date with dashes
    const handleDateChange = (e) => {
        let inputDate = e.target.value;
        // Remove non-numeric characters
        inputDate = inputDate.replace(/\D/g, '');
    
        // Insert dashes after the year, month, and date
       
            if (inputDate.length >= 4) {
                inputDate = inputDate.slice(0, 4) + '-';
              }
              if (inputDate.length >= 6) {
                inputDate = inputDate.slice(0, 7) + '-';
              }
              if (inputDate.length >= 8) {
                inputDate = inputDate.slice(0, 10);
              }
        
        
    
        setStartDate(inputDate);
      };
    
    const initialValues ={
        code:'',
        fullName:'',
        fromDate:Date.now(),
        toDate:Date.now(),
        isSettled:''
    }
    console.log(initialValues)

    const validationSchema = Yup.object().shape({
        code: Yup.string().required('required'),
        fullName: Yup.string().required('required'),
        fromDate: Yup.string().required('required'),
        toDate: Yup.string().required('required'),
    });
   

  
  return (
   <>
   <div className='px-[50px]'>
    <div>
        <h2 className='font-inter font-semibold text-[30px]'>Add Fiscal Year</h2>
    </div>

    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={()=>
    {
        console.log('hello')

    }}
    >
        {(formik)=>(
            <Form onSubmit={formik.handleSubmit} className='grid grid-cols-2 gap-[90px '>
                <div className=''>
                <div className='py-[8px]'>
                    <label className='block py-[5px] font-[500] font-inter '>Fiscal Year Name</label>
                    <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                    type='text'
                    name='fullname'
                    />
                    <ErrorMessage component='div' className='error' name='fullname'/>
                </div>

                <div className='py-[8px]'>
                    <label className='block py-[5px] font-[500] font-inter '>Code</label>
                    <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                   type='text'
                    name='code'
                    />
                    <ErrorMessage component='div' className='text-[14px] text-redclr ' name='code'/>
                </div>


                <div className='grid grid-cols-2 gap-[20px]'>
                <div className='py-[8px]'>
                    <label className='block py-[8px] font-[500] font-inter '>Start Date AD</label>
                    <Field
                    className='border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr '
                    name='fromdate'
                    type='date'
                    />
                    <ErrorMessage component='div' className='text-[14px] text-redclr ' name='fromdate'/>
                </div>
                <div className='py-[8px]'>
                    <label className='block py-[8px] font-[500] font-inter '>End Date AD</label>
                    <Field
                    className='border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr '
                    name='todate'
                    type='date'
                    />
                    <ErrorMessage component='div' className='text-[14px] text-redclr ' name='todate'/>
                </div>
                </div>


                <div className='grid grid-cols-2 gap-[20px]'>
                <div className='py-[8px]'>
                    <label className='block py-[8px] font-[500] font-inter '>Start Date BS</label>
                   <Field
                 type='date'
                   id="startDate"
                   name="fromdate"
                   value={startDate}
                   onChange={handleDateChange}
                   placeholder="YYYYMMDD"
                   />
 <input type="text" name="date" id="date"
            pattern="\d{4}-\d{2}-\d{2}" required
           />                   
                    
                    <ErrorMessage component='div' className='text-[14px] text-redclr ' name='fromdate'/>

                    
                </div>
                <div className='py-[8px]'>
                    <label className='block py-[8px] font-[500] font-inter '>End Date BS</label>
                    <Field
                    className='border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr '
                    name='todate'
                   
                    />
                    <ErrorMessage component='div' className='text-[14px] text-redclr ' name='todate'/>
                </div>
                </div>

                <div className="py-[6px]">
                  <div role="group">
                    <label className='block py-[8px] font-[500] font-inter '>
                      Active <span>*</span>
                    </label>
                    <div>
                      <label className="">
                        <Field className='mx-[5px]' type="radio" name="isActive" value={true}  />
                        Yes
                      </label>
                      <label className="ml-[10px]">
                        <Field className='mx-[5px]' type="radio" name="isActive" value={false} />
                        No
                      </label>
                    </div>
                    <ErrorMessage
                      component="div"
                      className="error"
                      name="isActive"
                    />
                  </div>
                </div>

                <div className=' mt-[40px] flex gap-[20px]'>
                    <button className='bg-PrimaryColor px-[15px] py-[4px] text-white font-inter' type='submit' > Save </button>
                    <CancelButton className=' border-[1px] border-redclr px-[15px] py-[4px] text-redclr font-inter' text='Cancel' type='button' />
                </div>
                       




                </div>

            </Form>
        )}

    </Formik>
   </div>
   </>
  )
}

export default FiscalYearForm