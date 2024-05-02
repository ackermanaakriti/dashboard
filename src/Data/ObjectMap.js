


import BranchForm from "../Menus/BranchMenu/BranchForm";
import BranchTable from "../Menus/BranchMenu/BranchTable";
import FiscalYearForm from "../Menus/FiscalYearMenu/FiscalYearForm";
import FiscalYearTable from "../Menus/FiscalYearMenu/FiscalYearTable";
import CurrencyForm from "../Menus/CurrencyMenu/CurrencyForm";
import CurrencyTable from "../Menus/CurrencyMenu/CurrencyTable";
import CharofAccForm from "../Menus/CharofAcc/ChatofAccForm";
import AccountGroupForm from "../Menus/AccountGroupMenu/AccountGroupform";
import AccountGrpTable from "../Menus/AccountGroupMenu/AccountGrouptable";
import ChartofAccTable from "../Menus/CharofAcc/ChartofaccTable";
import VouchertypeForm from "../Menus/Voucher/VoucherTypeForm";
import VoucherTypeTable from "../Menus/Voucher/VoucherTypeTable";
import Voucher from "../Menus/Voucher/VoucherForm";
import MainVoucherForm from "../Menus/Voucher/VoucherDetailForm";
import VoucherTable from "../Menus/Voucher/VoucherTable";
import TreeView from "../Menus/CharofAcc/ChartofAccTree";
import TreeViewChart from "../Menus/CharofAcc/ChartofAccTree";
import Company from "../Menus/Company";
import CompanyForm from "../Menus/BranchMenu/Company/CompanyForm";
import CompanyTable from "../Menus/BranchMenu/Company/CompanyTable";


export const MenuComponentMap = {
   
    branch: <BranchTable/>,
    fiscalyear: <FiscalYearTable/>,
    fiscalform :<FiscalYearForm/>,  
      Form :<BranchForm/>,
    Table: <BranchTable/>,
    currency: <CurrencyTable/>,
    currencyform: <CurrencyForm/>,
    chartofaccForm : <CharofAccForm/>,
    chartofacc : <ChartofAccTable/>, 
       Accgrp : <AccountGrpTable/>,
    accform: <AccountGroupForm/>,
    vouchertypeform : <VouchertypeForm/>,
    vouchertype : <VoucherTypeTable/>,
    voucher : <VoucherTable/>,
    voucherForm : <Voucher/>,
    treeview: <TreeViewChart/>,
    companytable: <CompanyTable/>,
    companyform : <CompanyForm/>


   
  };


  