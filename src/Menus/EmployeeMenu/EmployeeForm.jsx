import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import usePostData from "../../Apis/usePostData";
import { useLayouData } from "../../Context/MainLayoutContext";
import { useDispatch } from "react-redux";
import { addMenu } from "../../Redux/TopTabSlice";
import useGetById from "../../Apis/useGetById";
import useUpdateData from "../../Apis/useUpdate";
import useGetData from "../../Apis/useGetData";
import { useNavigate, useParams } from "react-router";
import useFormNavigation from "../../Components/FormNavigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubmitButton from "../../Components/Buttons/SubmitButton";
import CancelButton from "../../Components/Buttons/CancelButton";

const EmployeeForm = () => {
  const { postdata, postError } = usePostData("Employee/Add");
  const { formDirty,setFormDirty} = useLayouData();
  const { updateData } = useUpdateData("Employee/Update");
  const { dataByid,GiveId } = useGetById("Employee/GetById/");
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const {data}= useGetData(`Department/GetAll?IsDeleted?isDeleted=${false}`)
  const navigate = useNavigate()
  const paramId = useParams()
  const formRef = useFormNavigation();


  useEffect(() => {
    if (paramId?.id) {
      setEditMode(true);
      GiveId(paramId?.id);
    }
  }, [paramId?.id]);

  const initialValues = {
    firstName: "",
    lastName: "",
    positon: "",
    email: "",
    contactNumber: "",
    departmentId: "",
    departmentName: "",
    isActive: true,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("required"),
    lastName: Yup.string().required("required"),
    positon: Yup.string().required("required"),
    email: Yup.string().required("required"),
    contactNumber: Yup.number().positive().required("required"),
    departmentId: Yup.number().required("required"),
    // // departmentName: Yup.string().required("required"),
    // isActive: Yup.boolean().required("required"),
  });
  const handleSubmit = async (formik) => {
    // postdata(values);
    console.log('hell')

    if (editMode) {
      updateData(formik.values)
      navigate('/employee');
    } else {
      await postdata(formik.values,'Employee');
    }
    document.getElementById('firstName').focus()
   formik.resetForm()

  };
  return (
    <div className="px-[50px]">
      <div>
        <h2 className="font-inter font-semibold text-[30px]">
          {editMode ? "Update" : "Add"} Employee Form
        </h2>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Formik
        initialValues={editMode ? dataByid : initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {(formik) => (
          <Form onChange={()=>setFormDirty(true)} ref={formRef} className="grid grid-cols-2 gap-[90px]">
            <div className="relative">
              <div className="py-[8px]">
                <label className="block py-[5px] font-[500] font-inter ">
                  First Name <span className="text-redclr">*</span>
                </label>
                <Field
                  className="border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr "
                  type="text"
                  name="firstName"
                  id='firstName'
                />
                <ErrorMessage
                  component="div"
                  className="text-[14px] text-redclr"
                  name="firstName"
                />
              </div>

              <div className="grid grid-cols-2 gap-[20px]">
                <div className="py-[8px]">
                  <label className="block py-[8px] font-[500] font-inter ">
                    last Name <span className="text-redclr">*</span>
                  </label>
                  <Field
                    className="border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr "
                    name="lastName"
                    type="text"
                    id='lastName'
                  />
                  <ErrorMessage
                    component="div"
                    className="text-[14px] text-redclr "
                    name="lastName"
                  />
                </div>
                <div className="py-[8px]">
                  <label className="block py-[8px] font-[500] font-inter ">
                    Positon <span className="text-redclr">*</span>
                  </label>
                  <Field
                    className="border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr "
                    name="positon"
                    type="text"
                    id='positon'
                  />
                  <ErrorMessage
                    component="div"
                    className="text-[14px] text-redclr "
                    name="positon"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-[20px]">
                <div className="py-[8px]">
                  <label className="block py-[8px] font-[500] font-inter ">
                    Email <span className="text-redclr">*</span>
                  </label>
                  <Field
                    className="border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr "
                    name="email"
                    type="email"
                    id='email'
                  />
                  <ErrorMessage
                    component="div"
                    className="text-[14px] text-redclr "
                    name="email"
                  />
                </div>
                <div className="py-[8px]">
                  <label className="block py-[8px] font-[500] font-inter ">
                    Contact Number <span className="text-redclr">*</span>
                  </label>
                  <Field
                    className="border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr "
                    name="contactNumber"
                    type="text"
                    id='contactNumber'
                  />
                  <ErrorMessage
                    component="div"
                    className="text-[14px] text-redclr "
                    name="contactNumber"
                  />
                </div>
              </div>
              <div>
              <div className="grid grid-cols-2 gap-[20px]">
              <div className='py-[8px]'>
                                        <label className='block py-[8px] font-[500] font-inter '>Department <span className="text-redclr">*</span></label>
                                        <Field
                                            className='border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr '
                                            name='departmentId'
                                           id='departmentId'
                                            as='select'
                                            placeholder='Select Account Group'

                                        >
                                            <option disabled value='' selected >Select Department</option>
                                            {data?.map((item, index) =>
                                            (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
                                           
                                        </Field>
                                        <ErrorMessage component='div' className='text-[14px] text-redclr ' name='departmentId' />
                                    </div>
                
              </div>
              <div className="grid grid-cols-2 gap-[20px]">
                <div className="py-[6px]">
                  <div role="group">
                    <label className="block py-[8px] font-[500] font-inter ">
                       Active
                    </label>
                    <div>
                      <label className="">
                        <Field
                          className="mx-[5px]"
                          type="radio"
                          name="isActive"
                          id='isActive'
                          checked={formik.values.isActive === true}
                          value={true}
                          onChange={() =>
                            formik.setFieldValue("isActive", true)
                          }
                        />
                        Yes
                      </label>
                      <label className="ml-[10px]">
                        <Field
                          className="mx-[5px]"
                          type="radio"
                          name="isActive"
                          id='isActive'
                          checked={formik.values.isActive === false}
                          value={false}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              document.getElementById('btnsubmit').focus();
                            }
                          }} 
                          onChange={() =>
                            formik.setFieldValue("isActive", false)
                          }
                        />
                        No
                      </label>
                    </div>
                    <ErrorMessage
                      component="div"
                      className="text-[14px] text-redclr "
                      name="isActive"
                    />
                  </div>
                </div>
              </div>
             
             </div>
             <div className=" mt-[40px] flex gap-[20px] float-right bottom-[2em] right-[5em]">
            < CancelButton link='/employee'/>
                <SubmitButton type='submit'
                 editMode={editMode}
                  formik={formik}
                  id='btnsubmit'
                   handleSubmit={(values) => handleSubmit(values)}/>
              </div>
            </div>

          
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EmployeeForm;
