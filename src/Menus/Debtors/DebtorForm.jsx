import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { CancelButton, GreenButton } from "../../Components/GreenButton";
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

const CustomerForm = () => {
  const { postdata } = usePostData("Debtors/Add");
  const { GiveId, dataByid } = useGetById("Debtors/GetById/");
  const { updateData } = useUpdateData("Debtors/Update");
  const { data } = useGetData(`ChartOfAccount/GetAll?IsTransactionOnly=${false}`);
  const { token } = useLayouData();
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const paramId = useParams()
  const [companyData,setcompanyData]= useState([])

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

  const handleSubmit = async (values) => {
    console.log(values);
    if (editMode) {
      updateData(values);
    } else {
     await  postdata(values);
    }
   navigate('/debtors')
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

        <Formik
          initialValues={editMode ? dataByid : initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {(formik) => (
            <Form className="grid grid-cols-2 gap-[90px]">
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
                      as="select"
                      className="w-[100%] border-[1px] px-[8px] py-[8px]  outline-none border-borderclr"
                      placeholder=""
                      // value={CompanyAutofillData}
                      // onChange={(e) => setCompanyAutofillData((e.target.value))}
                    >
                      <option disabled value="">
                        select ChartOfAccount
                      </option>
                      {companyData?.map((item, index) => (
                        <option key={item?.id} value={item?.id}>
                          {item?.name}
                        </option>
                      ))}
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
                      className="w-[100%] border-[1px] px-[8px] py-[8px]  outline-none border-borderclr"
                      placeholder=""
                      // value={CompanyAutofillData}
                      // onChange={(e) => setCompanyAutofillData((e.target.value))}
                    >
                      <option disabled value="">
                        select ChartOfAccount
                      </option>
                      {data?.data?.map((item, index) => (
                        <option key={item?.id} value={item?.id}>
                          {item?.accountName}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      component="div"
                      className="error"
                      name="chartOfAccountId"
                    />
                  </div>
                </div>
                <div className="py-[6px]">
                  <div role="group">
                    <label className="block py-[8px] font-[500] font-inter ">
                       Active 
                    </label>
                    <div>
                      <label className="">
                        <input
                          className="mx-[5px]"
                          type="radio"
                          name="isActive"
                          checked={formik.values.isActive === true}
                          value={true}
                          onChange={() =>
                            formik.setFieldValue("isActive", true)
                          }
                        />
                        Yes
                      </label>
                      <label className="ml-[10px]">
                        <input
                          className="mx-[5px]"
                          type="radio"
                          name="isActive"
                          checked={formik.values.isActive === false}
                          value={false}
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
                </div>
                <div className=" mt-[40px] flex gap-[20px] justify-end">
                <button
                  onClick={() =>
                    navigate('/debtors')
                  }
                  className=" border-[1px] border-redclr px-[15px] py-[4px] text-redclr font-inter"
                  type="button"
                >
                  Cancel
                </button>

                <button className='bg-PrimaryColor px-[15px] py-[4px] text-white font-inter' type='submit' > 
                  {editMode ? 'Update': 'Save'} </button>
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
