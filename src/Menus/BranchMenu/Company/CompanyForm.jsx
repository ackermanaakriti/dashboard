import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, ErrorMessage, Form, Field } from "formik";
import { useLayouData } from "../../../Context/MainLayoutContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiOutlinePhotograph } from "react-icons/hi";
import axios from "axios";
import useGetById from "../../../Apis/useGetById";
import { baseUrl } from "../../../Apis/Baseurl";
import { useNavigate, useParams } from "react-router";
import { FaArrowLeft } from "react-icons/fa6";
import useFormNavigation from "../../../Components/FormNavigation";
import CancelButton from "../../../Components/Buttons/CancelButton";
import SubmitButton from "../../../Components/Buttons/SubmitButton";


const CompanyForm = () => {
  const {  token } = useLayouData();
  const { GiveId, dataByid } = useGetById('Company/GetById/');
  const [editMode, setEditMode] = useState(false);
  const [logo, setLogoFile] = useState('');
  const [billLogoFile, setBillLogoFile] = useState('');
  const navigate = useNavigate();
  const paramId = useParams();
  const [error,setError] =useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const formref = useFormNavigation()


console.log(logo)


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
    regestrationNo: Yup.string().required("required"),
    pan: Yup.string().required("required"),
    address: Yup.string().required("required"),
    contactNumber: Yup.string().required("required"),
  });

  useEffect(() => {
    if (paramId?.id) {
      
      setEditMode(true);
      GiveId(paramId?.id);
    }
  }, [paramId?.id]);

  
  const handleSubmit = async (formik) => {
    const formData = new FormData();
    console.log(formik.values)

    Object.keys(formik.values).forEach((key) => {
      formData.append(key, formik.values[key]);
    });
    
    formData.append("logo", logo);

  

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
      console.log(formData);
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
      formik.resetForm()
    } catch (error) {
      console.log(error.response?.data.errors);
      setError(error.response?.data.errors);
    }
    
    
  };
  


  return (
    <div className="px-[50px]">
      
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
          <Form ref={formref} >
            <div className="grid grid-cols-2 gap-[90px] relative">
              <div>
                <div className="grid grid-cols-2  gap-[20px]">
                  <div className="py-[5px]">
                    <label className="block py-[5px] font-[500] font-inter ">Name <span  className="text-redclr">*</span></label>
                    <Field
                      type="text"
                      name="name"
                      id='name'
                      className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr ${formik.errors.name ? 'border-redclr' : ''}`}

                      placeholder=""
                    />
                    <ErrorMessage component="div" className="error" name="Name" />
                  </div>
                 
                  <div className="py-[6px]">
                    <label className="block py-[5px] font-[500] font-inter">Contact Number <span  className="text-redclr">*</span></label>
                    <Field
                      type="text"
                      name="contactNumber"
                      className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr ${formik.errors.contactNumber ? 'border-redclr' : ''}`}

                      placeholder=""
                      id="contactNumber"
                    />
                    <ErrorMessage component="div" className="error" name="contactNumber" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-[20px]">
                  <div className="py-[6px]">
                    <label className="block py-[5px] font-[500] font-inter">Regestration No. <span  className="text-redclr">*</span></label>
                    <Field
                      type="text"
                      name="regestrationNo"
                      className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr ${formik.errors.regestrationNo ? 'border-redclr' : ''}`}

                      placeholder=""
                      id="regestrationNo"
                    />
                    <ErrorMessage  component="div" className="error text-redclr text-[12px]" name="regestrationNo" />
                  </div>
                  <div className="py-[6px]">
                    <label className="block py-[5px] font-[500] font-inter">Pan <span className="text-redclr">*</span></label>
                    <Field
                      type="text"
                      name="pan"
                      className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr ${formik.errors.pan ? 'border-redclr' : ''}`}

                      placeholder=""
                      id="pan"
                    />
                    <ErrorMessage component="div" className="error" name="pan" />
                  </div>
                </div>

                <div className="py-[6px]">
                  <label className="block py-[5px] font-[500] font-inter">Address <span>*</span></label>
                  <Field
                    type="text"
                    id="address"
                    name="address"
                    className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr ${formik.errors.address ? 'border-redclr' : ''}`}

                  />
                  <ErrorMessage component="div" className="error" name="address" />
                </div>

                <div className="py-[6px]">
                  <label className="block py-[5px] font-[500] font-inter">Logo <span>*</span></label>
                  <div className="relative border-dotted border-[2px] border-[#c0d3e5] text-center py-[10px]">
                    <input
                      type="file"
                      name="logoFile"
                      className="w-[100%] opacity-0 absolute inset-0"
                      id="logoFile"
                      onChange={(e) => setLogoFile(e.target.files[0])}
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
                  <label className="block py-[5px] font-[500] font-inter">Bill Address <span>*</span></label>
                  <Field
                    as="textarea"
                    type="text"
                    id="billAddress"
                    name="billAddress"
                    className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr ${formik.errors.billAddress ? 'border-redclr' : ''}`}

                  />
                  <ErrorMessage component="div" className="error" name="billAddress" />
                </div>
                <div className="py-[6px]">
                  <label className="block py-[5px] font-[500] font-inter">Ship Address <span>*</span></label>
                  <Field
                    as="textarea"
                    type="text"
                    name="shipAddress"
                    id="shipAddress"
                    className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr ${formik.errors.shipAddress ? 'border-redclr' : ''}`}

                  />
                  <ErrorMessage component="div" className="error" name="shipAddress" />
                </div>
                <div className="py-[6px]">
                  <label className="block py-[5px] font-[500] font-inter">Bill Contact Info <span>*</span></label>
                  <Field
                    as="textarea"
                    type="text"
                    name="billContactInfo"
                    className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr ${formik.errors.billContactInfo ? 'border-redclr' : ''}`}

                    id="billContactInfo"
                  />
                  <ErrorMessage component="div" className="error" name="billContactInfo" />
                </div>

                <div className="mt-[70px] flex gap-[20px] float-right">
                <CancelButton link='/company'/>
                <SubmitButton type='submit'
                 editMode={editMode}
                  formik={formik}
                   handleSubmit={(values) => handleSubmit(values)}/>
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
