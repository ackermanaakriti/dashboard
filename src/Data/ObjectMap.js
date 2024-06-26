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
import EmployeeForm from "../Menus/EmployeeMenu/EmployeeForm";
import EmployeeTable from "../Menus/EmployeeMenu/EmployeeTable";
import ModuleForm from "../Menus/ModuleMenu/ModuleForm";
import ModuleTable from "../Menus/ModuleMenu/ModuleTable";
import DepartmentTable from "../Menus/DepartmentMenu/DepartmentTable";
import DepartmentForm from "../Menus/DepartmentMenu/DepartMentForm";

import CustomerForm from "../Menus/CustomerMenu/CustomerForm";
import CustomerTable from "../Menus/CustomerMenu/CustomerTable";import VendorTable from "../Menus/Vendor/VendorTable";
import VendorForm from "../Menus/Vendor/VendorForm";
import BankForm from "../Menus/Bank/BankForm";
import BankTable from "../Menus/Bank/BankTable";
import VocherSequenceForm from "../Menus/Voucher/VoucherSequenceForm";
import VoucherSeqTable from "../Menus/Voucher/VoucherSequenceTable";

export const MenuComponentMap = {
   
    branch: <BranchTable/>,
    fiscalyeartable: <FiscalYearTable/>,
    fiscalform :<FiscalYearForm/>,  
      branchForm :<BranchForm/>,
    branchtable: <BranchTable/>,
    currencytable: <CurrencyTable/>,
    currencyform: <CurrencyForm/>,
    chartofaccForm : <CharofAccForm/>,
    chartofacctable : <ChartofAccTable/>, 
       Accgrptable : <AccountGrpTable/>,
    accgroupform: <AccountGroupForm/>,
    vouchertypeform : <VouchertypeForm/>,
    vouchertype : <VoucherTypeTable/>,
    voucher : <VoucherTable/>,
    voucherForm : <Voucher/>,
    treeview: <TreeViewChart/>,
    companytable: <CompanyTable/>,
    companyform : <CompanyForm/>,
    employeeform:<EmployeeForm/>,
    employeetable:<EmployeeTable/>,
    moduleform:<ModuleForm/>,
    moduletable:<ModuleTable />,
    departmenttable: <DepartmentTable/>,
    departmentform: <DepartmentForm/>,
    customerform:<CustomerForm/>,
    customertable:<CustomerTable/>, vendorTable: <VendorTable/>,
    vendorForm : <VendorForm/>,
    bankForm : <BankForm/>,
    banktable: <BankTable/>,
    voucherseqform: <VocherSequenceForm/>,
    voucherseqtable: <VoucherSeqTable/>
   
  };


  