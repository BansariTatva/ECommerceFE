import axios from "axios";
import StandardResponse from "./standardResponse";
import type { ForgotPasswordResponseModel } from "../../models/forgotPassword";

export const getResetPasswordLink = async (email: string): Promise<StandardResponse<ForgotPasswordResponseModel>> => {
    try {
        const res = await axios.post(
            "http://localhost:8081/auth/forgot-password", {
            email
        });

        return new StandardResponse<ForgotPasswordResponseModel>(200, res.data.data, res.data.message);
    }
    catch (e) {
        return Promise.reject(e);
    }
}