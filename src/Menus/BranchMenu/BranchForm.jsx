import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, ErrorMessage, Form, Field } from "formik";
import { useLayouData } from "../../Context/MainLayoutContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addMenu } from "../../Redux/TopTabSlice";
import { HiOutlinePhotograph } from "react-icons/hi";
import usePostData from "../../Apis/usePostData";
import useGetData from "../../Apis/useGetData"
import { baseUrl } from "../../Apis/Baseurl";
import axios from "axios";
import useUpdateData from "../../Apis/useUpdate";
import useGetById from "../../Apis/useGetById";
// import usePostData from '../../Apis/usePostData'



const BranchForm = () => {
  const { getId, setId,token, } = useLayouData();
 const {postdata,postError}= usePostData('Branch/Create',)
 const {data} = useGetData('Branch/GetParent')
 const{GiveId,dataByid} = useGetById('Company/GetById/')
 const {updateData} = useUpdateData('Company/Update')

const [companyData,setCompanyData]= useState('')
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [logoFile,setLogofile]= useState('');
  const  [billLogoFile,setbillLogofile]= useState('')

  const [CompanyAutofillData, setCompanyAutofillData] = useState("");
  const [initialValues, setInitialValues] = useState({
    name: "",
    companyId: '',
    parentId: '',
    regestrationNo: "",
    contactNumber: "",
    pan: "",
    address: "",
    shipAddress: "",
    billContactInfo: "",
    IsHeadOffice: '',
    code: '',
    IsActive: true,
    fax: ''
  });
 const  validationSchema=Yup.object().shape({
    Name: Yup.string().required("required"),
    parentId: Yup.number().required("required"),
    code: Yup.string().required("required"),
    regestrationNo: Yup.string().typeError("invalid data").required("required"),
    pan: Yup.string().typeError("invalid data").required("required"),
     contactNumber: Yup.string().typeError("invalid data").min(10, "contactNumber number should be  between 10 to 11  characters ").required("required"),
    // billadd: Yup.string().required("required"),
    // shipadd: Yup.string().required("required"),
    // billcontactNumber: Yup.string().required("required"),
    address: Yup.string().required("required"),
    fax:Yup.string().required('required'),
    shipAddress: Yup.string().required('required'),
    billContactInfo:Yup.string().required('required'),
    // Logo: Yup.string().required('required'),
    // BillLogo: Yup.string().required('required'),
    // parentId:Yup.number().required('required')
  })

 

  useEffect(() => {
    if (getId) {
      console.log(getId);
      GiveId(getId)
    }
      const fetchData = async ()=>
      {
         try {
             const response =  await axios.get(`${baseUrl}Company/GetAll?IsDeleted=${false}`,
               {headers : { Authorization:`Bearer ${token}` }
             })
             setCompanyData(response.data)
             console.log(response.data.data)
            }
          catch (err)
          {
           console.log(err)
           }
         };
         fetchData();

         if(CompanyAutofillData)
         {
          const autofillCompanyData = companyData?.data?.find((item) => item?.id === parseInt(CompanyAutofillData));
          setInitialValues(prevValues => ({
            ...prevValues,
            address: autofillCompanyData.address,
            contactNumber: autofillCompanyData.contactNumber,
            shipAddress: autofillCompanyData.shipAddress
        }));
          
         }
 
     }, [setId,CompanyAutofillData]);


     const handleSubmit = async (values) => {
      const formData = new FormData();
    
      // Append all form fields to formData
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
    
      // Append files to formData
      formData.append("logoFile", logoFile);
      formData.append('billLogoFile', billLogoFile);
      if(editMode)
      {
        updateData(formData)
      }
      else 
      {
        try {
          const response = await axios.post(`${baseUrl}Branch/Create`, formData, {
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
  
    
    
    
      dispatch(addMenu({ id: "", menu: "branchtable" }));
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
          {editMode ? 'Update Branch' : 'Add Branch'}
        </h3>
      </div>

      <Formik
        enableReinitialize={true}
        initialValues={editMode && CompanyAutofillData ? CompanyAutofillData : initialValues}
       validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 gap-[90px]">
              <div>
                <div className="grid grid-cols-2 gap-[30px]">
                <div className="py-[5px]">
                  <label className="block">Name <span>*</span></label>
                  <Field type="text"
                    name="name"
                    className="w-[100%]"
                    placeholder=""
                    onKeyDown={(event) =>
                      handleEnterKeyPress(event, "parentId")
                    }
                  />
                  <ErrorMessage component="div" className="error" name="name" />
                </div>

                <div className="py-[5px]">
                  <label className="block">Company <span>*</span></label>
                  <Field type="text"
                    name="companyId"
                    as='select'
                 
                    className="w-[100%] border-[1px] px-[8px] py-[8px] outline-0 border-[#c0d3e5"
                    placeholder=""
                    value={CompanyAutofillData}
                    onChange={(e) => setCompanyAutofillData((e.target.value))}
                    onKeyDown={(event) =>
                      handleEnterKeyPress(event, "parentId")
                    }
                  >
                    <option disabled value="">
                        select company
                      </option>
                      {companyData?.data?.map((item, index) => (
                        <option key={item?.id} value={item?.id}>{item?.name}</option>
                      ))}

                  </Field>
                  <ErrorMessage component="div" className="error" name="companyId" />
                </div>
                </div>
                <div className="flex  justify-between items-center">
                  <div className="py-[5px]">
                    <label className="block">
                      Parent Branch <span>*</span>
                    </label>
                    <Field
                      className="border-[1px] px-[8px] py-[8px] outline-0 border-[#c0d3e5] w-[22em] "
                      as="select"
                      id="parentId"
                      name="parentId"
                      type='number'
                      onChange={(e) => {
                        formik.setFieldValue('parentId', e.target.value);
                        // You can set the value of another field here if needed
                        // formik.setFieldValue('fieldName', newValue);
                      }}
                    
                      onKeyDown={(event) => handleEnterKeyPress(event, "Code")}
                    >
                      <option disabled value="">
                        Select Parent 
                      </option>
                      {data?.data?.map((item, index) => (
                        <option key={item?.id} value={item?.id}>{item?.name}</option>
                      ))}
                    </Field>
                    <ErrorMessage
                      component="div"
                      className="error"
                      name="parentId"
                    />
                  </div>
                  <div className="py-[6px]">
                    <label className="block">
                      Branch Code <span></span>
                    </label>
                    <Field
                      type="text"
                      onKeyDown={(event) =>
                        handleEnterKeyPress(event, "regestrationNo")
                      }
                      name="code"
                      className="w-[22em]"
                      placeholder=""
                      id="code"
                    />
                    <ErrorMessage
                      component="div"
                      className="error"
                      name="code"
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
                      onKeyDown={(event) => handleEnterKeyPress(event, "contactNumber")}
                    />
                    <ErrorMessage component="div" className="error" name="pan" />
                  </div>
                </div>



                <div className="flex justify-between">
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

                  <div className="py-[6px]">
                    <label className="block">
                      Fax <span></span>
                    </label>
                    <Field
                      type="text"
                      name="fax"
                      className="w-[22em]"
                      placeholder=""
                      id="fax"
                      onKeyDown={(event) => handleEnterKeyPress(event, "address")}
                    />
                    <ErrorMessage component="div" className="error" name="fax" />
                  </div>
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
                    Logo <span></span>
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


                <div className="py-[6px]">
                  <div role="group">
                    <label className='block py-[8px] font-[500] font-inter '>Head Office<span>*</span></label>
                    <div>
                      <label className=""> <input className='mx-[5px]' type="radio" name="IsHeadOffice" checked={formik.values.IsHeadOffice === true} value={true}
                        onChange={() => formik.setFieldValue('IsHeadOffice', true)} />Yes</label>
                      <label className="ml-[10px]"><input className='mx-[5px]' type="radio" name="IsHeadOffice" checked={formik.values.IsHeadOffice === false} value={false}
                        onChange={() => formik.setFieldValue('IsHeadOffice', false)} /> No</label>
                    </div>
                    <ErrorMessage component="div" className='text-[14px] text-redclr ' name="IsHeadOffice" />
                  </div>
                </div>


              </div>

              <div>
                <h2 className="text-PrimaryColor font-semibold text-center text-[20px] ">Billing Information</h2>
                <div className="py-[6px]">
                  <label className="block">
                    Bill Address <span></span>
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
                    Ship Address <span></span>
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
                    Bill Contact Info <span></span>
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
                <div className="py-[6px]">
                  <label className="block">
                    Bill Logo <span></span>
                  </label>
                  <div className="relative border-dotted border-[2px] border-[#c0d3e5] text-center py-[10px]">
                    <input

                      type="file"
                      name="billLogoFile"
                      className="w-[100%] opacity-0  absolute inset-0 "
                      id="billLogoFile"
                      onChange={(e)=>setbillLogofile(e.target.files[0])}
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
                    name="billLogoFile"
                  />
                </div>




                <div className="flex gap-[30px] items-center formbutton">
                  <button
                    onClick={() => dispatch(addMenu({ id: "", menu: "branchtable" }))}
                    type="reset"
                    className="bg-transparent border-[#d13838] border-solid py-[4px] px-[20px] border-[1px] text-[16px] font-inter font-[600] text-[#d13838]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    id="btnsubmit"
                    className="bg-PrimaryColor py-[4px] px-[20px] text-[16px] font-inter  text-white o "
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

export default BranchForm;
