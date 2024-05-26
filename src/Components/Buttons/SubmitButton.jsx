    import React, { useEffect } from 'react'
import { FocuseErrorField } from '../FocusErrorField';

    const SubmitButton = ({formik,type,editMode,handleSubmit}) => {
     

        const handleKeyPress = (event,formik) => {
            if (event.key === 'Enter' && event.target.type !== 'textarea') {
                if (!formik.isValid || !formik.dirty) {
                    console.log("Form is invalid or not dirty.");
                    FocuseErrorField(formik.errors);
                  } else {
                    console.log("Form is valid and dirty. Submitting...");
                    handleSubmit(formik);
                  }
            }
        }
    

        return (
            
                <button
                    className="bg-PrimaryColor px-[15px] py-[4px] text-white font-inter focus:bg-[#6bc2eb]"
                    type={type}
                    id='btnsubmit'
                    onKeyDown={(e)=>handleKeyPress(e,formik)}
                    onClick={(event) => {
                        event.preventDefault();
                        if (!formik.isValid || !formik.dirty) {
                          FocuseErrorField(formik.errors);
                        } else {
                          handleSubmit(formik);
                        }
                      }}
                >
                    {editMode ? "Update" : "Save"}
                </button>
            
        )
    }

    export default SubmitButton