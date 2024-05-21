import { useEffect } from 'react';
import { toast } from 'react-toastify';

const useFormErrorHandling = (error) => {
  useEffect(() => {
    if (error && error.inner && error.inner.length > 0) {
      const errorPaths = error.inner.map((item) => item.path);

      errorPaths.forEach((path) => {
        const elm = document.getElementById(path);
        if (elm) {
          elm.style.borderColor = 'red';
        }
      });

      toast.error('Validation Error');

      const firstErrorField = error.inner[0].path;
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.focus();
      }

      errorPaths.forEach((path) => {
        const elm = document.getElementById(path);
        if (elm) {
          const inputHandler = () => {
            elm.style.borderColor = 'rgb(192, 211, 229)';
            elm.removeEventListener('input', inputHandler);
          };
          elm.addEventListener('input', inputHandler);
        }
      });
    }
  }, [error]);
};

export default useFormErrorHandling;
