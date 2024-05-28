import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Protected from "./ProtectedRoutes";
import Dashboard from "../Components/Dashboard";
import Login from "../Pages/Login";
import BankForm from "../Menus/Bank/BankForm";
import MainLayout from "../Layout/MainLayout";
import BranchTable from "../Menus/BranchMenu/BranchTable";
import { MainLayoutProvider } from "../Context/MainLayoutContext";
import BranchForm from "../Menus/BranchMenu/BranchForm";
import FiscalYearTable from "../Menus/FiscalYearMenu/FiscalYearTable";
import FiscalYearForm from "../Menus/FiscalYearMenu/FiscalYearForm";
import CompanyTable from "../Menus/BranchMenu/Company/CompanyTable";
import CompanyForm from "../Menus/BranchMenu/Company/CompanyForm";
import ModuleTable from "../Menus/ModuleMenu/ModuleTable";
import ModuleForm from "../Menus/ModuleMenu/ModuleForm";
import DepartmentTable from "../Menus/DepartmentMenu/DepartmentTable";
import DepartmentForm from "../Menus/DepartmentMenu/DepartMentForm";
import ChartofAccTable from "../Menus/CharofAcc/ChartofaccTable";
import CharofAccForm from "../Menus/CharofAcc/ChatofAccForm";
import VoucherTypeTable from "../Menus/Voucher/VoucherTypeTable";
import VouchertypeForm from "../Menus/Voucher/VoucherTypeForm";
import VoucherSeqTable from "../Menus/Voucher/VoucherSequenceTable";
import VocherSequenceForm from "../Menus/Voucher/VoucherSequenceForm";
import BankTable from "../Menus/Bank/BankTable";
import CustomerTable from "../Menus/Debtors/DebtorTable";
import VendorTable from "../Menus/Creditors/CreditorsTable";
import VendorForm from "../Menus/Creditors/CreditorsForm";
import EmployeeTable from "../Menus/EmployeeMenu/EmployeeTable";
import EmployeeForm from "../Menus/EmployeeMenu/EmployeeForm";
import Voucher from "../Menus/Voucher/VoucherForm";
import VoucherTable from "../Menus/Voucher/VoucherTable";
import CustomerForm from "../Menus/Debtors/DebtorForm";
import TreeViewChart from "../Menus/CharofAcc/ChartofAccTree";
import CurrencyTable from "../Menus/CurrencyMenu/CurrencyTable";
import AuthenticatedLayout from "./AuthenticateLayout";
import BalanceSheetReport from "../Reports/BalanceSheetReport";
const Routess = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="signin" element={<Login />} />
        <Route path="/" element={<Protected />}>
          <Route element={<AuthenticatedLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="branch" element={<BranchTable />} />
            <Route path="branchform" element={<BranchForm />} />
            <Route path="branchform/:id" element={<BranchForm />} />
            <Route path="company">
              <Route index element={<CompanyTable />} />
              <Route path="form" element={<CompanyForm />} />
              <Route path="form/:id" element={<CompanyForm />} />
            </Route>
            <Route path="branch">
              <Route index element={<BranchTable />} />
              <Route path="form" element={<BranchForm />} />
              <Route path="form/:id" element={<BranchForm />} />
            </Route>
            <Route path="currency">
              <Route index element={<CurrencyTable />} />
              <Route path="form" element={<CurrencyTable />} />
              <Route path="form/:id" element={<BranchForm />} />
            </Route>
            <Route path="module">
              <Route index element={<ModuleTable />} />
              <Route path="form" element={<ModuleForm />} />
              <Route path="form/:id" element={<ModuleForm />} />
            </Route>
            <Route path="department">
              <Route index element={<DepartmentTable />} />
              <Route path="form" element={<DepartmentForm />} />
              <Route path="form/:id" element={<DepartmentForm />} />
            </Route>
            <Route path="chartofaccount">
              <Route index element={<TreeViewChart />} />
              <Route path="form" element={<CharofAccForm />} />
              <Route path="form/:id" element={<CharofAccForm />} />
              <Route path="listview" element={<ChartofAccTable />} />
            </Route>
            <Route path="vouchertype">
              <Route index element={<VoucherTypeTable />} />
              <Route path="form" element={<VouchertypeForm />} />
              <Route path="form/:id" element={<VouchertypeForm />} />
            </Route>
            <Route path="vouchersequence">
              <Route index element={<VoucherSeqTable />} />
              <Route path="form" element={<VocherSequenceForm />} />
              <Route path="form/:id" element={<VocherSequenceForm />} />
            </Route>
            <Route path="bank">
              <Route index element={<BankTable />} />
              <Route path="form" element={<BankForm />} />
              <Route path="form/:id" element={<BankForm />} />
            </Route>
            <Route path="debtors">
              <Route index element={<CustomerTable />} />
              <Route path="form" element={<CustomerForm />} />
              <Route path="form/:id" element={<CustomerForm />} />
            </Route>
            <Route path="creditors">
              <Route index element={<VendorTable />} />
              <Route path="form" element={<VendorForm />} />
              <Route path="form/:id" element={<VendorForm />} />
            </Route>
            <Route path="employee">
              <Route index element={<EmployeeTable />} />
              <Route path="form" element={<EmployeeForm />} />
              <Route path="form/:id" element={<EmployeeForm />} />
            </Route>
            <Route path="voucher">
              <Route index element={<VoucherTable />} />
              <Route path="form" element={<Voucher />} />
              <Route path="form/:id" element={<Voucher />} />
            </Route>
            <Route path='balancesheet' element={<BalanceSheetReport/>}/>
          </Route>
        </Route>
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </Router>
  );
};

export default Routess;
