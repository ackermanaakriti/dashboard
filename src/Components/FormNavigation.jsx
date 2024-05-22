import React, { useRef, useEffect } from 'react';

function useFormNavigation() {
    const formRef = useRef(null);

    useEffect(() => {
        const formElement = formRef.current;
        if (!formElement) return;

        const handleKeyDown = (e) => {
            const focusableElements = Array.from(formElement.querySelectorAll('input, select, textarea, button, [tabindex]:not([tabindex="-1"])'))
                .filter(el => !el.disabled && el.tabIndex >= 0);
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
                    } else {
                        // If the first focusable element is focused and Shift+Tab is pressed,
                        // focus should shift to the submit button
                        e.preventDefault();
                        document.getElementById('btnsubmit').focus();
                    }
                } else {
                    if (index === focusableElements.length - 1) {
                        // If the last focusable element is focused and Tab is pressed,
                        // focus should shift to the submit button
                        e.preventDefault();
                        document.getElementById('btnsubmit').focus();
                    }
                }
            }
        };

        formElement.addEventListener('keydown', handleKeyDown);

        const focusableElements = Array.from(formElement.querySelectorAll('input, select, textarea, button, [tabindex]:not([tabindex="-1"])'))
            .filter(el => !el.disabled && el.tabIndex >= 0);

        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }

        return () => {
            formElement.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return formRef;
}
export default useFormNavigation;
