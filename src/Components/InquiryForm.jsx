import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { useLayouData } from '../Context/MainLayoutContext';
import { Formik } from 'formik';
import * as Yup from 'yup'
import { RxCrossCircled } from "react-icons/rx";



const InquiryForm = () => {
  const {hanleInquiry,
    setHandleInquiry,
    } = useLayouData();
  const handleInquiry =()=>
  {
       setHandleInquiry(!hanleInquiry)
  }
  return (
    <div>
       {hanleInquiry && (
        <div className="h-[50px]  w-[50%] inquirydiv">
          <Formik initialValues={{
            fullname:'',
            email:'',
          
            message:'',
           
          }}
          validationSchema={Yup.object().shape({
            fullname:Yup.string().required('required'),
            email:Yup.string().email('invalid email'),
           
            message:Yup.string().required('required'),
         

          })}
          onSubmit={(values) => {
            console.log("Form values:", values); // Add this line to check if onSubmit is called
          }}
          >
            {formik=>(
                 <form onSubmit={formik.handleSubmit}>
                 <span className="close" onClick={handleInquiry}>
                   <RxCross2/>
                 </span>
                 
                  <div className='input-wrap '>
                   <label>Name:</label>
                   <input name='fullname' value={formik.values.fullname} onChange={formik.handleChange} />
                 </div>
                 <div className='input-wrap '>
                   <label>Email:</label>
                   <input name='email' value={formik.values.email} onChange={formik.handleChange} />
                 </div>
                 <div className='input-wrap '>
                   <label>Message:</label>
                   <textarea name='message' value={formik.values.message} onChange={formik.handleChange} ></textarea>
                 </div>
                 <div className='fomrbtn'>  <button type="submit">Submit</button>
                          </div>
               </form>
            )}
          </Formik>
       
        </div>
      )}
        {hanleInquiry && (      <div className="overlay-black" onClick={()=>{setHandleInquiry(false)}}></div>)}
    </div>
  )
}

export default InquiryForm