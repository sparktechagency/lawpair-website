import { useQuery } from "@tanstack/react-query"
import Cookies from "js-cookie";
import useAxiosPublic from "./useAxiosPublic"


const useAdminProfileData = () => {
const axiosPublic = useAxiosPublic()
  
    const adminToken = Cookies.get("adminToken");
  
    const { data: adminData ={} ,refetch } = useQuery({
      queryKey: ['admin-data'],
      queryFn: async () => {
        const response = await axiosPublic.get('/admin/profile', {
            headers: {
                Authorization: `Bearer ${adminToken}`,
                "Accept": "application/json"
                // ✅ Send token in Authorization header
            }

        })
        return response.data?.user
      },
    })
  
  
    return [adminData,refetch]
  }

export default useAdminProfileData;