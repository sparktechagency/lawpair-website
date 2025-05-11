import { Button } from "antd"
import { Link } from "react-router-dom"


const PasswordSuccessfull = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-122px)] bg-[#f5f5f7] container mx-auto px-4">
    <div className="w-full md:w-[600px] min-h-[201px] bg-[#FFFFFF] p-6 rounded-lg shadow-lg">
        <h2 className="text-[26px] font-bold font-roboto text-[#10101E]  mb-0">You’re done!</h2>
        <p className="font-roboto text-[#121221] text-[16px] pb-[32px]">Your password has been updated successfully.</p>

        <div className="flex justify-end">
        <Button style={{backgroundColor:"#1b69ad",color:"white", width:"115px",height:"48px",fontSize:"16px",fontFamily:"Roboto"}}>
            <Link to={'/'}>Go home</Link>
        </Button>
        </div>
    </div>
</div>
  )
}

export default PasswordSuccessfull