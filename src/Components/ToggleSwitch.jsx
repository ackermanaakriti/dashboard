import { Field } from "formik";
import React from "react";
import './Component.css'
export const ToggleSwitch = ({
  label,
  name,
  required,
  checked,
  onChange,
  oneLine,
}) => {
  return (
    <div className={oneLine ? "flex gap-x-2 " : ""}>
      <div className="pb-[8px]">
        <span className="font-semibold">{label}</span>
        {required ? <span className="text-errorColor"></span> : ""}
      </div>

      <label className="switch ">
        <Field
          type="checkbox"
          name={name}
          className="switch-input "
          checked={checked}
          onChange={onChange}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};