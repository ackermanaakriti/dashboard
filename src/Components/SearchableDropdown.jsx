import React, { useEffect, useRef, useState } from "react";

const SearchableDropdown = ({ options, label, id, selectedVal, handleChange }) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  console.log(options)

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  const toggle = (e) => {
    setIsOpen(e && e.target === inputRef.current);
  };

  const selectOption = (option) => {
    console.log(option)
    setQuery("");
    handleChange(option);
    setIsOpen(!isOpen);
  };

  const getDisplayValue = () => {
    console.log(selectedVal)
    return query || selectedVal ;
  };

  

//   const filteredOptions = options?.filter(option =>
//     option.accounName.toLowerCase().includes(query.toLowerCase())
//   );
const filteredOptions = options?.data?.filter(item=>item.accountName.toLowerCase().includes(query.toLocaleLowerCase()))
console.log(filteredOptions)
  

  return (
    <div className="dropdown ">
      <div className="control">
        <div className="selected-value flex">
          <input
          className="border-[1px]  py-[8px] px-[12px]  w-full outline-none border-borderclr"
            ref={inputRef}
            type="text"
            placeholder="select chartOfAccount"
            value={getDisplayValue()}
            onChange={(e) => {
              setQuery(e.target.value);
              handleChange(null);
            }}
            onClick={toggle}
          />
          <div onClick={()=>setIsOpen(true)}></div>
        </div>
        <div className={`arrow ${isOpen ? "open" : ""}`}> </div>
      </div>

{ isOpen &&   <div className='overflow-y-auto h-[150px]'>
        {filteredOptions?.map((option, index) => (
          <div
            onClick={() => selectOption(option?.accountName)}
            className={`option ${option[label] === selectedVal ? "selected" : ""}`}
            key={`${id}-${index}`}
          >
            {option.accountName}
          </div>
        ))}
      </div>}
     
    </div>
  );
};

export default SearchableDropdown;
