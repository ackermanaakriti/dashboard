import React, { useState } from 'react';

export const treeData = [
  {
    key: "0",
    label: "Assests",
   parentId:0,
    children: [
      {
        key: "0-0",
        label: "Current Asset",
        isTransactional:true,
        children: [
          {
            key: "0-1-1",
            label: "document-children",
            isTransactional:true,
            
          },
          {
            key: "0-1-2",
            label: "docum-children",
            isTransactional:true,
          },
        ],
      },
      
        {
          key: "0-0",
          label: "Non Current Asset",
          isTransactional:true,
          children: [
            {
              key: "0-1-1",
              label: "document-children",
              isTransactional:true,
              
            },
            {
              key: "0-1-2",
              label: "docum-children",
              isTransactional:true,
              children:[
                {
                  label:'hello this s sdf',
                  isTransactional:true,
                }
              ]
            },
          ],
        },

    ],
  },
  {
    key: "1",
    label: "Liability",
    parentId:0,
    children: [
      {
        key: "0-0",
        label: "Current Liability",
        isTransactional:false,
        children: [
          {
            key: "0-1-1",
            label: "sub liability",
            isTransactional:true,
            
          },
          {
            key: "0-1-2",
            label: "sub liability",
            isTransactional:true,
          },
        ],
      },
      {
        key: "0-0",
        label: "Non Current Liability",
        isTransactional:true,
        children: [
          {
            key: "0-1-1",
            label: "sub liability",
            isTransactional:true,
            
          },
          {
            key: "0-1-2",
            label: "sub liability",
            isTransactional:true,
          },
        ],
      },
    ],
  },
  {
    key: "2",
    label: "Equity",
    parentId:0,
    children: [],
  },
];




