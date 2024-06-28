import React from 'react';
import { FocuseErrorField } from '../FocusErrorField';

/*
 * This is the SubmitButton component. It handles form submission and error focusing.
 * - If the form has errors, it calls the FocusErrorField function to focus on the error field.
 * - If there are no errors, it calls the handleSubmit function to submit the form.
 * - It prevents the default submit event and checks for form errors before submitting.
 */
const SubmitButton = ({ formik, type, editMode, handleSubmit }) => {
    // Handles key press events to check for 'Enter' key and trigger validation or submission
    const handleKeyPress = (event, formik) => {
        if (event.key === 'Enter' && event.target.type !== 'textarea') {
            if (!formik.isValid || !formik.dirty) {
                FocuseErrorField(formik.errors); // Calls function to focus on error field
            } else {
                handleSubmit(formik); // Calls handleSubmit function to submit the form
            }
        }
    };

    return (
        <button
            className="bg-PrimaryColor px-[15px] py-[4px] text-white font-inter focus:bg-[#6bc2eb]"
            type={type}
            id="btnsubmit"
            onKeyDown={(e) => handleKeyPress(e, formik)}
            onClick={(event) => {
                // Prevents the default submit event and checks for form errors before submitting
                event.preventDefault();
                if (!formik.isValid || !formik.dirty) {
                    FocuseErrorField(formik.errors); // Calls function to focus on error field
                } else {
                    handleSubmit(formik); // Calls handleSubmit function to submit the form
                }
            }}
        >
            {editMode ? "Update" : "Save"}
        </button>
    );
};

export default SubmitButton;
