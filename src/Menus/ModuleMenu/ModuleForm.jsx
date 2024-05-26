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
import { useNavigate, useParams } from "react-router";
import useFormNavigation from "../../Components/FormNavigation";
import { FocuseErrorField, focusFirstErrorField } from "../../Components/FocusErrorField";
import SubmitButton from "../../Components/Buttons/SubmitButton";
import CancelButton from "../../Components/Buttons/CancelButton";



const ModuleForm = () => {
  const { postdata,} = usePostData("Module/Add");
  const { updateData } = useUpdateData("Module/Update");
  const { dataByid, GiveId } = useGetById("Module/GetById/");
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const paramId = useParams();
  const formref = useFormNavigation();

  useEffect(() => {
    if (paramId?.id) {
      setEditMode(true);
      GiveId(paramId?.id);
    }
  }, [paramId?.id]);

  const initialValues = {
    name: "",
    code: "",
    prefix: "",
    isActive: true,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    prefix: Yup.string().required("Prefix is required"),
  });

  const handleSubmit = async (formik ) => {

      if (editMode) {
        await updateData(formik.values);
        navigate('/module');
      } else {
        await postdata(formik.values,'module');
      }
     
     document.getElementById('name').focus()
   formik.resetForm()
  };
 

  return (
    <div className="px-[50px]">
      <div>
        <h2 className="font-inter font-semibold text-[30px]">
          {editMode ? "Update" : "Add"} Module Form
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
        onSubmit={(values, {resetForm}) => {
          handleSubmit(values, {resetForm});
        }}
        enableReinitialize={true}
      >
        {(formik) => (
          <Form ref={formref} className="grid grid-cols-2 gap-[90px]">
            <div className="">
              <div className="py-[8px]">
                <label className="block py-[5px] font-[500] font-inter ">
                  Name
                </label>
                <Field
                  className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr ${formik.errors.name ? 'border-redclr' : ''}`}
                  type="text"
                  name="name"
                  id="name"
                />
                <ErrorMessage
                  component="div"
                  className="text-[14px] text-redclr"
                  name="name"
                />
              </div>

              <div className="grid grid-cols-2 gap-[20px]">
                <div className="py-[8px]">
                  <label className="block py-[8px] font-[500] font-inter ">
                    Code
                  </label>
                  <Field
                    className={`border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr cursor-not-allowed ${formik.errors.code ? 'border-redclr' : ''}`}
                    name="code"
                    type="text"
                    id="code"
                    disabled
                  />
                  <ErrorMessage
                    component="div"
                    className="text-[14px] text-redclr "
                    name="code"
                  />
                </div>
                <div className="py-[8px]">
                  <label className="block py-[8px] font-[500] font-inter ">
                    Prefix
                  </label>
                  <Field
                    className={`border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr  ${formik.errors.prefix ? 'border-redclr' : ''}`}
                    name="prefix"
                    type="text"
                    id="prefix"
                  />
                  <ErrorMessage
                    component="div"
                    className="text-[14px] text-redclr "
                    name="prefix"
                  />
                </div>
              </div>
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
                        id="isActive"
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
                        id="isActive"
                        checked={formik.values.isActive === false}
                        value={false}
                        onChange={() => formik.setFieldValue("isActive", false)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            document.getElementById('btnsubmit').focus();
                          }
                        }}
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

              <div className=" mt-[40px] flex gap-[20px]  justify-end ">
              <CancelButton link='/module'/>
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

export default ModuleForm;
