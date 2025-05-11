import { FiMenu } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { RiNotificationLine } from "react-icons/ri";
import { TbMessageDots } from "react-icons/tb";
import { useNavigate } from "react-router-dom";



const DashboardNavbar = ({showDrawer,setShowDrawer}) => {
  const navigate = useNavigate()

     // navigate founction
     const handleClick = () => {
      navigate("/")
  }
  const handleMenu = () =>{
   setShowDrawer(!showDrawer)
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 items-center justify-between md:justify-center  py-2 px-6">
      <div className="flex items-center gap-5 lg:hidden">
        <div>
          <FiMenu 
          onClick={handleMenu}
          className="text-4xl border border-gray-200 p-1 cursor-pointer" />
        </div>
        <div>
          <img onClick={handleClick} src="/logo.png" alt="" className="cursor-pointer"/>
        </div>
      </div>

      {/* search */}
      {/* <div className="hidden md:flex items-center gap-2">
        <FiSearch className="text-2xl text-gray-400" />
        <input type="search" name="" id="" placeholder="Type to search.." className="py-2 px-2 bg-transparent outline-none" />
      </div> */}

      {/* notification/message/profile */}
      <div className=" flex items-center justify-end space-x-6 py-1 ">
        {/* =========== notification animation start =========== */}
        {/* <div className="relative">
        <RiNotificationLine className="text-3xl text-gray-400 border border-gray-300 bg-gray-200 p-2 rounded-full" />
        <div className="absolute animate-ping top-0 right-0 w-[10px] h-[10px] rounded-full bg-red-600"></div>
        <div className="absolute flex justify-center items-center top-0 right-0 w-[10px] h-[10px] rounded-full bg-red-600"></div>
        </div> */}
         {/* =========== notification animation end =========== */}


        {/* =========== message animation start =========== */}
        {/* <div className="relative">
        <TbMessageDots className="text-3xl text-gray-400 border border-gray-300 bg-gray-200 p-2 rounded-full" />
        <div className="absolute animate-ping top-0 right-0 w-[10px] h-[10px] rounded-full bg-red-600"></div>
        <div className="absolute flex justify-center items-center top-0 right-0 w-[10px] h-[10px] rounded-full bg-red-600"></div>
        </div> */}
         {/* =========== message animation end =========== */}

        {/* <div className="w-[45px] h-[45px] bg-gray-200 rounded-full flex justify-center items-center">
          <img src="/almas.jpg" alt="logo" className="w-[40px] h-[40px] rounded-full object-contain" />
        </div> */}
      </div>

    </div>
  )
}

export default DashboardNavbar