import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import usePostData from "../../Apis/usePostData";
import { useLayouData } from "../../Context/MainLayoutContext";
import { useDispatch } from "react-redux";
import { addMenu } from "../../Redux/TopTabSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGetById from "../../Apis/useGetById";
import useUpdateData from "../../Apis/useUpdate";
import useGetData from "../../Apis/useGetData";
import { useNavigate, useParams } from "react-router";
import InputField from "../../Components/InputField";
import useFormNavigation from "../../Components/FormNavigation";

const DepartmentForm = () => {
  const { postdata, error, postDataResponse } = usePostData("Department/Add");
  const { setId, getId, token } = useLayouData();
  const { updateData } = useUpdateData("Department/Update");
  const { dataByid, GiveId } = useGetById("Department/GetById/");
  const { data } = useGetData(`Company/GetAll?IsDeleted=${false}`);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const paramId = useParams();
const formref = useFormNavigation()
  useEffect(() => {
    if (paramId?.id) {
      setEditMode(true);
      GiveId(paramId?.id);
    }
  }, [paramId?.id]);

  const initialValues = {
    name: "",
    code: "",
    description: "",
    companyId: "",
    isActive: true,
  };

  const validationSchema = Yup.object().shape({
    // name: Yup.string().required("Name is required"),
    // description: Yup.string().required("Description is required"),
    // companyId: Yup.number().typeError("Enter a number").required("Company is required"),
  });

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
  
      document.getElementById('name').focus(); // Focus on the input field with ID "name"
    }
  }

  const handleSubmit = async (values, { resetForm, setFieldError }) => {
    console.log('hello')
    try {
      await validationSchema.validate(values, { abortEarly: false });

      if (editMode) {
        updateData(values);
        navigate('/department');
      } else {
        postdata(values);
        resetForm();
      }
    } catch (validationError) {
      console.log(validationError)
      if (validationError.inner.length > 0) {
        const errorPaths = validationError.inner.map((item) => item.path);
        errorPaths.forEach((path) => {
          const elm = document.getElementById(path);
          if (elm) {
            elm.style.borderColor = 'red';
          }
        });

        toast.error('Validation Error');

        const firstErrorField = validationError.inner[0].path;
        const element = document.getElementById(firstErrorField);
        if (element) {
          element.focus();
        }

        errorPaths.forEach((path) => {
          const elm = document.getElementById(path);
          if (elm) {
            elm.addEventListener('input', () => {
              elm.style.borderColor = 'rgb(192 211 229)';
            });
          }
        });
      }
    }
  };
  return (
    <div className="px-[50px]">
      <div>
        <h2 className="font-inter font-semibold text-[30px]">
          {editMode ? "Update" : "Add"} Department Form
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
        onSubmit={(values, { resetForm ,setFieldError}) => handleSubmit(values, { resetForm })}
        enableReinitialize={true}
      >
        {(formik) => (
          <Form ref={formref} className="grid grid-cols-2 gap-[90px]">
            <div className="">
              <div className="py-[8px]">
                <label className="block py-[5px] font-[500] font-inter">
                  Name <span className='text-redclr'>*</span>
                </label>
                <Field
                  className="border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr"
                  type="text"
                  name="name"
                  id='name'
                  
                />
               
                <ErrorMessage
                  component="div"
                  className="text-[14px] text-redclr"
                  name="name"
                />
              </div>

              <div className="py-[8px]">
                <label className="block py-[5px] font-[500] font-inter">
                  Code <span className='text-redclr'>*</span>
                </label>
                <Field
                  className="border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr"
                  type="text"
                  name="code"
                  id='code'
                  disabled
                />
                <ErrorMessage
                  component="div"
                  className="text-[14px] text-redclr"
                  name="code"
                />
              </div>

              <div className="py-[8px]">
                <label className="block py-[5px] font-[500] font-inter">
                  Description <span className='text-redclr'>*</span>
                </label>
                <Field
                  className="border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr"
                  type="text"
                  name="description"
                  id='description'
                
                />
                <ErrorMessage
                  component="div"
                  className="text-[14px] text-redclr"
                  name="description"
                />
              </div>

              <div className="py-[8px]">
                <label className="block py-[5px] font-[500] font-inter">
                  Company <span className='text-redclr'>*</span>
                </label>
                <Field
                  className="border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr"
                  as="select"
                  name="companyId"
                  id='companyId'
                
                >
                  <option disabled value="">
                    Select company
                  </option>
                  {data?.map((item) => (
                    <option key={item?.id} value={item?.id}>
                      {item?.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  component="div"
                  className="text-[14px] text-redclr"
                  name="companyId"
                />
              </div>

              <div className="py-[6px]">
                <div role="group">
                  <label className="block py-[8px] font-[500] font-inter">
                    Active
                  </label>
                  <div>
                    <label>
                      <Field
                        className="mx-[5px]"
                        type="radio"
                        name="isActive"
                        id='isActive'
                        
                        checked={formik.values.isActive === true}
                        value={true}
                        onChange={() => formik.setFieldValue("isActive", true)}
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
                        onChange={() => formik.setFieldValue("isActive", false)}
                      />
                      No
                    </label>
                  </div>
                  <ErrorMessage
                    component="div"
                    className="text-[14px] text-redclr"
                    name="isActive"
                  />
                </div>
              </div>

              <div className="mt-[40px] flex gap-[20px] justify-end">
                <button
                  onClick={() => navigate('/department')}
                  className="border-[1px] border-redclr px-[15px] py-[4px] text-redclr font-inter"
                  type="button"
                >
                  Cancel
                </button>

                <button
                  className="bg-PrimaryColor px-[15px] py-[4px] text-white font-inter focus:bg-[#6bc2eb]"
                  type="submit"
                  id='btnsubmit'
                  onKeyDown={handleKeyDown}
                >
                  {editMode ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DepartmentForm;
