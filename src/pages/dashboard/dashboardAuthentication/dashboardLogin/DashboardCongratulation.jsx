import { Button } from "antd"
import { Link } from "react-router-dom"


const DashboardCongratulation = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-[#faffff]">
            <div className="max-w-[684px] bg-[#FFFFFF] p-10 lg:px-20 py-8">
                <div className="flex flex-col justify-center">
                    <img src="/logo.png" alt="logo" className="w-[183px] h-[56px] mx-auto border" />

                    <div className="flex flex-col justify-center items-center pb-10">
                        <h1 className="font-roboto text-[#121221] font-semibold text-[20px] md:text-[36px] pt-[40px] pb-[20px]">Congratulations!</h1>
                        <p className="font-roboto text-[18px] text-[#929299] text-center">Your password has been updated, please change your password regularly to avoid this happening.</p>
                    </div>
                </div>
                <Link  to={'/admin/dashboard'}>
                <Button htmlType="button" className="w-full " style={{ backgroundColor: "#1b69ad", color: "white", fontFamily: "Roboto", fontWeight: "bold", fontSize: "16px", padding: "24px" }}>
                   Done
                </Button>
                </Link>
            </div>
        </div>
    )
}

export default DashboardCongratulation