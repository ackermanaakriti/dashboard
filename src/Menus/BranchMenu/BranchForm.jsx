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

const branchparentId = [{ id: "1" }, { id: "2" }, { id: "3" }];


const BranchForm = () => {
  const { getId, setId, hanldeId, setHandleId } = useLayouData();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

  const [editIdData, seteditIdData] = useState("");
  const dataLocal = JSON.parse(localStorage.getItem("formData"));
  const initialValues = {
    name: "",
    branchparentid: "",
    Registrationno: "",
    branchcode: "",
    contact: "",
    pan: "",
    address: "",
    billadd: "",
    shipadd: "",
    billcontact: "",
    headoffice: null,
  };

  console.log(initialValues.name);

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

  const handleSubmit = (values) => {
    let datas = JSON.parse(localStorage.getItem("formData")) || [];
    if (editMode) {
      datas = datas.map((item) =>
        item.id === editIdData.id ? { ...values, id: editIdData.id } : item
      );
    } else {
      values.id = Math.floor(Math.random() * 100) + 1;
      datas.push(values);
    }

    localStorage.setItem("formData", JSON.stringify(datas));
    toast.success("Your Data is saved");

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
          name: Yup.string().required("required"),
          branchparentid: Yup.string().required("required"),
          branchcode: Yup.string().required("required"),
          Registrationno: Yup.number()
            .typeError("invalid data")
            .required("required"),
          pan: Yup.number().typeError("invalid data").required("required"),
          contact: Yup.number()
            .typeError("invalid data")
            .min(10, "contact number should be  between 10 to 11  characters ")
            .required("required"),
          billadd: Yup.string().required("required"),
          shipadd: Yup.string().required("required"),
          billcontact: Yup.string().required("required"),
          address: Yup.string().required("required"),
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
                    name="name"
                    className="w-[100%]"
                    placeholder=""
                    onKeyDown={(event) =>
                      handleEnterKeyPress(event, "branchparentid")
                    }
                  />
                  <ErrorMessage component="div" className="error" name="name" />
                </div>
                <div className="flex  justify-between items-center">
                  <div className="py-[5px]">
                    <label className="block">
                      Parent Branch <span>*</span>
                    </label>
                    <Field
                      className="border-[1px] px-[8px] py-[8px] outline-0 border-[#c0d3e5] w-[22em] "
                      as="select"
                      id="branchparentid"
                      name="branchparentid"
                      onKeyDown={(event) => handleEnterKeyPress(event, "branchcode")}
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
                      name="branchparentid"
                    />
                  </div>
                  <div className="py-[6px]">
                    <label className="block">
                      Branch Code <span>*</span>
                    </label>
                    <Field
                      type="text"
                      onKeyDown={(event) =>
                        handleEnterKeyPress(event, "Registrationno")
                      }
                      name="branchcode"
                      className="w-[22em]"
                      placeholder=""
                      id="branchname"
                    />
                    <ErrorMessage
                      component="div"
                      className="error"
                      name="branchcode"
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
                      name="Registrationno"
                      className="w-[22em]"
                      placeholder=""
                      id="Registrationno"
                      onKeyDown={(event) => handleEnterKeyPress(event, "pan")}
                    />
                    <ErrorMessage
                      component="div"
                      className="error"
                      name="Registrationno"
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
                      onKeyDown={(event) => handleEnterKeyPress(event, "fax")}
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
                      name="contact"
                      className="w-[22em]"
                      placeholder=""
                      id="contact"
                      onKeyDown={(event) => handleEnterKeyPress(event, "address")}
                    />
                    <ErrorMessage
                      component="div"
                      className="error"
                      name="contact"
                    />
                  </div>

                  <div className="py-[6px]">
                    <label className="block">
                      Fax <span>*</span>
                    </label>
                    <Field
                      type="text"
                      name="fax"
                      className="w-[22em]"
                      placeholder=""
                      id="fax"
                      onKeyDown={(event) => handleEnterKeyPress(event, "contact")}
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
                    <Field

                      type="file"
                      name="branchlogo"
                      className="w-[100%] opacity-0  absolute inset-0 "
                      id="image"
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
                    name="branchlogo"
                  />
                </div>


                <div className="py-[6px]">
                  <div role="group">
                    <label className='block py-[8px] font-[500] font-inter '>Head Office<span>*</span></label>
                    <div>
                      <label className=""> <input className='mx-[5px]' type="radio" name="headoffice" checked={formik.values.headoffice === true} value={true}
                        onChange={() => formik.setFieldValue('headoffice', true)} />Yes</label>
                      <label className="ml-[10px]"><input className='mx-[5px]' type="radio" name="headoffice" checked={formik.values.headoffice === false} value={false}
                        onChange={() => formik.setFieldValue('headoffice', false)} /> No</label>
                    </div>
                    <ErrorMessage component="div" className='text-[14px] text-redclr ' name="headoffice" />
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
                    id="billadd"
                    name="billadd"
                    className="w-[100%] "
                  ></Field>
                  <ErrorMessage
                    component="div"
                    className="error"
                    name="billadd"
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
                    name="shipadd"
                    id="shipadd"
                    onKeyDown={(event) =>
                      handleEnterKeyPress(event, "billcontact")
                    }
                    className="w-[100%] "
                  ></Field>
                  <ErrorMessage
                    component="div"
                    className="error"
                    name="shipadd"
                  />
                </div>

                <div className="py-[6px]">
                  <label className="block">
                    Bill Contact Info <span>*</span>
                  </label>
                  <Field
                    as="textarea"
                    type="text"
                    name="billcontact"
                    className="w-[100%]"
                    id="billcontact"
                    onKeyDown={(event) =>
                      handleEnterKeyPress(event, "image")
                    }
                  ></Field>
                  <ErrorMessage
                    component="div"
                    className="error"
                    name="billcontact"
                  />
                </div>
                <div className="py-[6px]">
                  <label className="block">
                    Bill Logo <span>*</span>
                  </label>
                  <div className="relative border-dotted border-[2px] border-[#c0d3e5] text-center py-[10px]">
                    <Field

                      type="file"
                      name="image"
                      className="w-[100%] opacity-0  absolute inset-0 "
                      id="image"
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
                    name="image"
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
