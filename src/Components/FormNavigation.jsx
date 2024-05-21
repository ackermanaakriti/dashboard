import {
    useRef,
    useEffect
} from 'react';

function useFormNavigation() {
    const formRef = useRef(null);
    useEffect(() => {
        const handleKeyDown = (e) => {
            const form = formRef.current;
            if (!form) return;
            const focusableElements = Array.from(form.querySelectorAll('input, select, textarea, button, [tabindex]:not([tabindex="-1"])')).filter(el => !el.disabled && el.tabIndex >= 0);
            const index = focusableElements.indexOf(document.activeElement);
            if (e.key === 'Enter') {
                e.preventDefault();
                const nextElement = focusableElements[index + 1] || focusableElements[0];
                nextElement.focus();
            }
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (index > 0) {
                        e.preventDefault();
                        focusableElements[index - 1].focus();
                    }
                } else {
                    if (index < focusableElements.length - 1) {
                        e.preventDefault();
                        focusableElements[index + 1].focus();
                    }
                }
            }
        };
        const formElement = formRef.current;
        formElement.addEventListener('keydown', handleKeyDown);
        return () => {
            formElement.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    return formRef;
}
export default useFormNavigation;

// import React from 'react';
// import useFormNavigation from './useFormNavigation';

// function MyForm() {
//     const formRef = useFormNavigation();
//     return ( < form ref = {
//                 formRef
//             } > < div > < label > First Name: < input type = "text"
//             name = "firstName" / > < /label> </div > < div > < label > Last Name: < input type = "text"
//             name = "lastName" / > < /label> </div > < div > < label > Email: < input type = "email"
//             name = "email" / > < /label> </div > < div > < label > Phone: < input type = "tel"
//             name = "phone" / > < /label> </div > < div > < button type = "submit" > Submit < /button> </div > < /form> ); } 
//             export default MyForm;