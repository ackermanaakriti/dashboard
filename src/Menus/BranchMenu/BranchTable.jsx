import React, { useEffect ,useState} from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { useLayouData } from "../../Context/MainLayoutContext";
import { useDispatch } from "react-redux";
import { addMenu, addTab } from "../../Redux/TopTabSlice";
import { TableButton } from "../../Components/GreenButton";
import axios from 'axios'; 



const BranchTable = () => {
  const{ setId,hanldeId,setHandleId,token}= useLayouData();
  console.log(token)
  const dispatch = useDispatch()

 
  const [contactD, setcontactD] = useState([])
  const storedData = JSON.parse(localStorage.getItem('formData'));

  // get data from local Storage
  useEffect(() => {
    if (storedData) {
      setcontactD(storedData);
    }
    setHandleId(false);
  
    const getAllBranches = async () => {
      try {
        const res = await axios.get('http://192.168.254.11:5128/api/Branch/GetAll', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(res.data); // Assuming you want to log the response data
      } catch (err) {
        console.log(err);
      }
    };
  
    getAllBranches();
  }, [token]);


  
  const handleDeletebtn = (index) => {
    const updatedData = contactD.filter((item, i) => i !== index);
    // Update localStorage and contactD state with the updated data
    localStorage.setItem('formData', JSON.stringify(updatedData));
    setcontactD(updatedData);
  };

  const handleEditdd =(id)=>
  {
    setId(id);
    dispatch(addMenu({ id:id, menu:'Form'}))
  }

  
  return (
    <>
      <div className="bg-bgclr branchtable">
        <div className="container mx-auto">
          <div className="pt-[30px]">
            <h3 className="font-inter font-semibold text-[30px]">
              Branch List
            </h3>
          </div>
          <div className="branchtable">
            <div onClick={()=>dispatch(addMenu({ id:'', menu:'Form'}))} className="py-[18px] addbtn">
              <button >Add New +</button>
            </div>
            <div className="          
            ">
              <table className="shadow-lg">
                <thead>
                  <tr>
                    <th> Branch name</th>
                    <th> Code</th>
                    <th> Reg.no</th>
                    <th> Head Office</th>
                    <th> Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    contactD?.map((tdata,index)=>
                    (
                      <tr key={index}>
                 
                  
                      <td>{tdata?.name}</td>
                    <td>{tdata?.branchcode}</td>
                    <td>{tdata?.Registrationno}</td>
                    <td>
                    {tdata?.headoffice ? (<TableButton className='bg-PrimaryColor rounded-[20px] px-[12px] py-[5px] text-white' text='Yes'/>)
                    : (<TableButton className='bg-[#378f80] rounded-[20px] px-[12px] py-[5px] text-white' text='No'/>)}
                    </td>
                    <td className="">
                    <div className="flex gap-[25px] items-center justify-center">
                        <span onClick={()=>handleEditdd(tdata.id)} className="text-PrimaryColor cursor-pointer">
                          <MdEdit />
                        </span>
                        <span onClick={(e)=>{e.stopPropagation();handleDeletebtn(index)}} className="text-[#d13838] cursor-pointer">
                          <RiDeleteBin5Fill />
                        </span>
                      </div>
                    </td>
                   
                  </tr>
                    ))
                  }
                 
                
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BranchTable;
