import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, ErrorMessage, Form, Field } from "formik";
import { useLayouData } from "../../Context/MainLayoutContext";
import BranchTable from "./BranchTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addMenu } from "../../Redux/TopTabSlice";
import { HiOutlinePhotograph } from "react-icons/hi";
import usePostData from "../../Apis/usePostData";
// import usePostData from '../../Apis/usePostData'

const branchparentId = [{ id: "1" }, { id: "2" }, { id: "3" }];


const BranchForm = () => {
  const { getId, setId, hanldeId, setHandleId } = useLayouData();
const {postdata,postError}= usePostData('Branch/Create',)
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

  const [editIdData, seteditIdData] = useState("");
  const dataLocal = JSON.parse(localStorage.getItem("formData"));
  const initialValues = {
    Name: "",
    ParentId: "",
    RegestrationNo: "",
    ContactNumber: "",
    Pan: "",
    Address: "",
    // billadd: "",
    ShipAddress: "",
    BillContactInfo: "",
    IsHeadOffice: '',
    logoFile:null,
    Logo:null,
    Code:'',
    // billLogoFile:null,
    IsActive : true,
    // BillLogo:null,
    LogoRelatedFileUrl:null,
    BillLogoRelatedFileUrl:null,
    Fax:''

  };

 

  useEffect(() => {
    if (getId) {
      console.log(getId);
      setEditMode(true);
      seteditIdData(dataLocal.find((item) => item.id === getId));
    } else {
      setEditMode(false); // Set editMode to false when getId is null
      seteditIdData({});
    }
    return () => {
      setId("");
    };
  }, [setId]);

  const handleSubmit = async (values) => {
    // let datas = JSON.parse(localStorage.getItem("formData")) || [];
    if (editMode) {
      // datas = datas.map((item) =>
      //   item.id === editIdData.id ? { ...values, id: editIdData.id } : item
      // );
    } else {
      console.log(values)
      const response = await postdata(values );
      console.log(response)
      // values.id = Math.floor(Math.random() * 100) + 1;
      // datas.push(values);

    }

    // localStorage.setItem("formData", JSON.stringify(datas));
    // toast.success("Your Data is saved");

    dispatch(addMenu({ id: "", menu: "Table" }));
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
        initialValues={editMode && editIdData ? editIdData : initialValues}
        validationSchema={Yup.object().shape({
          Name: Yup.string().required("required"),
          ParentId: Yup.number().required("required"),
          Code: Yup.string().required("required"),
          RegestrationNo: Yup.string()
            .typeError("invalid data")
            .required("required"),
            Pan: Yup.string().typeError("invalid data").required("required"),
          ContactNumber: Yup.string()
            .typeError("invalid data")
            .min(10, "ContactNumber number should be  between 10 to 11  characters ")
            .required("required"),
          // billadd: Yup.string().required("required"),
          // shipadd: Yup.string().required("required"),
          // billContactNumber: Yup.string().required("required"),
          Address: Yup.string().required("required"),
          Fax:Yup.string().required('required'),
          ShipAddress: Yup.string().required('required'),
          BillContactInfo:Yup.string().required('required'),
          // Logo: Yup.string().required('required'),
          // BillLogo: Yup.string().required('required'),
          // ParentId:Yup.number().required('required')



        })}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 gap-[90px]">
              <div>
                <div className="py-[5px]">
                  <label className="block">
                    Name <span>*</span>
                  </label>
                  <Field
                    type="text"
                    name="Name"
                    className="w-[100%]"
                    placeholder=""
                    onKeyDown={(event) =>
                      handleEnterKeyPress(event, "ParentId")
                    }
                  />
                  <ErrorMessage component="div" className="error" name="Name" />
                </div>
                <div className="flex  justify-between items-center">
                  <div className="py-[5px]">
                    <label className="block">
                      Parent Branch <span>*</span>
                    </label>
                    <Field
                      className="border-[1px] px-[8px] py-[8px] outline-0 border-[#c0d3e5] w-[22em] "
                      as="select"
                      id="ParentId"
                      name="ParentId"
                      type='number'
                      onKeyDown={(event) => handleEnterKeyPress(event, "Code")}
                    >
                      <option disabled value="">
                        Select id
                      </option>
                      {branchparentId?.map((item, index) => (
                        <option value={item.id}>{item.id}</option>
                      ))}
                    </Field>
                    <ErrorMessage
                      component="div"
                      className="error"
                      name="ParentId"
                    />
                  </div>
                  <div className="py-[6px]">
                    <label className="block">
                      Branch Code <span>*</span>
                    </label>
                    <Field
                      type="text"
                      onKeyDown={(event) =>
                        handleEnterKeyPress(event, "RegestrationNo")
                      }
                      name="Code"
                      className="w-[22em]"
                      placeholder=""
                      id="Code"
                    />
                    <ErrorMessage
                      component="div"
                      className="error"
                      name="Code"
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

                  <div className="py-[6px]">
                    <label className="block">
                      Fax <span>*</span>
                    </label>
                    <Field
                      type="text"
                      name="Fax"
                      className="w-[22em]"
                      placeholder=""
                      id="Fax"
                      onKeyDown={(event) => handleEnterKeyPress(event, "address")}
                    />
                    <ErrorMessage component="div" className="error" name="Fax" />
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
                    Logo <span>*</span>
                  </label>
                  <div className="relative border-dotted border-[2px] border-[#c0d3e5] text-center py-[10px]">
                    <Field

                      type="file"
                      name="Logo"
                      className="w-[100%] opacity-0  absolute inset-0 "
                      id="Logo"
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
                    name="Logo"
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
                <div className="py-[6px]">
                  <label className="block">
                    Bill Logo <span>*</span>
                  </label>
                  <div className="relative border-dotted border-[2px] border-[#c0d3e5] text-center py-[10px]">
                    <Field

                      type="file"
                      name="BillLogo"
                      className="w-[100%] opacity-0  absolute inset-0 "
                      id="BillLogo"
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
                    name="BillLogo"
                  />
                </div>




                <div className="flex gap-[30px] items-center formbutton">
                  <button
                    onClick={() => dispatch(addMenu({ id: "", menu: "Table" }))}
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
