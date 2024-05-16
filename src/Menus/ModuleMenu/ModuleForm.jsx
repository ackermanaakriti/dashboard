import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import usePostData from "../../Apis/usePostData";
import { useLayouData } from "../../Context/MainLayoutContext";
import { useDispatch } from "react-redux";
import { addMenu } from "../../Redux/TopTabSlice";
import useGetById from "../../Apis/useGetById";
import useUpdateData from "../../Apis/useUpdate";
import { useNavigate, useParams } from "react-router";

const ModuleForm = () => {
  const { postdata, postError } = usePostData("Module/Add");
  const { setId, getId, token } = useLayouData();
  const { updateData } = useUpdateData("Module/Update");
  const { dataByid, GiveId } = useGetById("Module/GetById/");
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const paramId = useParams()

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
    isActive: null,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("required"),
    // code: Yup.string().required("required"),
    prefix: Yup.string().required("required"),
    isActive: Yup.boolean().required("required"),
  });
  const handleSubmit = async (values) => {
    // postdata(values);
    if (editMode) {
      updateData(values);
    } else {
      await postdata(values);
    }

   navigate('/module')
    setId("");
  };
  return (
    <div className="px-[50px]">
      <div>
        <h2 className="font-inter font-semibold text-[30px]">
          {editMode ? "Update" : "Add"} Module Form
        </h2>
      </div>

      <Formik
        initialValues={editMode ? dataByid : initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {(formik) => (
          <Form className="grid grid-cols-2 gap-[90px]">
            <div className="">
              <div className="py-[8px]">
                <label className="block py-[5px] font-[500] font-inter ">
                  Name
                </label>
                <Field
                  className="border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr "
                  type="text"
                  name="name"
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
                    className="border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr cursor-not-allowed"
                    name="code"
                    type="text"
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
                    className="border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr cursor-not-allowed "
                    name="prefix"
                    type="text"
                    
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
                <div className=" mt-[40px] flex gap-[20px]  justify-end ">
                <button
                  onClick={() =>
                   navigate('/module')
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

export default ModuleForm;
