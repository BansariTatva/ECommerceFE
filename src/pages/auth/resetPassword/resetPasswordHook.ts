import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { handleAxiosErrorMessage } from "../../../utils/helper";
import { changeUserPassword, verifyUserPasswordLink } from "../../../services/resetPassword/reset-password-service";
import { useEffect } from "react";

export const useResetPasswordHook = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('token');
    useEffect(() => {
        (async () => {
           await validateResetPasswordLink(id);
        })();
    }, []);
    const resetPassword = async (password: string, shortId: string | null) => {
        await changeUserPassword(password, shortId)
            .then((res: any) => {
                toast.success(res.Messages);
                navigate("/login", { state: { from: location } });
            })
            .catch((err) => {
                toast.error(handleAxiosErrorMessage(err));
            });
    };
    const validateResetPasswordLink = async (id: string | null) => {
        await verifyUserPasswordLink(id)
            .then((res: any) => {
                toast.success(res.Messages);
            })
            .catch((err) => {
                toast.error(handleAxiosErrorMessage(err));
                navigate("/forgot", { state: { from: location } });
            });
    }
    return { resetPassword };
};

