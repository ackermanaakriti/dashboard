import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, ErrorMessage, Form, Field } from "formik";
import { useLayouData } from "../Context/MainLayoutContext";
import BranchTable from "./BranchTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addMenu } from "../Redux/TopTabSlice";

const BranchForm = () => {
  const { getId, setId, hanldeId, setHandleId } = useLayouData();
  const dispatch = useDispatch();
  const initialValues = {
    name: "",
    branchname: "",
    Registrationno: "",
    contact: "",
    pan: "",
    address: "",
    billadd: "",
    shipadd: "",
    billcontact: "",
  };

  const handleSubmitbtnn = () => {
    toast.success("Your Data is saved");
    dispatch(addMenu("Colleges"));
  };
  const [editMode, setEditMode] = useState(false);
  const [idData, setIdData] = useState("");
  const [editIdData, seteditIdData] = useState("");
  const dataLocal = JSON.parse(localStorage.getItem("formData"));
 
  useEffect(() => {
    if (getId) {
      setEditMode(true);
      setIdData(dataLocal.find((item) => item.id === getId));
      seteditIdData({
        ...dataLocal.find((item) => item.id === getId), 
      });
    } else {
      console.log("not found");
    }
   return 
  }, [setHandleId]);
  

  const handleSubmit = (values) => {
    let datas = JSON.parse(localStorage.getItem("formData")) || [];
    if (editMode) {
      datas = datas.map((item) =>
        item.id === getId ? { ...values, id: getId } : item
      );
    } else {
      values.id = Math.floor(Math.random() * 100) + 1;
      datas.push(values);
    }
    localStorage.setItem("formData", JSON.stringify(datas));
    toast.success("Your Data is saved");
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
          Add/Update Branch
        </h3>
      </div>

      <Formik
        enableReinitialize={true}
        initialValues={
          hanldeId && editIdData && editMode ? editIdData : initialValues
        }
        validationSchema={Yup.object().shape({
          name: Yup.string().required("required"),
          branchname: Yup.string().required("required"),
          Registrationno: Yup.string().required("required"),
          pan: Yup.string().required("required"),
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
                      handleEnterKeyPress(event, "branchname")
                    }
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
                    name="branchname"
                    className="w-[100%]"
                    placeholder=""
                    id="branchname"
                  />
                </div>

                <div className="py-[6px]">
                  <label className="block">
                    Regestration No. <span>*</span>
                  </label>
                  <Field
                    type="text"
                    name="Registrationno"
                    className="w-[100%]"
                    placeholder=""
                    id="Registrationno"
                    onKeyDown={(event) => handleEnterKeyPress(event, "contact")}
                  />
                </div>

                <div className="py-[6px]">
                  <label className="block">
                    Contact <span>*</span>
                  </label>
                  <Field
                    type="text"
                    name="contact"
                    className="w-[100%]"
                    placeholder=""
                    id="contact"
                    onKeyDown={(event) => handleEnterKeyPress(event, "pan")}
                  />
                </div>

                <div className="py-[6px]">
                  <label className="block">
                    PAN <span>*</span>
                  </label>
                  <Field
                    type="text"
                    name="pan"
                    className="w-[100%]"
                    placeholder=""
                    id="pan"
                    onKeyDown={(event) => handleEnterKeyPress(event, "address")}
                  />
                </div>

                <div className="py-[6px]">
                  <label className="block">
                    Address <span>*</span>
                   </label>
                   <Field
                    as="textarea"
                    type="text"
                    onKeyDown={(event) => handleEnterKeyPress(event, "billadd")}
                    id="address"
                    name="address"
                    className="w-[100%] "
                   ></Field>
                 </div>

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
                </div>
              </div>

              <div>
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
                      handleEnterKeyPress(event, "btnsubmit")
                    }
                  ></Field>
                </div>


                <div className="flex gap-[30px] items-center formbutton">
                  <button
                    onClick={() => dispatch(addMenu("Table"))}
                    type="reset"
                    className="bg-transparent border-[#d13838] border-solid py-[4px] px-[20px] border-[1px] text-[16px] font-inter font-[600] text-[#d13838]">
                    Cancel
                    </button>
                    <button
                    onClick={handleSubmitbtnn}
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
