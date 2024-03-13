
import React from 'react'
import * as Yup from 'yup';
import { Formik,ErrorMessage } from 'formik';

const BranchForm = () => {
   
  return (
    <div className='Branchform '>
   <Formik
   initialValues={
    {
        name:'',
        branchname:'',
        Registrationno:'',
        contact:'',
        pan:'',
        address:'',
        billadd:'',
        shipadd:'',
        billcontact:'',
        
    }
   }
   validationSchema={Yup.object().shape(
    {
        name:Yup.string().required('required'),
        branchname:Yup.string().required('required'),
        Registrationno:Yup.string().required('required'),
        pan:Yup.string().required('required'),

    }
   )}
   onSubmit={(values)=>
{
    console.log(values)
}}
   >
    {formik=>(
      
        <form onSubmit={formik.handleSubmit} className='shadow-lg'>
            <div className='grid grid-cols-2 gap-[90px]'>
            <div>
           
                <div className='py-[10px]'>
                    <label className='block'>Name <span>*</span></label>
                    <input type='text' name='name' className='w-[100%]' placeholder='' onChange={formik.handleChange} value={formik.values.name}/>
                </div>

                <div className='py-[10px]'>
                    <label className='block'>Branch Code <span>*</span></label>
                    <input type='text' name='branchname' className='w-[100%]' placeholder='' onChange={formik.handleChange} value={formik.values.branchname}/>
                </div>
                <div className='py-[10px]'>
                    <label className='block'>Regestration No. <span>*</span></label>
                    <input type='text' name='Registrationno' className='w-[100%]' placeholder='' onChange={formik.handleChange} value={formik.values.Registrationno}/>
                </div>
                <div className='py-[10px]'>
                    <label className='block'>Contact <span>*</span></label>
                    <input type='text' name='contact' className='w-[100%]' placeholder='' onChange={formik.handleChange} value={formik.values.contact}/>
                </div>
                <div className='py-[10px]'>
                    <label className='block'>PAN <span>*</span></label>
                    <input type='text' name='pan' className='w-[100%]' placeholder='' onChange={formik.handleChange} value={formik.values.pan}/>
                </div>

                <div className='py-[10px]'>
                <label className='block'>Address <span>*</span></label>
                <textarea type='text' onChange={formik.handleChange} value={formik.values.address} name='address' className='w-[100%] '></textarea>
                </div>
                <div className='py-[10px]'>
                <label className='block'>Bill Address <span>*</span></label>
                <textarea type='text' onChange={formik.handleChange} value={formik.values.billadd} name='billadd' className='w-[100%] '></textarea>
                </div>

            </div>
            <div>
            <div className='py-[10px]'>
                <label className='block'> Ship Address <span>*</span></label>
                <textarea type='text' name='shipadd' onChange={formik.handleChange} value={formik.values.shipadd} className='w-[100%] '></textarea>
                </div>
                <div className='py-[10px]'>
                <label className='block'>Bill Contact Info <span>*</span></label>
                <textarea type='text' name='billcontact' className='w-[100%]' onChange={formik.handleChange} value={formik.values.billcontact}></textarea>
                </div>
                <div className='flex gap-[30px] items-center'>
                <button className='bg-transparent border-[#d13838] border-solid py-[4px] px-[20px] border-[1px] text-[16px] font-inter font-[600] text-[#d13838]'>Cancel</button>
                    <button type='submit' className='bg-PrimaryColor py-[4px] px-[20px] text-[16px] font-inter  text-white '>Save</button>
                </div>
            </div>
            </div>

        </form>
    )}

   </Formik>
   </div>
  )
}

export default BranchForm