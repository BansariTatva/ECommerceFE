import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuth2Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("OAuth2Callback====",)
        const params = new URLSearchParams(window.location.search);
        console.log("params====", params)
        const accessToken = params.get("accessToken");
        const refreshToken = params.get("refreshToken");
        console.log("accessToken---", accessToken, refreshToken)
        if (accessToken && refreshToken) {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            // Navigate to dashboard
            navigate("/dashboard", { replace: true });
        }
    }, [navigate]);

    return <div>Loading...</div>;
};

export default OAuth2Callback;
