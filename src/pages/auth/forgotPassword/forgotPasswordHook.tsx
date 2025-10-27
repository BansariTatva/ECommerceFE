import { toast } from "react-toastify";
import { handleAxiosErrorMessage } from "../../../utils/helper";
import { getResetPasswordLink } from "../../../services/forgotPassword/forgot-password-service";

export const useForgotPasswordHook = () => {
    const forgotPassword = async (email: string) => {
        await getResetPasswordLink(email)
            .then((res: any) => {
                toast.success(res.Messages);
            })
            .catch((err) => {
                toast.error(handleAxiosErrorMessage(err));
                return null;
            });
    };
    return { forgotPassword };
};

