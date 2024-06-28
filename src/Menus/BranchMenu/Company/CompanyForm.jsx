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
import { InputField } from "../../../Components/InputField";


const CompanyForm = () => {
  const {  token,formDirty,setFormDirty } = useLayouData();
  const { GiveId, dataByid } = useGetById('Company/GetById/');
  const [editMode, setEditMode] = useState(false);
  const [logo, setLogoFile] = useState('');
  const navigate = useNavigate();
  const paramId = useParams();
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
    
    formData.append("logoFile", logo);

  

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
      if(response.statusText === 'OK')
        {
          toast.success('Company added Successfully!', {
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
          setLogoFile('')
        }
     
    } catch (error) {
      console.log(error.response?.data.errors);
      toast.error('Something went wrong while adding company. Try again later !')
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
          <Form onChange={()=>setFormDirty(true)} ref={formref} >
            <div className="grid grid-cols-2 gap-[90px] relative">
              <div>
                <div className="grid grid-cols-2  gap-[20px] py-[8px]">
                 
                  <InputField
                  label="Name"
                  name={"name"}
                  id='name'
                  number={false}
                  required={true}
                  value={formik.values.name}
                  onChange={(e) => {
                    formik.setFieldValue("name", e.target.value);
                  }}
                  textColor={"black"}
                />
                  <InputField
                  label="Contact Number"
                  name={"contactNumber"}
                  id='contactNumber'
                  number={false}
                  required={true}
                  value={formik.values.contactNumber}
                  onChange={(e) => {
                    formik.setFieldValue("contactNumber", e.target.value);
                  }}
                  textColor={"black"}
                />
                
                </div>

                <div className="grid grid-cols-2 gap-[20px] py-[8px]">
                <InputField
                  label="Regestration No."
                  name={"regestrationNo"}
                  id='regestrationNo'
                  number={false}
                  required={false}
                  value={formik.values.regestrationNo}
                  onChange={(e) => {
                    formik.setFieldValue("regestrationNo", e.target.value);
                  }}
                  textColor={"black"}
                />
                <InputField
                  label="Pan"
                  name={"pan"}
                  id='pan'
                  number={false}
                  required={false}
                  value={formik.values.pan}
                  onChange={(e) => {
                    formik.setFieldValue("pan", e.target.value);
                  }}
                  textColor={"black"}
                />
                
                
                </div>
                <InputField
                  label="Address"
                  name={"address"}
                  id='address'
                  number={false}
                  required={false}
                  value={formik.values.address}
                  onChange={(e) => {
                    formik.setFieldValue("address", e.target.value);
                  }}
                  textColor={"black"}
                />
                

                

                <div className="py-[6px]">
                  <label className="block py-[5px] font-[500] font-inter">Logo</label>
                  <div className="relative border-dotted border-[2px] border-[#c0d3e5] text-center py-[10px]">
                    <input
                      type="file"
                      name="logoFile"
                      className="w-[100%] opacity-0 absolute inset-0"
                      id="logoFile"
                      onChange={(e) => setLogoFile(e.target.files[0])}
                    />
                   {logo ? <><span className="text-[#c0d3e5] text-[30px] flex justify-center "> </span>
                    <p className="text-[#c0d3e5] "> Selected File : {logo?.name}</p></> : <><span className="text-[#c0d3e5] text-[30px] flex justify-center "> <HiOutlinePhotograph /></span>
                    <p className="text-[#c0d3e5] ">Click to upload photo</p></> }
                  </div>
                  <ErrorMessage component="div"className=" text-redclr text-[14px]" name="logoFile" />
                </div>
              </div>

              <div>
                <h2 className="text-PrimaryColor font-semibold text-center text-[20px]">Billing Information</h2>
             
                <InputField
                  label="Bill Address"
                  name={"billAddress"}
                  id='billAddress'
                  number={false}
                  required={false}
                  value={formik.values.billAddress}
                  onChange={(e) => {
                    formik.setFieldValue("billAddress", e.target.value);
                  }}
                  textColor={"black"}
                />
                <InputField
                  label="Ship Address"
                  name={"shipAddress"}
                  id='shipAddress'
                  number={false}
                  required={false}
                  value={formik.values.shipAddress}
                  onChange={(e) => {
                    formik.setFieldValue("shipAddress", e.target.value);
                  }}
                  textColor={"black"}
                />
                <InputField
                  label="Bill Contact Info"
                  name={"billContactInfo"}
                  id='billContactInfo'
                  number={false}
                  required={false}
                  value={formik.values.billContactInfo}
                  onChange={(e) => {
                    formik.setFieldValue("billContactInfo", e.target.value);
                  }}
                  textColor={"black"}
                />
                
               
                <div className="py-[6px]">
                  <label className="block py-[5px] font-[500] font-inter">Bill Contact Info</label>
                  <Field
                    as="textarea"
                    type="text"
                    name="billContactInfo"
                    className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr ${formik.errors.billContactInfo ? 'border-redclr' : ''}`}

                    id="billContactInfo"
                  />
                  <ErrorMessage component="div" className=" text-redclr text-[14px]" name="billContactInfo" />
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
