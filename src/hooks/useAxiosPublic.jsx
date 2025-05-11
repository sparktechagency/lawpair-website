import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // port:server-site
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
