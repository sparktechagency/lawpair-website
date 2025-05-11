import { useQuery } from "@tanstack/react-query"
import Cookies from "js-cookie";
import useAxiosPublic from "./useAxiosPublic";




const useDisclimerData = () => {
const axiosPublic = useAxiosPublic()
  
    const adminToken = Cookies.get("adminToken");
  
    const { data: disclimerData ={} ,refetch } = useQuery({
      queryKey: ['about-data'],
      queryFn: async () => {
        const response = await axiosPublic.get('/admin/disclaimer', {
            headers: {
                Authorization: `Bearer ${adminToken}`,
                "Accept": "application/json"
                // ✅ Send token in Authorization header
            }

        })
        return response.data?.settings
      },
    })
  
  
    return [disclimerData,refetch]
  }

export default useDisclimerData;