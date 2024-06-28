import React from "react";
import { Field, ErrorMessage } from "formik";

/*
 * This component renders an input field with a label, error message, and various props to control its behavior.
 * - `label`: The label text for the input field.
 * - `required`: Boolean to indicate if the field is required.
 * - `name`: The name attribute for the input field.
 * - `value`: The value of the input field.
 * - `onChange`: The onChange handler for the input field.
 * - `textColor`: The color of the label text.
 * - `number`: Boolean to determine if the input type should be number.
 * - `disabled`: Boolean to disable the input field.
 * - `id`: The id attribute for the input field.
 */
export const InputField = ({
  label,
  required,
  name,
  value,
  onChange,
  textColor,
  number,
  disabled,
  id
}) => {
  return (
    <div className="flex flex-col">
      {/* Label for the input field */}
      <label htmlFor={name} className={`font-[500] font-inter text-${textColor}`}>
        <span>{label}</span>
        {required ? <span className="text-redclr pl-[2px]">*</span> : ""}
      </label>
      
      {/* Input field with conditional type and various attributes */}
      <Field
        name={name}
        type={number ? "number" : "text"}
        value={value}
        onChange={onChange}
        disabled={disabled}
        id={id}
        className="border-[1px] border-solid font-inter mt-[5px] p-2 border-borderclr outline-none focus:border-SecondaryColor focus:border-1"
      />
      
      {/* Error message for the input field */}
      <ErrorMessage
        component={"div"}
        name={name}
        className="text-redclr text-sm"
      />
    </div>
  );
};
