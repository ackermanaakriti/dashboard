import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, ErrorMessage, Form, Field } from "formik";
import { useLayouData } from "../../../Context/MainLayoutContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addMenu } from "../../../Redux/TopTabSlice";
import { HiOutlinePhotograph } from "react-icons/hi";
import axios from "axios";
import useGetById from "../../../Apis/useGetById";
import { baseUrl } from "../../../Apis/Baseurl";
import { useNavigate, useParams } from "react-router";

const CompanyForm = () => {
  const {  token } = useLayouData();
  const { GiveId, dataByid } = useGetById('Company/GetById/');
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [logo, setLogoFile] = useState('');
  const [billLogoFile, setBillLogoFile] = useState('');
  const navigate = useNavigate();
  const paramId = useParams()

  console.log(logo, billLogoFile);

  const initialValues = {
    name: "",
    regestrationNo: "",
    contactNumber: "",
    pan: "",
    address: "",
    shipAddress: "",
    billContactInfo: "",
    code: '43543',
    isActive: true,
    fax: 'sdfsdf'
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("required"),
    regestrationNo: Yup.string().typeError("invalid data").required("required"),
    pan: Yup.string().typeError("invalid data").required("required"),
    address: Yup.string().required("required"),
  });

  useEffect(() => {
    if (paramId?.id) {
      
      setEditMode(true);
      GiveId(paramId?.id);
    }
  }, [paramId?.id]);
  console.log(editMode)

  const handleSubmit = async (values) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    formData.append("name",values.name)
    formData.append("logo", logo);
formData.append("logoFile", billLogoFile);
    console.log(formData)

    try {
      const response = await axios.post(
        `${baseUrl}${editMode ? 'Company/Update' : 'Company/Create'}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    navigate('/company')
  };

  const handleEnterKeyPress = (event, nextField) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const nextInput = document.getElementById(nextField);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  return (
    <div className="Branchform">
      <ToastContainer />
      <div className="pb-[25px]">
        <h3 className="font-inter font-semibold text-[30px]">
          {editMode ? 'Update Company' : 'Add Company'}
        </h3>
      </div>

      <Formik
        enableReinitialize={true}
        initialValues={editMode ? dataByid : initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 gap-[90px] relative">
              <div>
                <div className="flex justify-between">
                  <div className="py-[5px]">
                    <label className="block">Name <span>*</span></label>
                    <Field
                      type="text"
                      name="name"
                      className="w-[22em]"
                      placeholder=""
                      onKeyDown={(event) => handleEnterKeyPress(event, "ParentId")}
                    />
                    <ErrorMessage component="div" className="error" name="Name" />
                  </div>
                  <div className="py-[6px]">
                    <label className="block">Contact Number <span>*</span></label>
                    <Field
                      type="text"
                      name="contactNumber"
                      className="w-[22em]"
                      placeholder=""
                      id="contactNumber"
                      onKeyDown={(event) => handleEnterKeyPress(event, "address")}
                    />
                    <ErrorMessage component="div" className="error" name="contactNumber" />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="py-[6px]">
                    <label className="block">Regestration No. <span>*</span></label>
                    <Field
                      type="text"
                      name="regestrationNo"
                      className="w-[22em]"
                      placeholder=""
                      id="regestrationNo"
                      onKeyDown={(event) => handleEnterKeyPress(event, "Pan")}
                    />
                    <ErrorMessage component="div" className="error" name="regestrationNo" />
                  </div>
                  <div className="py-[6px]">
                    <label className="block">Pan <span>*</span></label>
                    <Field
                      type="text"
                      name="pan"
                      className="w-[22em]"
                      placeholder=""
                      id="pan"
                      onKeyDown={(event) => handleEnterKeyPress(event, "ContactNumber")}
                    />
                    <ErrorMessage component="div" className="error" name="pan" />
                  </div>
                </div>

                <div className="py-[6px]">
                  <label className="block">Address <span>*</span></label>
                  <Field
                    type="text"
                    onKeyDown={(event) => handleEnterKeyPress(event, "billadd")}
                    id="address"
                    name="address"
                    className="w-[100%]"
                  />
                  <ErrorMessage component="div" className="error" name="address" />
                </div>

                <div className="py-[6px]">
                  <label className="block">Logo <span>*</span></label>
                  <div className="relative border-dotted border-[2px] border-[#c0d3e5] text-center py-[10px]">
                    <input
                      type="file"
                      name="logoFile"
                      className="w-[100%] opacity-0 absolute inset-0"
                      id="logoFile"
                      onChange={(e) => setLogoFile(e.target.files[0])}
                      onKeyDown={(event) => handleEnterKeyPress(event, "btnsubmit")}
                    />
                    <span className="text-[#c0d3e5] text-[30px] flex justify-center "> <HiOutlinePhotograph /></span>
                    <p className="text-[#c0d3e5]">Click to upload photo</p>
                  </div>
                  <ErrorMessage component="div" className="error" name="logoFile" />
                </div>
              </div>

              <div>
                <h2 className="text-PrimaryColor font-semibold text-center text-[20px]">Billing Information</h2>
                <div className="py-[6px]">
                  <label className="block">Bill Address <span>*</span></label>
                  <Field
                    as="textarea"
                    type="text"
                    onKeyDown={(event) => handleEnterKeyPress(event, "shipadd")}
                    id="billAddress"
                    name="billAddress"
                    className="w-[100%]"
                  />
                  <ErrorMessage component="div" className="error" name="billAddress" />
                </div>
                <div className="py-[6px]">
                  <label className="block">Ship Address <span>*</span></label>
                  <Field
                    as="textarea"
                    type="text"
                    name="shipAddress"
                    id="shipAddress"
                    onKeyDown={(event) => handleEnterKeyPress(event, "billcontact")}
                    className="w-[100%]"
                  />
                  <ErrorMessage component="div" className="error" name="shipAddress" />
                </div>
                <div className="py-[6px]">
                  <label className="block">Bill Contact Info <span>*</span></label>
                  <Field
                    as="textarea"
                    type="text"
                    name="billContactInfo"
                    className="w-[100%]"
                    id="billContactInfo"
                    onKeyDown={(event) => handleEnterKeyPress(event, "image")}
                  />
                  <ErrorMessage component="div" className="error" name="billContactInfo" />
                </div>

                <div className="mt-[70px] flex gap-[20px] float-right">
                  <button
                    onClick={() =>navigate('/company`')}
                    type="button"
                    className="bg-transparent border-[#d13838] border-solid py-[4px] px-[20px] border-[1px] text-[16px] font-inter font-[600] text-[#d13838]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    id="btnsubmit"
                    className="bg-PrimaryColor py-[4px] px-[20px] text-[16px] font-inter text-white"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CompanyForm;
