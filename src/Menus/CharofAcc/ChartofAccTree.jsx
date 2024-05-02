

import React, { useState } from 'react';
import CharofAccTreeForm from './Charoftreeform';
import useGetData from '../../Apis/useGetData';
import { IoAddCircleOutline } from "react-icons/io5";
import { AiFillFolderOpen } from "react-icons/ai";
import { AiFillFolder } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";




const TreeNode = ({ node }) => {
  console.log(node.children)

  const [isExpanded, setIsExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [parentAccountId, setParentId] = useState('');
  const [mainParentId, setmainParentId] = useState('');
  const [accountGroupId, setAccountGroup] = useState('');

  const handleToggle = () => {
    setIsExpanded(!isExpanded);

  };

  const handleAddData = (node) => {
    setShowForm(!showForm);
    if (node.children.length === 0 && node.children.accountGroup) {

      setAccountGroupForChildren(node, node.children.accountGroup);
    }
    

  };

  const setAccountGroupForChildren = (parentNode, accountGroup) => {
    parentNode.children.forEach(child => {
      child.accountGroup = accountGroup;
      if (child.children && child.children.length > 0) {
        setAccountGroupForChildren(child, accountGroup);
      }
    });
  };

  return (
    <div className='px-[2em] '>
      <div onClick={handleToggle} className='flex gap-[10px] py-[15px] px-[8px] align-center hover:bg-[#ecf3f2]'>
        {node?.isTransactional ? <span className='text-PrimaryColor px-[8px] py-[2px] mr-[5px] text-[22px]'><AiFillFolderOpen /></span> : <span className='px-[8px] py-[2px] mr-[5px] '></span>}
        <h2 className='text-[20px] text-PrimaryColor cursor-pointer'> {node.accountName}</h2>
        <span onClick={() => {
          setmainParentId(node?.mainParentId);
          setParentId(node?.id);
          handleAddData(node);
          setAccountGroup(node?.accountGroupId)
        }} className='text-PrimaryColor px-[8px] py-[2px] mr-[5px] text-[22px]' ><IoAddCircleOutline /></span>

      </div>
      {isExpanded && (
        <div style={{ paddingLeft: '20px' }}>
          {node.children.map(child => (
            <TreeNode key={child.id} node={child} />
          ))}
        </div>
      )}
      {showForm && (
        <>
          <div className='overlay fixed inset-0 w-full bg-[rgba(36,35,35,0.12)]'>
            <div className='h-full w-full flex justify-center items-center'>
              <div className='h-[600px] w-[50%]'>
                <span onClick={()=>setShowForm(false)} className='float-right mt-[30px] mr-[20px] text-PrimaryColor text-[24px] cursor-pointer'><RxCross2/></span>
                <CharofAccTreeForm node={node} mainParentId={mainParentId} parentAccountId={parentAccountId} accountGroupId={accountGroupId} />
              </div>
            </div>
          </div>
       
        </>
      )}

    </div>
  );
};

const TreeViewChart = () => {
  const { data } = useGetData('ChartOfAccount/GetTree')
  console.log(data)


  return (
    <div>
      {data?.data?.map(node => (
        <TreeNode key={node.id} node={node} />
      ))}
    </div>
  );
};

export default TreeViewChart;



