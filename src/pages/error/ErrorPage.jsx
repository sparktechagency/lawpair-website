import { Button } from "antd"
import { Link } from "react-router-dom"

const ErrorPage = () => {
  return (
    <div className="h-screen flex justify-center items-center">


      <div>
        <img src="/error.png" alt="error image" />
        <h1 className="font-roboto font-bold text-[48px] text-[#10101E] pt-[64px] pb-[16px text-center">Page not found</h1>
        <p className="max-w-[379px] mx-auto font-roboto text-[14px] text-[#121221] text-wrap text-center pb-[16px]">The page you're looking for was moved, removed, renamed or might never have existed. If you're still lost try using our search in the top menu or return to the home page.</p>




        <div className="flex justify-center">
          <Button style={{ backgroundColor: "#1b69ad", color: "white", width: "115px", height: "48px", fontSize: "16px", fontFamily: "Roboto" }}>
            <Link to={'/'}>Go home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage