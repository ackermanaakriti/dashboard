import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
 export const FocuseErrorField = (errors) => {

    const errorKeys = Object.keys(errors);
    toast.error('Validation Error') 
    errorKeys.forEach((item) => {
      const errorfield = document.getElementById(item);
      if (errorfield) {
        errorfield.style.borderColor = 'red';
        errorfield.addEventListener('input', () => {
          errorfield.style.borderColor = 'rgb(192, 211, 229)';
        });
      }
    });

   
  
    if (errorKeys.length > 0) {
      const firstErrorFieldName = errorKeys[0];
      const firstErrorField = document.getElementById(firstErrorFieldName);
      if (firstErrorField) {
        firstErrorField.focus();
      }
    }
  };
  