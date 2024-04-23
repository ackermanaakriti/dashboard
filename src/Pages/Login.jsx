import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { CancelButton, GreenButton } from '../Components/GreenButton';

import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'; 
import { useLayouData } from '../Context/MainLayoutContext';

const Login = () => {
    const {token,setToken,setAuthorized} = useLayouData();
  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmit = async (values) => {
    try {
      const id = uuidv4();
      const response = await axios.post(
        'http://192.168.254.11:5128/api/Authenticate/login',
        {
          ...values,
          id: id,
        }
      );
      console.log(response.data)
    setToken(response?.data?.token);
    setAuthorized(false)
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <>
      <div className='px-[50px]'>
        <div>
          <h2 className='font-inter font-semibold text-[30px]'> Account Group</h2>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit} 
          enableReinitialize={true}
        >
          {(formik) => (
            <Form className='grid grid-cols-2 gap-[90px]'>
              <div className=''>
                <div className='py-[8px]'>
                  <label className='block py-[5px] font-[500] font-inter '>Name</label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                    type='text'
                    name='username'
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr' name='username' />
                </div>

                <div className='py-[8px]'>
                  <label className='block py-[5px] font-[500] font-inter '>password</label>
                  <Field
                    className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr '
                    type='password' // Change type to password
                    name='password'
                  />
                  <ErrorMessage component='div' className='text-[14px] text-redclr ' name='password' />
                </div>

                <div className=' mt-[40px] flex gap-[20px] justify-end'>
                  <CancelButton className=' border-[1px] border-redclr px-[15px] py-[4px] text-redclr font-inter' text='Cancel' type='button' />
                  <button className='bg-PrimaryColor px-[15px] py-[4px] text-white font-inter' type='submit'>
                    Login
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
