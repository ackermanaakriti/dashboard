    import React, { useEffect } from 'react'
import { FocuseErrorField } from '../FocusErrorField';

    const SubmitButton = ({formik,focusFirstErrorField,type,editMode,handleSubmit}) => {
    
        console.log(formik.errors)
        return (
            
                <button
                    className="bg-PrimaryColor px-[15px] py-[4px] text-white font-inter focus:bg-[#6bc2eb]"
                    type={type}
                    id='btnsubmit'
                    onClick={(event) => {
                        event.preventDefault();
                        if (!formik.isValid || !formik.dirty) {
                          console.log("Form is invalid or not dirty.");
                          FocuseErrorField(formik.errors);
                        } else {
                          console.log("Form is valid and dirty. Submitting...");
                          handleSubmit(formik);
                        }
                      }}
                >
                    {editMode ? "Update" : "Save"}
                </button>
            
        )
    }

    export default SubmitButton