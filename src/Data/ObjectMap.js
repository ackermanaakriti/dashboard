
import CollegeMenu from "../Menus/CollegeMenu";
import Hotel from "../Menus/Hotel";
import Schoolmenu from "../Menus/Schoolmenu";
import Hospital from "../Menus/Hospital";
import BranchForm from "../Menus/BranchForm";
import BranchTable from "../Menus/BranchTable";

export const MenuComponentMap = {
    Colleges: CollegeMenu,
    Hotel: Hotel,
    School: Schoolmenu,
    Hospital: Hospital,
    Form : <BranchForm/>,
    Table: <BranchTable/>
   
  };
  