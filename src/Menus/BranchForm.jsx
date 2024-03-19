import React, { useState,useEffect } from "react";
import * as Yup from "yup";
import { Formik, ErrorMessage ,Form, Field} from "formik";
import { useLayouData } from "../Context/MainLayoutContext";
import BranchTable from "./BranchTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const BranchForm = () => {
  const { submittedData, setSubmittedData, menuComponent, setmenuComponent,getId,setId,hanldeId,setHandleId } =useLayouData();
  const initialValues={
    name: "",
    branchname: "",
    Registrationno: "",
    contact: "",
    pan: "",
    address: "",
    billadd: "",
    shipadd: "",
    billcontact: "",
  }
  

    const handleSubmitbtnn=()=>
    {
     
      toast.success("Your Data is saved");
      setmenuComponent("gotoTable");   

    }
    const [editMode, setEditMode] = useState(false);
    const [idData, setIdData] = useState('');
    const [editIdData, seteditIdData] = useState('');
   
    const dataLocal = JSON.parse(localStorage.getItem('formData'));
  //   const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     seteditIdData({
  //         ...editIdData,
  //         [name]: value,
  //     });
  // };
    useEffect(() => {
        if (getId) {
            setEditMode(true);
            setIdData(dataLocal.find((item) => item.id === getId));
            seteditIdData({
              ...dataLocal.find((item) => item.id === getId), // include the ID in the editIdData
            });
            // seteditIdData({
            //     name: idData.name,
            //     branchname: idData.branchname,
            //     Registrationno: idData.Registrationno,
            //     contact: idData.contact,
            //     address: idData.address,
            //     billadd: idData.billadd,
            //     shipadd: idData.shipadd,
            //     billcontact: idData.billcontact,
            // })
        }
        else {
            console.log('not found')
        }
      
    }, [getId])
    console.log(editIdData)
    const handleSubmit = (values) => {
      let datas = JSON.parse(localStorage.getItem('formData')) || [];
      if (editMode) {
        datas = datas.map(item => (item.id === getId ? { ...values, id: getId } : item));
      } else {
        values.id = Math.floor(Math.random() * 100) + 1;
        datas.push(values);
      }
      localStorage.setItem('formData', JSON.stringify(datas));
      toast.success("Your Data is saved");
  
    };
   
 
  // const toggleComp=()=>
  // {
  //     setSubmittedData(!buttonclik)
  //     setGotoNext(<BranchTable/>)
  // }

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
           initialValues={ editIdData && editMode ? editIdData : initialValues}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("required"),
          branchname: Yup.string().required("required"),
          Registrationno: Yup.string().required("required"),
          pan: Yup.string().required("required"),
        })}
        onSubmit={handleSubmit}
       
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit} >
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
                   

                  />
                </div>

                <div className="py-[6px]">
                  <label className="block">
                    Branch Code <span>*</span>
                  </label>
                  <Field
                    type="text"
                    name="branchname"
                    className="w-[100%]"
                    placeholder=""
                   
                   
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
                   
                    
                  />
                </div>

                <div className="py-[6px]">
                  <label className="block">
                    Address <span>*</span>
                  </label>
                  <Field
                  as = 'textarea'
                    type="text"
                   
                   
                    name="address"
                    className="w-[100%] "
                  ></Field>
                </div>
                <div className="py-[6px]">
                  <label className="block">
                    Bill Address <span>*</span>
                  </label>
                  <Field
                    as = 'textarea'
                    type="text"
                   
                   
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
                    as = 'textarea'
                    type="text"
                    name="shipadd"
                   
                  
                    className="w-[100%] "
                  ></Field>
                </div>
                <div className="py-[6px]">
                  <label className="block">
                    Bill Contact Info <span>*</span>
                  </label>
                  <Field
                    as = 'textarea'
                    type="text"
                    name="billcontact"
                    className="w-[100%]"
                   
                   
                  ></Field>
                </div>
                <div className="flex gap-[30px] items-center formbutton">
                  <button onClick={()=>setmenuComponent('gotoTable')} type="reset" className="bg-transparent border-[#d13838] border-solid py-[4px] px-[20px] border-[1px] text-[16px] font-inter font-[600] text-[#d13838]">
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BranchForm;
