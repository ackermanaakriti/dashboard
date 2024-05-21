// RadioField.js
import React from "react";

const RadioField = ({ field, name,form, label, value, ...props }) => {
    console.log(field,form,props,name)
  return (
    <div className="py-[6px]">
      <div role="group">
        <label className="block py-[8px] font-[500] font-inter">{label}</label>
        <div>
          <label>
            <input
              type="radio"
             
              {...props}
              value={value}
              checked={value === value}
            />
            {label}
          </label>
        </div>
        {form.errors[name] && form.touched[name] && (
          <div className="text-[14px] text-redclr">{form.errors[name]}</div>
        )}
      </div>
    </div>
  );
};

export default RadioField;
