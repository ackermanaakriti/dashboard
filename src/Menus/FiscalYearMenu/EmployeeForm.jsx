import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import usePostData from "../../Apis/usePostData";
import { useLayouData } from "../../Context/MainLayoutContext";
import { useDispatch } from "react-redux";
import { addMenu } from "../../Redux/TopTabSlice";

const EmployeeForm = () => {
  const { postdata, postError } = usePostData("Employee/Add");
  const { setId, getId, token } = useLayouData();
  const [editMode, setEditMode] = useState(false);
  const [editData, seteditData] = useState();
  const dispatch = useDispatch();

  const initialValues = {
    firstName: "",
    lastName: "",
    positon: "",
    email: "",
    contactNumber: "",
    departmentId: "",
    departmentName: "fsdf",
    isActive: true,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("required"),
    lastName: Yup.string().required("required"),
    positon: Yup.string().required("required"),
    email: Yup.string().required("required"),
    contactNumber: Yup.number().positive().required("required"),
    departmentId: Yup.number().required("required"),
    // departmentName: Yup.string().required("required"),
    isActive: Yup.boolean().required("required"),
  });
  const handleSubmit = async (values) => {

    postdata(values);
    dispatch(addMenu({ id: "", menu: "employee" }));
    setId("");
  };
  return (
    <div className="px-[50px]">
      <div>
        <h2 className="font-inter font-semibold text-[30px]">
          {editMode ? "Update" : "Add"} Employee Form
        </h2>
      </div>

      <Formik
        initialValues={editMode ? editData : initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {(formik) => (
          <Form className="grid grid-cols-2 gap-[90px]">
            <div className="">
              <div className="py-[8px]">
                <label className="block py-[5px] font-[500] font-inter ">
                  First Name
                </label>
                <Field
                  className="border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr "
                  type="text"
                  name="firstName"
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
                    lastName
                  </label>
                  <Field
                    className="border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr "
                    name="lastName"
                    type="text"
                  />
                  <ErrorMessage
                    component="div"
                    className="text-[14px] text-redclr "
                    name="lastName"
                  />
                </div>
                <div className="py-[8px]">
                  <label className="block py-[8px] font-[500] font-inter ">
                    positon
                  </label>
                  <Field
                    className="border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr "
                    name="positon"
                    type="text"
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
                    email
                  </label>
                  <Field
                    className="border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr "
                    name="email"
                    type="email"
                  />
                  <ErrorMessage
                    component="div"
                    className="text-[14px] text-redclr "
                    name="email"
                  />
                </div>
                <div className="py-[8px]">
                  <label className="block py-[8px] font-[500] font-inter ">
                    contactNumber
                  </label>
                  <Field
                    className="border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr "
                    name="contactNumber"
                    type="text"
                  />
                  <ErrorMessage
                    component="div"
                    className="text-[14px] text-redclr "
                    name="contactNumber"
                  />
                </div>
              </div>

             
            </div>

            <div>
              <div className="grid grid-cols-2 gap-[20px]">
              <div className="py-[8px]">
                  <label className="block py-[8px] font-[500] font-inter ">
                  Department Id
                  </label>
                  <Field
                    className="border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr "
                    name="departmentId"
                    type="number"
                  />
                  <ErrorMessage
                    component="div"
                    className="text-[14px] text-redclr "
                    name="departmentId"
                  />
                </div>
                {/* <div className="py-[8px]">
                  <label className="block py-[8px] font-[500] font-inter ">
                  Department Name
                  </label>
                  <Field
                    className="border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr "
                    name="departmentName"
                    type="text"
                  />
                  <ErrorMessage
                    component="div"
                    className="text-[14px] text-redclr "
                    name="departmentName"
                  />
                </div> */}
               
              </div>
              <div className="grid grid-cols-2 gap-[20px]">
                <div className="py-[6px]">
                  <div role="group">
                    <label className="block py-[8px] font-[500] font-inter ">
                      Is Active <span>*</span>
                    </label>
                    <div>
                      <label className="">
                        <input
                          className="mx-[5px]"
                          type="radio"
                          name="isActive"
                          checked={formik.values.isActive === true}
                          value={true}
                          onChange={() =>
                            formik.setFieldValue("isActive", true)
                          }
                        />
                        Yes
                      </label>
                      <label className="ml-[10px]">
                        <input
                          className="mx-[5px]"
                          type="radio"
                          name="isActive"
                          checked={formik.values.isActive === false}
                          value={false}
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
              <div className=" mt-[40px] flex gap-[20px] absolute bottom-[2em] right-[5em]">
                <button
                  onClick={() =>
                    dispatch(addMenu({ id: "", menu: "employee" }))
                  }
                  className=" border-[1px] border-redclr px-[15px] py-[4px] text-redclr font-inter"
                  type="button"
                >
                  Cancel
                </button>

                <button
                  className="bg-PrimaryColor px-[15px] py-[4px] text-white font-inter"
                  type="submit"
                >
                  {editMode ? "Update" : "Save"}{" "}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EmployeeForm;
