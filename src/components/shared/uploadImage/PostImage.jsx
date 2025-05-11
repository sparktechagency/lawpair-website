import { Form, Upload } from 'antd'
import { UploadCloud } from 'lucide-react'
import React from 'react'

const PostImage = () => {
    const [formOne] = useForm();
    const [ImageFileList, setImageFileList] = useState([]);


    
    const onFinishOne = async (values) => {
        const formData = new FormData();
        if (ImageFileList[0]?.originFileObj) {
            formData.append("image", ImageFileList[0].originFileObj);
        }


        try {
            const res = ""

            if (res?.data) {
                // toast
                setImageFileList([]);
                formOne.resetFields()
                dispatch(closeTeamModalOpenOne());
            }
        } catch (errors) {

        }
    }


    return (
        <>
            <Form.Item
                className="md:col-span-2"
                name="image"
                rules={[
                    {
                        required: ImageFileList.length === 0,
                        message: "Image required!",
                    },
                ]}
            >
                <Upload

                    accept="image/*"
                    maxCount={1}
                    showUploadList={{ showPreviewIcon: true }}
                    fileList={ImageFileList}
                    onChange={({ fileList }) => setImageFileList(fileList)}
                    listType="picture-card"
                    className="w-full"
                    beforeUpload={() => false}
                >
                    <div style={{ cursor: "pointer" }} className="flex flex-col items-center">
                        <UploadCloud className="w-5 h-5 text-gray-400" />
                        <span className="mt-2">Choose File</span>
                    </div>
                </Upload>
            </Form.Item>
        </>
    )
}

export default PostImage