
import CollegeMenu from "../Menus/CollegeMenu";
import Hotel from "../Menus/Hotel";
import Schoolmenu from "../Menus/Schoolmenu";
import Hospital from "../Menus/Hospital";
import BranchForm from "../Menus/BranchMenu/BranchForm";
import BranchTable from "../Menus/BranchMenu/BranchTable";
import FiscalYearForm from "../Menus/FiscalYearMenu/FiscalYearForm";
import FiscalYearTable from "../Menus/FiscalYearMenu/FiscalYearTable";

export const MenuComponentMap = {
    Colleges: <CollegeMenu/>,
    Hotel: <Hotel/>,
    branch: <BranchTable/>,
    fiscalyear: <FiscalYearTable/>,
    fiscalform :<FiscalYearForm/>,  
      Form :<BranchForm/>,
    Table: <BranchTable/>
   
  };


  