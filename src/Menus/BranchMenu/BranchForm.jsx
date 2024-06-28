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
import { ToggleSwitch } from "../../Components/ToggleSwitch";
// import usePostData from '../../Apis/usePostData'



const BranchForm = () => {
  const navigate = useNavigate();
  const { formDirty,setFormDirty,token, } = useLayouData();
 const {postdata,postError}= usePostData('Branch/Create',)
 const {data} = useGetData('Branch/GetParent')
 const{GiveId,dataByid} = useGetById('Branch/GetById/')
 const {updateData} = useUpdateData('Branch/Update')
 const formref = useFormNavigation()

const [companyData,setCompanyData]= useState('')
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [logoFile,setLogofile]= useState('');
  const  [billLogoFile,setbillLogofile]= useState('')
  const paramId = useParams()

 console.log(logoFile)
  const [CompanyAutofillData, setCompanyAutofillData] = useState("");
  const initialFormValues = {
    name: "",
    companyId: "",
    parentId: "",
    regestrationNo: "",
    contactNumber: "",
    pan: "",
    address: "",
    shipAddress: "",
    billContactInfo: "",
    isHeadOffice: true,
    code: "",
    IsActive: true,
    fax: "",
    billAddress: "",
  };
  const [initialValues, setInitialValues] = useState(initialFormValues);

 const  validationSchema=Yup.object().shape({
    name: Yup.string().required(" Please enter name"),
    // companyId: Yup.number().required(" required"),
    code: Yup.string().required("required"),
     contactNumber: Yup.string().typeError("invalid data").required("required"),
    address: Yup.string().required(" required"),
   
  })

 

  useEffect(() => {
    if (paramId?.id) {
      setEditMode(true)
      GiveId(paramId?.id)
      console.log(dataByid)
      
    }
 
      const fetchData = async ()=>
      {
         try {
             const response =  await axios.get(`${baseUrl}Company/GetAll?IsDeleted=${false}`,
               {headers : { Authorization:`Bearer ${token}` }
             })
             setCompanyData(response.data)
            }
          catch (err)
          {
           console.log(err)
           }
         };
       
         fetchData();
        
         
     }, [paramId?.id]);


     const handleSubmit = async (formik) => {
      console.log(formik.values)
      const formData = new FormData();
    
      // Append all form fields to formData
      Object.keys(formik.values).forEach((key) => {
        formData.append(key, formik.values[key]);
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
          if(response.statusText === 'OK')
            {
              toast.success('Branch added Sucessfully!')
              formik.resetForm()
              setCompanyAutofillData('')
            //   console.log(initialValues)
            // console.log( Object.keys(initialValues)) 
            // const inputfieldName = Object.keys(initialValues)
            // console.log(inputfieldName)
            // inputfieldName.forEach((item)=>
            // {
            //   const inputfieldNameGet = document.getElementsByName(item)[0].value ='';
            //   console.log(inputfieldNameGet)
            // })
      // const r=      document.getElementsByName(inputfieldName)
      // console.log(r)
              
            }
        } catch (error) {
          console.error(error);
          if(error)
            {
              toast.error('Somethind went wrong while adding Branch. Please try again later')
            }
        }
      }
  
    
      

    };
    const handlecompanyAutfillData = (e, setFieldValue) => {
      const selectedCompanyId = e.target.value;
      setCompanyAutofillData(selectedCompanyId)
    
      const autofillCompanyData = companyData?.data?.find((item) => item?.id === parseInt(selectedCompanyId));
    
      if (autofillCompanyData) {
        setFieldValue('address', autofillCompanyData.address);
        setFieldValue('contactNumber', autofillCompanyData.contactNumber);
        setFieldValue('shipAddress', autofillCompanyData.address);
        setFieldValue('pan', autofillCompanyData.pan);
        setFieldValue('regestrationNo', autofillCompanyData.regestrationNo);
        setFieldValue('fax', autofillCompanyData.fax);
        setFieldValue('billAddress', autofillCompanyData.address);
        setFieldValue('billContactInfo', autofillCompanyData.contactNumber);
        setFieldValue('companyId', selectedCompanyId);
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
        initialValues={editMode  ? dataByid : initialValues}
       validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form onChange={()=>setFormDirty(true)} ref={formref} onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 gap-[90px]">
              <div>
                <div className="grid grid-cols-2 gap-[30px]">
                <div className="py-[5px]">
                  <label className="block py-[5px] font-[500] font-inter ">Name <span className="text-redclr">*</span></label>
                  <Field type="text"
                    name="name"
                      className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr `}                    
                    id='name'
                  />
                  <ErrorMessage component="div" className="text-[14px] text-redclr" name="name" />
                </div>

                <div className="py-[5px]">
                  <label className="block py-[5px] font-[500] font-inter ">Company <span className="text-redclr" >*</span></label>
                  <Field type="text"
                    name="companyId"
                    as='select'
                  id='companyId'
                  className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr `}
                    placeholder=""
                    value={ editMode ? dataByid.companyId : CompanyAutofillData}
                 
                    onChange={(e) => handlecompanyAutfillData(e, formik?.setFieldValue)}
                   
                  >
                    <option disabled value="">
                        select company
                      </option>
                      {companyData?.data?.map((item, index) => (
                        <option key={item?.id} value={item?.id}>{item?.name}</option>
                      ))}

                  </Field>
                  <ErrorMessage component="div" className="text-[14px] text-redclr" name="companyId" />
                </div>
                </div>
                <div className="grid grid-cols-2 gap-[30px]">
                  <div className="py-[5px]">
                    <label className="block py-[5px] font-[500] font-inter ">
                      Parent Branch <span className="text-redclr">*</span>
                    </label>
                    <Field
                        className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr `}
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
                      Branch Code <span className="text-redclr" >*</span>
                    </label>
                    <Field
                      type="text"
                      
                      name="code"
                      className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr `}
                      placeholder=""
                      id="code"
                    />
                    <ErrorMessage
                      component="div"
                      className="text-[14px] text-redclr"
                      name="code"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-[30px]">
                  <div className="py-[6px]">
                    <label className="block py-[5px] font-[500] font-inter ">
                      Regestration No. 
                    </label>
                    <Field
                      type="text"
                      name="regestrationNo"
                      className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr `}
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
                      Pan 
                    </label>
                    <Field
                      type="text"
                      name="pan"
                      className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr `}
                      placeholder=""
                      id="pan"
                     
                    />
                    <ErrorMessage component="div" className="text-[14px] text-redclr"name="pan" />
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
                      className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr `}
                      placeholder=""
                      id="contactNumber"
                     
                    />
                    <ErrorMessage
                      component="div"
                      className="text-[14px] text-redclr"
                      name="contactNumber"
                    />
                  </div>

                  <div className="py-[6px]">
                    <label className="block py-[5px] font-[500] font-inter ">
                      Fax 
                    </label>
                    <Field
                      type="text"
                      name="fax"
                      className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr `}
                      placeholder=""
                      id="fax"
                      
                    />
                    <ErrorMessage component="div" className="error" name="fax" />
                  </div>
                </div>

                <div className="py-[6px]">
                  <label className="block py-[5px] font-[500] font-inter ">
                    Address <span className="text-redclr">*</span>
                  </label>
                  <Field

                    type="text"
                    
                    id="Address"
                    name="address"
                    className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr `}
                  ></Field>
                  <ErrorMessage
                    component="div"
                    className="error"
                    name="address"
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
                    {logoFile ? <><span className="text-[#c0d3e5] text-[30px] flex justify-center "> </span>
                    <p className="text-[#c0d3e5] "> Selected File : {logoFile?.name}</p></> : <><span className="text-[#c0d3e5] text-[30px] flex justify-center "> <HiOutlinePhotograph /></span>
                    <p className="text-[#c0d3e5] ">Click to upload photo</p></> }
                    
                  </div>
                  <ErrorMessage
                    component="div"
                    className="error"
                    name="logoFile"
                  />
                </div>


                {/* <div className="py-[6px]">
                  <div role="group">
                    <label className='block py-[8px] font-[500] font-inter '>Head Office</label>
                    <div>
                      <label className=""> <Field className='mx-[5px]' type="radio" id='headoffice' name="isHeadOffice" checked={formik.values.isHeadOffice === true} value={true}
                        onChange={() => formik.setFieldValue('isHeadOffice', true)} />Yes</label>
                      <label className="ml-[10px]"><Field className='mx-[5px]' type="radio" id='headoffice' name="isHeadOffice" checked={formik.values.isHeadOffice === false} value={false}
                        onChange={() => formik.setFieldValue('isHeadOffice', false)} /> No</label>
                    </div>
                    <ErrorMessage component="div" className='text-[14px] text-redclr ' name="isHeadOffice" />
                  </div>
                </div> */}
                               <ToggleSwitch
                                        label={"Head Office"}
                                        name={"isHeadOffice"}
                                        required
                                        checked={formik.values.isHeadOffice}
                                        onChange={() => {
                                            formik.setFieldValue(
                                                "isHeadOffice",
                                                !formik.values.isHeadOffice
                                            );
                                        }}
                                    />


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
                    className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr `}
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
                    className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr `}
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
  className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr `}         
             id="billContactInfo"
                   
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
                     {billLogoFile ? <><span className="text-[#c0d3e5] text-[30px] flex justify-center "> </span>
                    <p className="text-[#c0d3e5] "> Selected File : {billLogoFile?.name}</p></> : <><span className="text-[#c0d3e5] text-[30px] flex justify-center "> <HiOutlinePhotograph /></span>
                    <p className="text-[#c0d3e5] ">Click to upload photo</p></> }
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
