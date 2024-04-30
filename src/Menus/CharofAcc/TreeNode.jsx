import React,{useState} from "react";



export function TreeNode({ node }) {
    const { children, label } = node;
    console.log(children)
    console.log(node)
  
    const [showChildren, setShowChildren] = useState(false);
  
    const handleClick = () => {
      setShowChildren(!showChildren);
    };
    return (
      <>
        <div onClick={handleClick} style={{ marginBottom: "10px" }}>
          <span>{label}</span>
        </div>
        <ul style={{ paddingLeft: "10px", borderLeft: "1px solid black" }}>
          {showChildren && children && <ul>
            {children?.map((item)=>
        {
            <li>{item}</li>
        })}
            </ul>}
        </ul>
      </>
    );
  }