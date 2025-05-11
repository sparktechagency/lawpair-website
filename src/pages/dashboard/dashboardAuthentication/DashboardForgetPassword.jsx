import { Button, Form, Input } from "antd"
import { Link, useNavigate } from "react-router-dom"
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";


const DashboardForgetPassword = () => {
    const axiosPublic = useAxiosPublic()
    const [form] = Form.useForm(); // Form instance
    const navigate = useNavigate()

    const onFinish = async (values) => {

        const forgetInfo = {
            email: values.email,
        }
    

        try {
            const response = await axiosPublic.post('/resent-otp', forgetInfo)

            console.log(response.data)
            if (response.data.success) {
                navigate('/admin/dashboard/otp-verification',{state:{email:forgetInfo.email}})

                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error(error)
        }

        form.resetFields();
    };


    return (
        <div className="flex flex-col justify-center items-center h-screen bg-[#faffff]">
            <div className="max-w-[684px] bg-[#FFFFFF] p-10 lg:px-20 py-8">
                <div className="flex flex-col justify-center">
                    <img src="/logo.png" alt="logo" className="w-[183px] h-[56px] mx-auto border" />

                    <div className="flex flex-col justify-center items-center pb-10 md:pb-[78px]">
                        <h1 className="font-roboto text-[#121221] font-semibold text-[20px] md:text-[36px] pt-[40px] pb-[20px]">Forgot password</h1>
                        <p className="font-roboto text-[18px] text-[#929299] ">We will sent a verification code to william***@gmail.com</p>
                    </div>
                </div>

                <Form form={form} layout="vertical" onFinish={onFinish} className="">
                    <div>
                        <p className="font-roboto font-bold text-[#121221] text-[16px]">Submit your mail*</p>
                        <Form.Item name="email" rules={[{ required: true, message: "Please enter your email" }, { type: "email", message: "Invalid email address" }]}>
                            <Input placeholder="Enter your email" className="w-full border border-gray-400 p-2 rounded-md" />
                        </Form.Item>
                    </div>
                    {/* Submit Button */}
                    {/* <Link to={'/admin/dashboard/otp-verification'}> */}
                    <Form.Item>
                        <Button htmlType="submit" className="w-full " style={{ backgroundColor: "#1b69ad", color: "white", fontFamily: "Roboto", fontWeight: "bold", fontSize: "16px", padding: "24px" }}>
                            Submit
                        </Button>
                    </Form.Item>
                    {/* </Link> */}
                </Form>
            </div>
        </div>
    )
}

export default DashboardForgetPassword