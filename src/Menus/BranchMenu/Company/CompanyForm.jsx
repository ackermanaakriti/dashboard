import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, ErrorMessage, Form, Field } from "formik";
import { useLayouData } from "../../../Context/MainLayoutContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addMenu } from "../../../Redux/TopTabSlice";
import { HiOutlinePhotograph } from "react-icons/hi";
import axios from "axios";
import useGetById from "../../../Apis/useGetById";
import { baseUrl } from "../../../Apis/Baseurl";
import { useNavigate, useParams } from "react-router";
import { FaArrowLeft } from "react-icons/fa6";


const CompanyForm = () => {
  const {  token } = useLayouData();
  const { GiveId, dataByid } = useGetById('Company/GetById/');
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [logo, setLogoFile] = useState('');
  const [billLogoFile, setBillLogoFile] = useState('');
  const navigate = useNavigate();
  const paramId = useParams();
  const [error,setError] =useState('');
  const [errorMessages, setErrorMessages] = useState([]);

  // Assuming this is your mapping logic
  const addErrorMessagesToState = (error) => {
    setErrorMessages(Object.values(error).flat());
  };
  
  useEffect(() => {
    addErrorMessagesToState(error);
  }, [error]);
  console.log(errorMessages);

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

  const handleSubmit = async (values,{resetForm}) => {
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
      toast.success('Data added Successfully!', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
        });
      resetForm()
    } catch (error) {
      console.log(error.response?.data.errors);
      setError(error.response?.data.errors);
     
      if(errorMessages.length>0)
        {
          errorMessages.map((item)=>
          toast.error(item))
        }
      // toast.error(errorMessages.toString())
    }
    
    
  };
  
  const handleEnterKeyPress = (event, nextField,formik) => {
    if (event.key === "Enter" || event.key === 'Tab') {
      event.preventDefault();
      const nextInput = document.getElementById(nextField);
      if (nextField === 'name') {
        console.log('hello')
        handleSubmit(formik.values, { resetForm: formik.resetForm });
      }
      if (nextInput) {
        nextInput.focus();
      }
      
    }
  };

  return (
    <div className="Branchform">
      
      <div className="pb-[25px] flex justify-between">
        <h3 className="font-inter font-semibold text-[30px]">
          {editMode ? 'Update Company' : 'Add Company'}
        </h3>
        <span onClick={()=>navigate('/company')} className="text-PrimaryColor text-[24px] "><FaArrowLeft/></span>
      </div>
      <ToastContainer
position="bottom-center"
autoClose={10000}
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
        enableReinitialize={true}
        initialValues={editMode ? dataByid : initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
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
                      id='name'
                      className="w-[22em]"
                      placeholder=""
                      onKeyDown={(event) => handleEnterKeyPress(event, "contactNumber",formik)}
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
                      onKeyDown={(event) => handleEnterKeyPress(event, "regestrationNo",formik)}
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
                      onKeyDown={(event) => handleEnterKeyPress(event, "pan",formik)}
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
                      onKeyDown={(event) => handleEnterKeyPress(event, "address",formik)}
                    />
                    <ErrorMessage component="div" className="error" name="pan" />
                  </div>
                </div>

                <div className="py-[6px]">
                  <label className="block">Address <span>*</span></label>
                  <Field
                    type="text"
                    onKeyDown={(event) => handleEnterKeyPress(event, "logoFile",formik)}
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
                      onKeyDown={(event) => handleEnterKeyPress(event, "billAddress",formik)}
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
                    onKeyDown={(event) => handleEnterKeyPress(event, "shipAddress",formik)}
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
                    onKeyDown={(event) => handleEnterKeyPress(event, "billContactInfo",formik)}
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
                    onKeyDown={(event) => handleEnterKeyPress(event, "btnsubmit",formik)}
                  />
                  <ErrorMessage component="div" className="error" name="billContactInfo" />
                </div>

                <div className="mt-[70px] flex gap-[20px] float-right">
                  <button
                    onClick={() =>navigate('/company`')}
                    type="button"
                    id='cancel'
                    className="bg-transparent border-[#d13838] border-solid py-[4px] px-[20px] border-[1px] text-[16px] font-inter font-[600] text-[#d13838]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    id="btnsubmit"
                    onKeyDown={(event) => handleEnterKeyPress(event, "name",formik)}
                  
                    className="bg-PrimaryColor py-[4px] px-[20px] text-[16px] font-inter text-white focus:bg-[#6bc2eb]"
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
