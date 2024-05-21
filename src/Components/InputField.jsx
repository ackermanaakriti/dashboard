// InputField.js
import React from "react";

const InputField = ({ form, name, label, nextFieldId, ...props }) => {
    console.log(form)
 
  

  return (
    <div className="py-[8px]">
      <label className="block py-[5px] font-[500] font-inter">{label}</label>
      <input
        id={name}
        {...form.getFieldProps(name)}
        className={`border-[1px] w-[100%] py-[8px] px-[12px] outline-none ${
          form.errors[name] ? 'border-redclr' : 'border-borderclr'
        }`}
        {...props}
      />
      {form.errors[name]  && (
        <div className="text-[14px] text-redclr">{form.errors[name]}</div>
      )}
    </div>
  );
};

export default InputField;
