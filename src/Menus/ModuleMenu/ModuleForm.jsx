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
import useFormikFocusOnError from "../../Components/UseFormikError";

const ModuleForm = () => {
  const { postdata, error, postDataResponse } = usePostData("Module/Add");
  const { setId, getId, token } = useLayouData();
  const { updateData } = useUpdateData("Module/Update");
  const { dataByid, GiveId } = useGetById("Module/GetById/");
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
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

 
  const handleSubmit = async (values, { resetForm }) => {
    if (editMode) {
      updateData(values);
      navigate('/module');
    } else {
      postdata(values);
    }
   
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
        onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
        enableReinitialize={true}
      >
        {(formik) =>  (
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
                  <button
                    onClick={() => navigate('/module')}
                    className=" border-[1px] border-redclr px-[15px] py-[4px] text-redclr font-inter"
                    type="button"
                  >
                    Cancel
                  </button>

                  <button
                    className="bg-PrimaryColor px-[15px] py-[4px] text-white font-inter focus:bg-[#6bc2eb]"
                    type="submit"
                    id='btnsubmit'
                    onClick={handleSubmit}
                  >
                    {editMode ? "Update" : "Save"}{" "}
                  </button>
                </div>
              </div>
            </Form>
          )
        }
      </Formik>
    </div>
  );
};

export default ModuleForm;
