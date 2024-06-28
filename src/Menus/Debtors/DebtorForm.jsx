import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLayouData } from "../../Context/MainLayoutContext";
import { addMenu } from "../../Redux/TopTabSlice";
import usePostData from "../../Apis/usePostData";
import useGetById from "../../Apis/useGetById";
import useUpdateData from "../../Apis/useUpdate";
import useGetData from "../../Apis/useGetData";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { baseUrl } from "../../Apis/Baseurl";
import SubmitButton from "../../Components/Buttons/SubmitButton";
import CancelButton from "../../Components/Buttons/CancelButton";
import useFormNavigation from "../../Components/FormNavigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToggleSwitch } from "../../Components/ToggleSwitch";


const CustomerForm = () => {
  const { postdata } = usePostData("Debtors/Add");
  const { GiveId, dataByid } = useGetById("Debtors/GetById/");
  const { updateData } = useUpdateData("Debtors/Update");
  const { data } = useGetData(`ChartOfAccount/GetAll?IsTransactionOnly=${false}`);
  const { token ,formDirty,setFormDirty} = useLayouData();
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const paramId = useParams()
  const [companyData,setcompanyData]= useState([])
  const formref = useFormNavigation()

  useEffect(() => {
    if (paramId?.id) {
      setEditMode(true);
      GiveId(paramId?.id);
    }
    const fetchData =async()=>
      {
        try{
          const response = await axios.get(`${baseUrl}Company/GetAll?IsDeleted=${false}`,{headers: { Authorization: `Bearer ${token}` }});
          setcompanyData(response?.data?.data)
        }
        catch (err)
        {
          console.log(err)
        }
          
      }
      fetchData()
  }, [paramId?.id,data]);

  const initialValues = {
    name: "",
    address: "",
    companyName: "",
    contactNumber: "",
    email: "",
    chartOfAccountId: "",
    isActive: true,
  };

  const validationSchema = Yup.object().shape({
    // description: Yup.number().typeError('enter number').required('required'),
    // companyId: Yup.number().typeError('enter number').required('required'),
    name: Yup.string().required('required'),
    contactNumber: Yup.string().required('required'),
    chartOfAccountId: Yup.string().required('required'),
    address:Yup.string().required('required')
    // code: Yup.string().required('required'),
    // syPlacement: Yup.string().required('required'),
  });

  const handleSubmit = async (formik) => {

    if (editMode) {
      updateData(formik.values)
      navigate('/debtors');
    } else {
     await  postdata(formik.values,'Debtors');
    }
   
   document.getElementById('name').focus()
   formik.resetForm()
  };

  return (
    <>
      <div className="px-[50px]">
        <div>
          <h2 className="font-inter font-semibold text-[30px]">
            {" "}
            {editMode ? "Update" : "Add"} Debtor
          </h2>
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
          initialValues={editMode ? dataByid : initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {(formik) => (
            <Form onChange={()=>setFormDirty(true)} ref={formref} className="grid grid-cols-2 gap-[90px]">
              <div className="">
                <div className="grid grid-cols-2 gap-[20px]">
                  <div className="py-[8px]">
                    <label className="block py-[5px] font-[500] font-inter ">
                      Name <span className="text-redclr">*</span>
                    </label>
                    <Field
                      className="border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr "
                      type="text"
                      name="name"
                      id='name'
                    />
                    <ErrorMessage
                      component="div"
                      className="text-[14px] text-redclr"
                      name="name"
                    />
                  </div>

                  <div className="py-[8px]">
                    <label className="block py-[5px] font-[500] font-inter ">
                      Address <span className="text-redclr">*</span>
                    </label>
                    <Field
                      className="border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr "
                      type="text"
                      name="address"
                      id='address'
                    />
                    <ErrorMessage
                      component="div"
                      className="text-[14px] text-redclr "
                      name="address"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-[20px]">
                  <div className="py-[8px]">
                    <label className="block py-[5px] font-[500] font-inter ">
                      Company Name <span className="text-redclr">*</span>
                    </label>
                    <Field
                      type="text"
                      name="companyId"
                     
                      id='companyId'
                      className="w-[100%] border-[1px] px-[8px] py-[8px]  outline-none border-borderclr"
                      placeholder=""
                      // value={CompanyAutofillData}
                      // onChange={(e) => setCompanyAutofillData((e.target.value))}
                    >
                      
                    </Field>
                    <ErrorMessage
                      component="div"
                      className="text-[14px] text-redclr"
                      name="companyId"
                    />
                  </div>
                  <div className="py-[8px]">
                    <label className="block py-[5px] font-[500] font-inter ">
                      Contact Number <span className="text-redclr">*</span>
                    </label>
                    <Field
                      className="border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr "
                      type="text"
                      name="contactNumber"
                      id='contactNumber'
                    />
                    <ErrorMessage
                      component="div"
                      className="text-[14px] text-redclr"
                      name="contactNumber"
                    />
                  </div>
                </div>
                <div>
                <div className="grid grid-cols-2 gap-[20px]">
                  <div className="py-[8px]">
                    <label className="block py-[5px] font-[500] font-inter ">
                      Email 
                    </label>
                    <Field
                      className="border-[1px] w-[100%] py-[8px] px-[12px] outline-none border-borderclr "
                      type="email"
                      name="email"
                      id='email'
                    />
                    <ErrorMessage
                      component="div"
                      className="text-[14px] text-redclr "
                      name="email"
                    />
                  </div>
                  <div className="py-[8px]">
                    <label className="block py-[5px] font-[500] font-inter">
                      Chart of Account Id <span className="text-redclr">*</span>
                    </label>
                    <Field
                      type="text"
                      name="chartOfAccountId"
                      as="select"
                      id='chatOfAccountId'
                      className="w-[100%] border-[1px] px-[8px] py-[8px]  outline-none border-borderclr"
                      placeholder=""
                      // value={CompanyAutofillData}
                      // onChange={(e) => setCompanyAutofillData((e.target.value))}
                    >
                      <option disabled value="">
                        select ChartOfAccount
                      </option>
                      {data?.map((item, index) => (
                        <option key={item?.id} value={item?.id}>
                          {item?.accountName}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      component="div"
                      className="text-[14px] text-redclr "
                      name="chatOfAccountId"
                    />
                  </div>
                </div>
                {/* <div className="py-[6px]">
                  <div role="group">
                    <label className="block py-[8px] font-[500] font-inter ">
                       Active 
                    </label>
                    <div>
                      <label className="">
                        <Field
                          className="mx-[5px]"
                          type="radio"
                          name="isActive"
                          id='isActive'
                          checked={formik.values.isActive === true}
                          value={true}
                          onChange={() =>
                            formik.setFieldValue("isActive", true)
                          }
                        />
                        Yes
                      </label>
                      <label className="ml-[10px]">
                        <Field
                          className="mx-[5px]"
                          type="radio"
                          name="isActive"
                          id='isActive'
                          checked={formik.values.isActive === false}
                          value={false}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              document.getElementById('btnsubmit').focus();
                            }
                          }} 
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
                </div> */}
                 <ToggleSwitch
                  label={"Active"}
                  name={"isActive"}
                  required
                  checked={formik.values.isActive}
                  onChange={() => {
                    formik.setFieldValue(
                      "isActive",
                      !formik.values.isActive
                    );
                  }}
                />
                <div className=" mt-[40px] flex gap-[20px] justify-end">
                <CancelButton link='/vouchertype'/>
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
    </>
  );
};

export default CustomerForm;
