import React, { useEffect, useState, useCallback } from 'react';
import CharofAccTreeForm from './Charoftreeform';
import useGetData from '../../Apis/useGetData';
import { IoAddCircleOutline } from "react-icons/io5";
import { AiFillFolderOpen } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router";
import { CiViewTable } from "react-icons/ci";

const TreeNode = ({ node, level = 0, isLastChild = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [parentAccountId, setParentId] = useState('');
  const [mainParentId, setmainParentId] = useState('');
  const [accountGroupId, setAccountGroup] = useState('');

  const handleToggle = () => {
    setIsExpanded(prevIsExpanded => !prevIsExpanded);
  };

  useEffect(() => {}, [showForm]);

  const handleAddData = (node) => {
    setShowForm(!showForm);
  };

  return (
    <div className={`relative ${level > 0 ? 'pl-[2px]' : ''}`}>
      {level > 0 && (
        <div className={`absolute left-0 top-0 h-full border-l border-gray-400 ${isLastChild ? 'h-[50%]' : 'h-full'}`}></div>
      )}
      <div onClick={handleToggle} className="flex gap-2 py-3 px-2 items-center hover:bg-[#ecf3f2] relative">
        {level > 0 && (
          <div className="absolute left-0 top-[50%] -ml-[1px] w-6 border-t border-gray-400"></div>
        )}
        {node?.isTransactional ? (
          <span className="px-2 py-1 mr-1 text-2xl"><AiFillFolderOpen style={{ opacity: 0 }} /></span>
        ) : (
          <span className="px-2 text-PrimaryColor py-1 mr-1 text-2xl"><AiFillFolderOpen /></span>
        )}
        <h2 className="text-lg text-PrimaryColor cursor-pointer"> {node.accountName}</h2>
        <span
          onClick={() => {
            setmainParentId(node?.mainParentId);
            setParentId(node?.id);
            handleAddData(node);
            setAccountGroup(node?.accountGroupId);
          }}
          className="text-PrimaryColor px-2 py-1 mr-1 text-2xl"
        >
          <IoAddCircleOutline />
        </span>
        <span className='font-inter text-[#cbcdd1]'>  {node.accountCode}</span>
      </div>
      {isExpanded && (
        <div className="pl-4">
          {node?.children?.map((child, index) => (
            <TreeNode 
              key={child.id} 
              node={child} 
              level={level + 1} 
              isLastChild={index === node.children.length - 1} 
            />
          ))}
        </div>
      )}
      {showForm && (
        <>
          <div className="overlay fixed inset-0 w-full bg-[rgba(36,35,35,0.12)]">
            <div className="h-full w-full flex justify-center items-center">
              <div className="h-[600px] w-[50%]">
                <span onClick={() => setShowForm(false)} className="float-right mt-8 mr-5 text-PrimaryColor text-2xl cursor-pointer"><RxCross2 /></span>
                <CharofAccTreeForm setShowForm={setShowForm} node={node} mainParentId={mainParentId} parentAccountId={parentAccountId} accountGroupId={accountGroupId} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const TreeViewChart = () => {
  const navigate = useNavigate();
  const { data, fetchData } = useGetData('ChartOfAccount/GetTree');
  
 

  const renderTreeNodes = useCallback(() => {
    return data?.map((node, index) => (
      <TreeNode 
        key={node.id} 
        node={node} 
        isLastChild={index === data.length - 1} 
      />
    ));
  }, [data]);

  return (
    <div className="py-8" style={{zIndex:1}}>
      <div className="flex gap-8 items-center">
        <h1 className="px-3 text-PrimaryColor text-[30px] font-inter font-[500]">Chart of Account</h1>
        <p onClick={() => navigate('/chartofaccount/listview')} className="text-PrimaryColor cursor-pointer flex items-center gap-4">
          View List
          <span className="text-PrimaryColor text-2xl"><CiViewTable /></span>
        </p>
      </div>
      <div className='pt-[20px]'>
        {renderTreeNodes()}
      </div>
    </div>
  );
};

export default TreeViewChart;
