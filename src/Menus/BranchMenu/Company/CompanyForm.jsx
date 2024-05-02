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
// import usePostData from '../../Apis/usePostData'



const CompanyForm = () => {
  const { getId, setId,token, } = useLayouData();
 const {postdata,postError}= usePostData('Company/Create',)
 
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [logoFile,setLogofile]= useState('');
  const  [billLogoFile,setbillLogofile]= useState('')


  const [editIdData, seteditIdData] = useState("");
 
  const initialValues = {
    Name: "",
    // ParentId: '',
    RegestrationNo: "",
    ContactNumber: "",
    Pan: "",
    Address: "",
    // billadd: "",
    ShipAddress: "",
    BillContactInfo: "",
  
    // logoFile:null,
    LogoFile:null,
    Code:'43543',
    billLogoFile:null,
    IsActive : true,
    // BillLogo:null,
    // LogoRelatedFileUrl:null,
    // BillLogoRelatedFileUrl:null,
    Fax:'sdfsdf'

  };
 const  validationSchema=Yup.object().shape({
    Name: Yup.string().required("required"),
    // ParentId: Yup.number().required("required"),
    // Code: Yup.string().required("required"),
    RegestrationNo: Yup.string().typeError("invalid data").required("required"),
    Pan: Yup.string().typeError("invalid data").required("required"),
     ContactNumber: Yup.string().typeError("invalid data").min(10, "ContactNumber number should be  between 10 to 11  characters ").required("required"),
    // billadd: Yup.string().required("required"),
    // shipadd: Yup.string().required("required"),
    // billContactNumber: Yup.string().required("required"),
    Address: Yup.string().required("required"),
    // Fax:Yup.string().required('required'),
    // ShipAddress: Yup.string().required('required'),
    // BillContactInfo:Yup.string().required('required'),
    // Logo: Yup.string().required('required'),
    // BillLogo: Yup.string().required('required'),
    // ParentId:Yup.number().required('required')
  })

 

  useEffect(() => {
    if (getId) {
      console.log(getId);
      setEditMode(true)
    } }, [setId]);

  const handleSubmit =  (values) => {
    console.log(values)
    if (editMode) {
    } 
    else {

       postdata(values );
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
        initialValues={editMode && editIdData ? editIdData : initialValues}
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
                    name="Name"
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
                      name="ContactNumber"
                      className="w-[22em]"
                      placeholder=""
                      id="ContactNumber"
                      onKeyDown={(event) => handleEnterKeyPress(event, "address")}
                    />
                    <ErrorMessage
                      component="div"
                      className="error"
                      name="ContactNumber"
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
                      name="RegestrationNo"
                      className="w-[22em]"
                      placeholder=""
                      id="RegestrationNo"
                      onKeyDown={(event) => handleEnterKeyPress(event, "Pan")}
                    />
                    <ErrorMessage
                      component="div"
                      className="error"
                      name="RegestrationNo"
                    />
                  </div>

                  <div className="py-[6px]">
                    <label className="block">
                      Pan <span>*</span>
                    </label>
                    <Field
                      type="text"
                      name="Pan"
                      className="w-[22em]"
                      placeholder=""
                      id="Pan"
                      onKeyDown={(event) => handleEnterKeyPress(event, "ContactNumber")}
                    />
                    <ErrorMessage component="div" className="error" name="Pan" />
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
                    id="Address"
                    name="Address"
                    className="w-[100%] "
                  ></Field>
                  <ErrorMessage
                    component="div"
                    className="error"
                    name="Address"
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
                      onChange={(e)=>setLogofile(e.target.value)}
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
                    id="BillContactInfo"
                    name="BillContactInfo"
                    className="w-[100%] "
                  ></Field>
                  <ErrorMessage
                    component="div"
                    className="error"
                    name="BillContactInfo"
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
                    name="ShipAddress"
                    id="ShipAddress"
                    onKeyDown={(event) =>
                      handleEnterKeyPress(event, "billcontact")
                    }
                    className="w-[100%] "
                  ></Field>
                  <ErrorMessage
                    component="div"
                    className="error"
                    name="ShipAddress"
                  />
                </div>

                <div className="py-[6px]">
                  <label className="block">
                    Bill Contact Info <span>*</span>
                  </label>
                  <Field
                    as="textarea"
                    type="text"
                    name="BillContactInfo"
                    className="w-[100%]"
                    id="BillContactInfo"
                    onKeyDown={(event) =>
                      handleEnterKeyPress(event, "image")
                    }
                  ></Field>
                  <ErrorMessage
                    component="div"
                    className="error"
                    name="BillContactInfo"
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
