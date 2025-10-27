import axios from "axios";
import StandardResponse from "../forgotPassword/standardResponse";

export const changeUserPassword = async (newPassword: string, token: string | null): Promise<StandardResponse<any>> => {
    try {
        const res = await axios.post(
            "http://localhost:8081/auth/reset-password", {
            newPassword, token
        });

        return new StandardResponse<any>(200, {}, res.data.message);
    }
    catch (e) {
        return Promise.reject(e);
    }
}

export const verifyUserPasswordLink = async (token: string | null): Promise<StandardResponse<any>> => {
    try {
        const res = await axios.get(
            `http://localhost:8081/auth/validate-reset-token`,
            { params: { token } }
        );

        return new StandardResponse<any>(200, {}, res.data.message);
    } catch (e) {
        return Promise.reject(e);
    }
}

