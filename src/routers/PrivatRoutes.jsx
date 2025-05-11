import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import LoadindSpenier from "../components/shared/LoadindSpenier";

const PrivatRoutes = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const location = useLocation();


    useEffect(() => {
        const adminToken = Cookies.get("adminToken");

        setToken(adminToken); // Set token from cookies
        setTimeout(() => setLoading(false), 1000); // Simulate loading for 1 second
    }, []);

    if (loading) {
        return <LoadindSpenier />;
    }

    if (token) {
        return children
    }
    return <Navigate to="/admin/dashboard/login" state={{ from: location }} replace></Navigate>
};
// props-type validation
PrivatRoutes.propTypes = {
    children: PropTypes.object,
};
export default PrivatRoutes;