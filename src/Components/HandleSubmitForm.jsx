// HandleSubmitForm.jsx

import React from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';


const HandleSubmitForm = ({ values, resetForm, navigatelink, editMode, updateData, navigate, postdata, validationSchema }) => {
  const handleSubmit = async () => {
   
    try {
      // Validate the form using Yup schema
      await validationSchema.validate(values, { abortEarly: false });
   console.log(values)
      // If validation succeeds, submit the form
      if (editMode) {
        updateData(values);
        navigate(navigatelink);
      } else {
        postdata(values);
        resetForm();
        // document.getElementById('name').focus();
      }
    } catch (error) {
        console.log(error)
      if (error.inner.length > 0) {
        const errorPaths = error.inner.map((item) => item.path);
        errorPaths.forEach((path) => {
          const elm = document.getElementById(path);
          if (elm) {
            elm.style.borderColor = 'red';
            elm.addEventListener('input', () => {
              elm.style.borderColor = 'rgb(192 211 229)';
            });
          }
        });
        toast.error('Validation Error');

        const firstErrorField = error.inner[0].path;
        const element = document.getElementById(firstErrorField);
        if (element) {
          element.focus();
        }
      }
    }
  };

  return handleSubmit;
};

export default HandleSubmitForm;
