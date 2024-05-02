import React from 'react'
import MainForm from '../Components/MainForm'

const Company = () => {



    const initialValues ={
            name: "tes01",
            code: "tes01",
            regestrationNo: "111",
            pan: "111",
            contactNumber: "11",
            fax: "11",
            address: "tes01",
            shipAddress: "tes01",
            billContactInfo: "232",
            logo: null,
            billLogo: "44ba6882-0edd-4012-a87a-bc25b6942a9d.jpg",
            isActive: true
    }

    const CustomSetting = [
        {
            label:'Name',
            type:'',
            class:'1',
            as:'input',
            name:'name'
        },
        {
            label:'Code',
            type:'',
            class:'1',
            as:'input',
            name:'code'
        },
        {
            label:'Registration No',
            type:'',
            class:'1',
            as:'input',
            name:'regestrationNo'
        },
        {
            label:'Pan',
            type:'',
            class:'1',
            as:'input',
            name:'pan'
        },
        {
            label:'Contact Number',
            type:'',
            class:'1',
            as:'input',
            name:'contactNumber'
        },
        {
            label:'Fax',
            type:'',
            class:'1',
            as:'input',
            name:'fax'
        },
        {
            label:'Address',
            type:'',
            class:'full',
            as:'textarea',
            name:'address'
        },
        {
            label:'Logo',
            type:'file',
            class:'full',
            as:'input',
            name:'logo'
        },
    ]

    console.log(CustomSetting.length)
    
  return (
    <>
    <MainForm initial={initialValues} settings ={CustomSetting} formName='Company'/>
    </>
  )
}

export default Company