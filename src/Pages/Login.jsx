import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { baseUrl } from '../Apis/Baseurl';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useLayouData } from '../Context/MainLayoutContext';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SpinLoader from '../Components/Loader/SpinLoader';
import { logDOM } from '@testing-library/react';

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useLayouData();
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .required('Password is required'),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const id = uuidv4();
      const response = await axios.post(
        `${baseUrl}Authenticate/login`,
        {
          ...values,
          id: id,
        }
      );

      localStorage.setItem('token', response?.data?.token);
      if (response?.data?.token && response?.statusText === 'OK') {
        setToken(response?.data?.token);
        setRedirecting(true);
        setTimeout(() => {
          navigate('/');
        }, 2000); // 3 seconds delay
      }
    } catch (error) {
      console.error('Error:', error);
      setTimeout(() => {
        if (error.response?.status === 401) {
          toast.error('Invalid Credentials');
        } else {
          toast.error('Something went wrong. Please try again later!');
        }
        setLoading(false);
      }, 2000); // Keep loading for 3 seconds before showing the error
    }
  };

  return (
    <>
      <div className='h-[100vh] w-full relative '>
        <div className='px-[50px] items-center pt-[90px]  '>
          <div>
            <h2 className='font-inter font-semibold text-center text-[30px]'>Login</h2>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {(formik) => (
              <Form className='w-[30%] items-center m-auto'>
                <ToastContainer
                  position="bottom-center"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                />
                <div className=''>
                  <div className='py-[8px]'>
                    <label className='block py-[5px] font-[500] font-inter'>Name</label>
                    <Field
                      className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr'
                      type='text'
                      name='username'
                    />
                    <ErrorMessage component='div' className='text-[14px] text-redclr' name='username' />
                  </div>

                  <div className='py-[8px]'>
                    <label className='block py-[5px] font-[500] font-inter'>Password</label>
                    <Field
                      className='border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr'
                      type='password'
                      name='password'
                    />
                    <ErrorMessage component='div' className='text-[14px] text-redclr' name='password' />
                  </div>

                  <div className='mt-[40px] flex justify-center'>
                    <button
                      className={`px-[15px] py-[4px] text-white font-inter ${loading ? 'cursor-not-allowed bg-slate-500' : 'bg-PrimaryColor'}`}
                      disabled={loading}
                      type='submit'
                    >
                      Login
                    </button>
                  </div>


                  {loading && 
                  <div className='overlay fixed inset-0 bg-[#8a8a8a2c]' style={{ zIndex: '99999' }}>
                    <div className='flex flex-col h-full items-center justify-center'>
                      <div className=''>
                        {loading ? <SpinLoader /> : ''}
                        
                      </div>
                      {redirecting && (
                        <div className='mt-[20px] text-center text-[14px] text-green-500'>
                          Redirecting to dashboard...
                        </div>
                      )}

                      
                    </div>
                  </div>}

                </div>
              </Form>
            )}
          </Formik>

        </div>
      </div >

    </>
  );
};

export default Login;
