import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, ErrorMessage, Form, Field } from "formik";
import { useLayouData } from "../../../Context/MainLayoutContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addMenu } from "../../../Redux/TopTabSlice";
import { HiOutlinePhotograph } from "react-icons/hi";
import usePostData from "../../../Apis/usePostData";
import useGetData from "../../../Apis/useGetData"
import { baseUrl } from "../../../Apis/Baseurl";
import axios from "axios";
import useUpdateData from "../../../Apis/useUpdate";
import useGetById from "../../../Apis/useGetById";
// import usePostData from '../../Apis/usePostData'



const CompanyForm = () => {
  const { getId, setId,token, } = useLayouData();
 const{GiveId,dataByid} = useGetById('Company/GetById/')
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [logo,setLogofile]= useState('');
  const  [billLogoFile,setbillLogofile]= useState('')

 
  const initialValues = {
    name: "",
    // ParentId: '',
    regestrationNo: "",
    contactNumber: "",
    pan: "",
    address: "",
    // billadd: "",
    shipAddress: "",
    billContactInfo: "",
    code:'43543',
    isActive : true,
    fax:'sdfsdf'

  };
 const  validationSchema=Yup.object().shape({
    name: Yup.string().required("required"),
    // ParentId: Yup.number().required("required"),
    // code: Yup.string().required("required"),
    regestrationNo: Yup.string().typeError("invalid data").required("required"),
    pan: Yup.string().typeError("invalid data").required("required"),
    //  contactNumber: Yup.string().typeError("invalid data").min(10, "contactNumber number should be  between 10 to 11  characters ").required("required"),
    // billadd: Yup.string().required("required"),
    // shipadd: Yup.string().required("required"),
    // billContactNumber: Yup.string().required("required"),
    address: Yup.string().required("required"),
  })

 

  useEffect(() => {
    if (getId) {
      console.log(getId);
      setEditMode(true)
      GiveId(getId)
    } }, [setId]);
    console.log(dataByid)
   

    const handleSubmit = async (values) => {
      console.log(values)
        const formData = new FormData();
      
        // Append all form fields to formData
        Object.keys(values).forEach((key) => {
          formData.append(key, values[key]);
        });
      
        // Append files to formData
        formData.append("logo", logo);
        formData.append("logoFile", billLogoFile);
        
    
        if(editMode)
        
        {
          console.log(values,formData)
          try {
            const response = await axios.post(`${baseUrl}Company/Update`, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            });
        
            console.log(response);
          } catch (error) {
            console.error(error);
          }
        }
        
        else 
        {
          try {
            const response = await axios.post(`${baseUrl}Company/Create`, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            });
        
            console.log(response);
          } catch (error) {
            console.error(error);
          }
        }
        dispatch(addMenu({ id: "", menu: "companytable" }));
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
    <div className="Branchform ">
      <ToastContainer />
      <div className="pb-[25px]">
        <h3 className="font-inter font-semibold text-[30px]">
          {editMode ? 'Update Company' : 'Add Company'}
        </h3>
      </div>

      <Formik
        enableReinitialize={true}
        initialValues={editMode  ? dataByid : initialValues}
       validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 gap-[90px] relative">
              <div>
                <div  className="flex justify-between">
                <div className="py-[5px]">
                  <label className="block">Name <span>*</span></label>
                  <Field type="text"
                    name="name"
                    className="w-[22em]"
                    placeholder=""
                    onKeyDown={(event) =>
                      handleEnterKeyPress(event, "ParentId")
                    }
                  />
                  <ErrorMessage component="div" className="error" name="Name" />
                </div>
                <div className="py-[6px]">
                    <label className="block">
                      Contact Number <span>*</span>
                    </label>
                    <Field
                      type="text"
                      name="contactNumber"
                      className="w-[22em]"
                      placeholder=""
                      id="contactNumber"
                      onKeyDown={(event) => handleEnterKeyPress(event, "address")}
                    />
                    <ErrorMessage
                      component="div"
                      className="error"
                      name="contactNumber"
                    />
                  </div>
                  </div>

               
                <div className="flex justify-between">
                  <div className="py-[6px]">
                    <label className="block">
                      Regestration No. <span>*</span>
                    </label>
                    <Field
                      type="text"
                      name="regestrationNo"
                      className="w-[22em]"
                      placeholder=""
                      id="regestrationNo"
                      onKeyDown={(event) => handleEnterKeyPress(event, "Pan")}
                    />
                    <ErrorMessage
                      component="div"
                      className="error"
                      name="regestrationNo"
                    />
                  </div>

                  <div className="py-[6px]">
                    <label className="block">
                      Pan <span>*</span>
                    </label>
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



                <div className="flex justify-between">
                  

                  
                </div>

                <div className="py-[6px]">
                  <label className="block">
                    Address <span>*</span>
                  </label>
                  <Field

                    type="text"
                    onKeyDown={(event) => handleEnterKeyPress(event, "billadd")}
                    id="address"
                    name="address"
                    className="w-[100%] "
                  ></Field>
                  <ErrorMessage
                    component="div"
                    className="error"
                    name="address"
                  />
                </div>

                <div className="py-[6px]">
                  <label className="block">
                    Logo <span>*</span>
                  </label>
                  <div className="relative border-dotted border-[2px] border-[#c0d3e5] text-center py-[10px]">
                    <input

                      type="file"
                      name="logoFile"
                      className="w-[100%] opacity-0  absolute inset-0 "
                      id="logoFile"
                      onChange={(e)=>setLogofile(e.target.files[0])}
                      onKeyDown={(event) =>
                        handleEnterKeyPress(event, "btnsubmit")
                      }
                    />
                    <span className="text-[#c0d3e5] text-[30px] flex justify-center "> <HiOutlinePhotograph /></span>
                    <p className="text-[#c0d3e5] ">Click to upload photo</p>
                  </div>
                  <ErrorMessage
                    component="div"
                    className="error"
                    name="logoFile"
                  />
                </div>


               


              </div>

              <div>
                <h2 className="text-PrimaryColor font-semibold text-center text-[20px] ">Billing Information</h2>
                <div className="py-[6px]">
                  <label className="block">
                    Bill Address <span>*</span>
                  </label>
                  <Field
                    as="textarea"
                    type="text"
                    onKeyDown={(event) => handleEnterKeyPress(event, "shipadd")}
                    id="billAddress"
                    name="billAddress"
                    className="w-[100%] "
                  ></Field>
                  <ErrorMessage
                    component="div"
                    className="error"
                    name="billAddress"
                  />
                </div>
                <div className="py-[6px]">
                  <label className="block">
                    {" "}
                    Ship Address <span>*</span>
                  </label>
                  <Field
                    as="textarea"
                    type="text"
                    name="shipAddress"
                    id="shipAddress"
                    onKeyDown={(event) =>
                      handleEnterKeyPress(event, "billcontact")
                    }
                    className="w-[100%] "
                  ></Field>
                  <ErrorMessage
                    component="div"
                    className="error"
                    name="shipAddress"
                  />
                </div>

                <div className="py-[6px]">
                  <label className="block">
                    Bill Contact Info <span>*</span>
                  </label>
                  <Field
                    as="textarea"
                    type="text"
                    name="billContactInfo"
                    className="w-[100%]"
                    id="billContactInfo"
                    onKeyDown={(event) =>
                      handleEnterKeyPress(event, "image")
                    }
                  ></Field>
                  <ErrorMessage
                    component="div"
                    className="error"
                    name="billContactInfo"
                  />
                </div>
               

                <div className="mt-[70px] flex gap-[20px] float-right">
                  <button
                    onClick={() => dispatch(addMenu({ id: "", menu: "Table" }))}
                    type="button"
                    className="bg-transparent border-[#d13838] border-solid py-[4px] px-[20px] border-[1px] text-[16px] font-inter font-[600] text-[#d13838]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    id="btnsubmit"
                    className="bg-PrimaryColor py-[4px] px-[20px] text-[16px] font-inter  text-white  "
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
