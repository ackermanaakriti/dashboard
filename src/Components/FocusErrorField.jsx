import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/*
 * This function handles the display and focus of form validation errors.
 * - It takes an object of errors as input.
 * - Displays a toast notification for a validation error.
 * - Highlights the error fields with a red border.
 * - Sets up an event listener to reset the border color when the user starts typing.
 * - Focuses on the first error field.
 */
export const FocuseErrorField = (errors) => {
    // Extracts the keys of the error object, representing the field names with errors.
    const errorKeys = Object.keys(errors);

    // Displays a toast notification indicating a validation error.
    toast.error('Validation Error');

    // Iterates over the error keys and highlights each corresponding field.
    errorKeys.forEach((item) => {
        const errorfield = document.getElementById(item);
        if (errorfield) {
            errorfield.style.borderColor = 'red'; // Highlights the error field with a red border.
            // Adds an event listener to reset the border color when the user starts typing.
            errorfield.addEventListener('input', () => {
                errorfield.style.borderColor = 'rgb(192, 211, 229)';
            });
        }
    });

    // Focuses on the first field with an error.
    if (errorKeys.length > 0) {
        const firstErrorFieldName = errorKeys[0];
        const firstErrorField = document.getElementById(firstErrorFieldName);
        if (firstErrorField) {
            firstErrorField.focus(); // Focuses on the first error field.
        }
    }
};
