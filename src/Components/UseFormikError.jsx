import { useEffect } from 'react';

const useFormikFocusOnError = (formik) => {
  useEffect(() => {
    if (formik.errors && formik.submitCount > 0) {
      const errorKeys = Object.keys(formik.errors);
      if (errorKeys.length > 0) {
        const firstErrorField = errorKeys[0];
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        if (element) {
          element.focus();
        }
      }
    }
  }, [formik.errors, formik.submitCount]);
};

export default useFormikFocusOnError;
