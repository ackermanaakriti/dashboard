import React, { useState ,useEffect} from "react";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import { useLayouData } from "../Context/MainLayoutContext";
import BranchTable from "../Menus/BranchTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const EditForm = () => {
  const { submittedData, setSubmittedData, menuComponent, setmenuComponent,getId,setId } =useLayouData();

  const datas = JSON.parse(localStorage.getItem('formData'))
    // console.log(datas)
    const selectdata = datas.find((item,i)=>i === getId);
    console.log(selectdata)
   
    const handleSubmitbtnn=()=>
    {
     
      toast.success("Your Data is saved");
      setmenuComponent("gotoTable");   
      setInterval(() => {
     
      }, 2000);
    }
    console.log(menuComponent)
 
 

  return (
    <div className="Branchform ">
      
      <ToastContainer />
 {console.log('je;;p')}
      <div className="pb-[25px]">
        <h3 className="font-inter font-semibold text-[30px]">
        Update Branch
        </h3>
      </div>

      <Formik
        initialValues={{
          name: "",
          branchname: "",
          Registrationno: "",
          contact: "",
          pan: "",
          address: "",
          billadd: "",
          shipadd: "",
          billcontact: "",
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("required"),
          branchname: Yup.string().required("required"),
          Registrationno: Yup.string().required("required"),
          pan: Yup.string().required("required"),
        })}
        onSubmit={(values) => {
          setSubmittedData([...submittedData, values]);
          console.log(submittedData)
         
     
          console.log(submittedData)
          localStorage.setItem('formData', 1);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} >
            <div className="grid grid-cols-2 gap-[90px]">
              <div>
                <div className="py-[5px]">
                  <label className="block">
                    Name <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-[100%]"
                    placeholder=""
                    onChange={(e) => {
                      formik.handleChange(e);
                      selectdata.name = e.target.value; // Update selectdata with the new value
                    }}
                    value={ selectdata.name && selectdata.name}
                  />
                </div>

                <div className="py-[6px]">
                  <label className="block">
                    Branch Code <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="branchname"
                    className="w-[100%]"
                    placeholder=""
                    onChange={formik.handleChange}
                    
                    value={ selectdata.branchname && selectdata.branchname}
                  />
                </div>
                <div className="py-[6px]">
                  <label className="block">
                    Regestration No. <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="Registrationno"
                    className="w-[100%]"
                    placeholder=""
                    onChange={formik.handleChange}
                    
                    value={ selectdata.Registrationno}
                  />
                </div>
                <div className="py-[6px]">
                  <label className="block">
                    Contact <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="contact"
                    className="w-[100%]"
                    placeholder=""
                    onChange={formik.handleChange}
                    value={selectdata.contact}
                  />
                </div>
                <div className="py-[6px]">
                  <label className="block">
                    PAN <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="pan"
                    className="w-[100%]"
                    placeholder=""
                    onChange={formik.handleChange}
                    value={selectdata.pan}
                  />
                </div>

                <div className="py-[6px]">
                  <label className="block">
                    Address <span>*</span>
                  </label>
                  <textarea
                    type="text"
                    onChange={formik.handleChange}
                    value={selectdata.address}
                    name="address"
                    className="w-[100%] "
                  ></textarea>
                </div>
                <div className="py-[6px]">
                  <label className="block">
                    Bill Address <span>*</span>
                  </label>
                  <textarea
                    type="text"
                    onChange={formik.handleChange}
                    value={selectdata.billadd}
                    name="billadd"
                    className="w-[100%] "
                  ></textarea>
                </div>
              </div>
              <div>
                <div className="py-[6px]">
                  <label className="block">
                    {" "}
                    Ship Address <span>*</span>
                  </label>
                  <textarea
                    type="text"
                    name="shipadd"
                    onChange={formik.handleChange}
                    value={selectdata.shipadd}
                    className="w-[100%] "
                  ></textarea>
                </div>
                <div className="py-[6px]">
                  <label className="block">
                    Bill Contact Info <span>*</span>
                  </label>
                  <textarea
                    type="text"
                    name="billcontact"
                    className="w-[100%]"
                    onChange={formik.handleChange}
                    value={selectdata.billcontact}
                  ></textarea>
                </div>
                <div className="flex gap-[30px] items-center formbutton">
                  <button type="reset" className="bg-transparent border-[#d13838] border-solid py-[4px] px-[20px] border-[1px] text-[16px] font-inter font-[600] text-[#d13838]">
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitbtnn}
                    type="submit"
                    className="bg-PrimaryColor py-[4px] px-[20px] text-[16px] font-inter  text-white o "
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default EditForm;
