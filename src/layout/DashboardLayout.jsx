import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import Sidebar from "../components/dashboard/sidebar/Sidebar";
import DashboardNavbar from "../components/dashboard/dashboardNavbar/DashboardNavbar";

const DashboardLayout = () => {
    const [showDrawer, setShowDrawer] = useState(false);
    const navigate = useNavigate()

    // navigate founction
    const handleClick = () => {
        navigate("/")
    }
    
    return (
        <div className="relative flex h-screen">
            {/* Sidebar component */}
            <div className="hidden lg:block w-[270px] bg-[#FFFF] h-full fixed">
                <Sidebar />
            </div>

            {/* bg-[#f5f5f7] */}
            {/* ============= mobile & tablet sidebar start ========== */}
            {
                showDrawer && <div className="lg:hidden absolute w-[85%] md:w-[40%] h-screen bg-[#f5f5f7] z-50">
                    <div className="flex flex-col items-start justify-between px-3 py-[18px]">
                        <div className="w-full flex justify-between items-center">
                            <img onClick={handleClick} src="/logo.png" alt="logo" className="w-[80%] object-contain cursor-pointer" />
                            <FaArrowLeft
                                onClick={() => setShowDrawer(!showDrawer)}
                                className="text-4xl text-primary" />
                        </div>

                        {/* sidebar component mobile device */}
                        <div className=" w-full">
                            <Sidebar />
                        </div>

                    </div>
                </div>
            }
            {/* ============= mobile & tablet sidebar end ========== */}


            {/* Main content area */}
            <div className="lg:ml-[290px] w-full flex flex-col">
                <div className="order-1">
                    <DashboardNavbar showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
                </div>

                <div className="order-2 flex-1 overflow-y-auto p-6 bg-[#f5f5f7] rounded-md">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
