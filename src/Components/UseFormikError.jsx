import { useEffect } from "react";

const useFormikFocusOnError = (formikRef) => {
  useEffect(() => {
    if (formikRef.current) {
      const handleSubmitWithFocus = async (e) => {
        const errors = await formikRef.current.validateForm();
        const firstErrorKey = Object.keys(errors)[0];
        if (firstErrorKey) {
          const errorElement = document.getElementById(firstErrorKey);
          if (errorElement) {
            errorElement.focus();
          }
        }
        formikRef.current.handleSubmit(e);
      };

      formikRef.current.submitFormWithFocus = handleSubmitWithFocus;
    }
  }, [formikRef]);
};

export default useFormikFocusOnError;
