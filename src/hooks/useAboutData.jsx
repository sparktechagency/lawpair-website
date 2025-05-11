import { useQuery } from "@tanstack/react-query"
import Cookies from "js-cookie";
import useAxiosPublic from "./useAxiosPublic";



const useAboutData = () => {
const axiosPublic = useAxiosPublic()
  
    const adminToken = Cookies.get("adminToken");
  
    const { data: aboutData ={} ,refetch } = useQuery({
      queryKey: ['about-data'],
      queryFn: async () => {
        const response = await axiosPublic.get('/admin/about', {
            headers: {
                Authorization: `Bearer ${adminToken}`,
                "Accept": "application/json"
                // ✅ Send token in Authorization header
            }

        })
        return response.data?.settings
      },
    })
  
  
    return [aboutData,refetch]
  }

export default useAboutData;