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
import { useNavigate, useParams } from "react-router";
import useFormNavigation from "../../Components/FormNavigation";
import SubmitButton from "../../Components/Buttons/SubmitButton";
import CancelButton from "../../Components/Buttons/CancelButton";
// import usePostData from '../../Apis/usePostData'



const BranchForm = () => {
  const navigate = useNavigate();
  const { getId, setId,token, } = useLayouData();
 const {postdata,postError}= usePostData('Branch/Create',)
 const {data} = useGetData('Branch/GetParent')
 const{GiveId,dataByid} = useGetById('Company/GetById/')
 const {updateData} = useUpdateData('Company/Update')
 const formref = useFormNavigation()

const [companyData,setCompanyData]= useState('')
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [logoFile,setLogofile]= useState('');
  const  [billLogoFile,setbillLogofile]= useState('')
  const paramId = useParams()

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
    // parentId: Yup.number().required("required"),
    code: Yup.string().required("required"),
    regestrationNo: Yup.string().typeError("invalid data").required("required"),
    pan: Yup.string().typeError("invalid data").required("required"),
     contactNumber: Yup.string().typeError("invalid data").min(10, "contactNumber number should be  between 10 to 11  characters ").required("required"),
    // billadd: Yup.string().required("required"),
    // shipadd: Yup.string().required("required"),
    // billcontactNumber: Yup.string().required("required"),
    address: Yup.string().required(" required"),
    fax:Yup.string().required('required'),
    shipAddress: Yup.string().required('required'),
    billContactInfo:Yup.string().required('required'),
    // Logo: Yup.string().required('required'),
    // BillLogo: Yup.string().required('required'),
    // parentId:Yup.number().required('required')
  })

 

  useEffect(() => {
    if (paramId?.id) {
      console.log(getId);
      GiveId(paramId?.id)
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
 
     }, [paramId?.id,CompanyAutofillData]);


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
        navigate('/branch')
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
  
    
      

    };

 

  return (
    <div className="px-[50px] ">

      <div className="pb-[25px]">
        <h3 className="font-inter font-semibold text-[30px]">
          {editMode ? 'Update Branch' : 'Add Branch'}
        </h3>
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
        enableReinitialize={true}
        initialValues={editMode && CompanyAutofillData ? CompanyAutofillData : initialValues}
       validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form ref={formref} onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 gap-[90px]">
              <div>
                <div className="grid grid-cols-2 gap-[30px]">
                <div className="py-[5px]">
                  <label className="block py-[5px] font-[500] font-inter ">Name <span>*</span></label>
                  <Field type="text"
                    name="name"
                      className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr ${formik.errors.name ? 'border-redclr' : ''}`}                    placeholder=""
                    id='name-'
                  />
                  <ErrorMessage component="div" className="error" name="name" />
                </div>

                <div className="py-[5px]">
                  <label className="block py-[5px] font-[500] font-inter ">Company <span>*</span></label>
                  <Field type="text"
                    name="companyId"
                    as='select'
                  id='companyId'
                  className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr ${formik.errors.companyId ? 'border-redclr' : ''}`}
                    placeholder=""
                    value={CompanyAutofillData}
                    onChange={(e) => setCompanyAutofillData((e.target.value))}
                   
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
                <div className="grid grid-cols-2 gap-[30px]">
                  <div className="py-[5px]">
                    <label className="block py-[5px] font-[500] font-inter ">
                      Parent Branch <span>*</span>
                    </label>
                    <Field
                        className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr ${formik.errors.parentId ? 'border-redclr' : ''}`}
                      as="select"
                      id="parentId"
                      name="parentId"
                      type='number'
                      onChange={(e) => {
                        formik.setFieldValue('parentId', e.target.value);
                        // You can set the value of another field here if needed
                        // formik.setFieldValue('fieldName', newValue);
                      }}
                    
                      
                    >
                      <option disabled value="">
                        Select Parent 
                      </option>
                      {data?.map((item, index) => (
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
                    <label className="block py-[5px] font-[500] font-inter ">
                      Branch Code <span></span>
                    </label>
                    <Field
                      type="text"
                      
                      name="code"
                      className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr ${formik.errors.code ? 'border-redclr' : ''}`}
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

                <div className="grid grid-cols-2 gap-[30px]">
                  <div className="py-[6px]">
                    <label className="block py-[5px] font-[500] font-inter ">
                      Regestration No. <span>*</span>
                    </label>
                    <Field
                      type="text"
                      name="regestrationNo"
                      className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr ${formik.errors.regestrationNo ? 'border-redclr' : ''}`}
                      placeholder=""
                      id="regestrationNo"
                     
                    />
                    <ErrorMessage
                      component="div"
                      className="error"
                      name="regestrationNo"
                    />
                  </div>

                  <div className="py-[6px]">
                    <label className="block py-[5px] font-[500] font-inter ">
                      Pan <span>*</span>
                    </label>
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



                <div className="grid grid-cols-2 gap-[30px]">
                  <div className="py-[6px]">
                    <label className="block py-[5px] font-[500] font-inter ">
                      Contact Number <span>*</span>
                    </label>
                    <Field
                      type="text"
                      name="contactNumber"
                      className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr ${formik.errors.contactNumber ? 'border-redclr' : ''}`}
                      placeholder=""
                      id="contactNumber"
                     
                    />
                    <ErrorMessage
                      component="div"
                      className="error"
                      name="contactNumber"
                    />
                  </div>

                  <div className="py-[6px]">
                    <label className="block py-[5px] font-[500] font-inter ">
                      Fax <span></span>
                    </label>
                    <Field
                      type="text"
                      name="fax"
                      className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr ${formik.errors.fax ? 'border-redclr' : ''}`}
                      placeholder=""
                      id="fax"
                      
                    />
                    <ErrorMessage component="div" className="error" name="fax" />
                  </div>
                </div>

                <div className="py-[6px]">
                  <label className="block py-[5px] font-[500] font-inter ">
                    Address <span>*</span>
                  </label>
                  <Field

                    type="text"
                    
                    id="Address"
                    name="Address"
                    className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr ${formik.errors.Address ? 'border-redclr' : ''}`}
                  ></Field>
                  <ErrorMessage
                    component="div"
                    className="error"
                    name="Address"
                  />
                </div>

                <div className="py-[6px]">
                  <label className="block py-[5px] font-[500] font-inter ">
                    Logo <span></span>
                  </label>
                  <div className="relative border-dotted border-[2px] border-[#c0d3e5] text-center py-[10px]">
                    <Field

                      type="file"
                      name="logoFile"
                      className="w-[100%] opacity-0  absolute inset-0 "
                      id="logoFile"
                      onChange={(e)=>setLogofile(e.target.files[0])}
                     
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
                      <label className=""> <Field className='mx-[5px]' type="radio" id='headoffice' name="IsHeadOffice" checked={formik.values.IsHeadOffice === true} value={true}
                        onChange={() => formik.setFieldValue('IsHeadOffice', true)} />Yes</label>
                      <label className="ml-[10px]"><Field className='mx-[5px]' type="radio" id='headoffice' name="IsHeadOffice" checked={formik.values.IsHeadOffice === false} value={false}
                        onChange={() => formik.setFieldValue('IsHeadOffice', false)} /> No</label>
                    </div>
                    <ErrorMessage component="div" className='text-[14px] text-redclr ' name="IsHeadOffice" />
                  </div>
                </div>


              </div>

              <div className="relative">
                <h2 className="text-PrimaryColor font-semibold text-center text-[20px] ">Billing Information</h2>
                <div className="py-[6px]">
                  <label className="block py-[5px] font-[500] font-inter ">
                    Bill Address <span></span>
                  </label>
                  <Field
                    as="textarea"
                    type="text"
                    
                    id="billAddress"
                    name="billAddress"
                    className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr ${formik.errors.billAddress ? 'border-redclr' : ''}`}
                  ></Field>
                  <ErrorMessage
                    component="div"
                    className="error"
                    name="billAddress"
                  />
                </div>
                <div className="py-[6px]">
                  <label className="block py-[5px] font-[500] font-inter ">
                    {" "}
                    Ship Address <span></span>
                  </label>
                  <Field
                    as="textarea"
                    type="text"
                    name="shipAddress"
                    id="shipAddress"
                    className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr ${formik.errors.shipAddress ? 'border-redclr' : ''}`}
                  ></Field>
                  <ErrorMessage
                    component="div"
                    className="error"
                    name="shipAddress"
                  />
                </div>

                <div className="py-[6px]">
                  <label className="block py-[5px] font-[500] font-inter ">
                    Bill Contact Info <span></span>
                  </label>
                  <Field
                    as="textarea"
                    type="text"
                    name="billContactInfo"
  className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr ${formik.errors.billContactInfo ? 'border-redclr' : ''}`}                    id="billContactInfo"
                   
                  ></Field>
                  <ErrorMessage
                    component="div"
                    className="error"
                    name="billContactInfo"
                  />
                </div>
                <div className="py-[6px]">
                  <label className="block py-[5px] font-[500] font-inter ">
                    Bill Logo <span></span>
                  </label>
                  <div className="relative border-dotted border-[2px] border-[#c0d3e5] text-center py-[10px]">
                    <input

                      type="file"
                      name="billLogoFile"
                      className="w-[100%] opacity-0  absolute inset-0 "
                      id="billLogoFile"
                      onChange={(e)=>setbillLogofile(e.target.files[0])}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          document.getElementById('btnsubmit').focus();
                        }
                      }} 
                      
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




                <div className="flex pt-[30px] gap-[30px] items-center formbutton">
                <CancelButton link='/branch'/>
                <SubmitButton type='submit'
                 editMode={editMode}
                  formik={formik}
                  id='btnsubmit'
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

export default BranchForm;
