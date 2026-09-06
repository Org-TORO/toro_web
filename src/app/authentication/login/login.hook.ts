import { useForm } from "react-hook-form";
import { api } from "../../../infra/api/api";
import axios from "axios";

import type { LoginFailure, LoginInput, LoginResponse } from "./login.schema";
import type SuccessResponse from "../../../infra/api/success.response.";
import { ERROR_CODES } from "../../../infra/api/failure.response.";
import { useAuthStore } from "../../../infra/security/auth.store";


export function useLogin() {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginInput>({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const setAccessToken = useAuthStore((state) => state.setAccessToken);
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);


    async function submitLoginForm(data: LoginInput) {
        try {
            const response = await api.post<SuccessResponse<LoginResponse>>(
                "/auth/login",
                data
            );

            setAccessToken(response.data.data.accessToken);
            setIsAuthenticated(true);

        } catch (error) {
            if (!axios.isAxiosError<LoginFailure>(error)) {
                return;
            }

            const failure = error.response?.data;

            if (!failure) {
                return;
            }

            switch (failure.code) {
                case ERROR_CODES.VALIDATION_VALIDATION_ERROR:
                    console.log(failure.errors.email);
                    console.log(failure.errors.password);
                    break;

                case ERROR_CODES.BUSINESS_VALIDATION_ERROR:
                    console.log(failure.errors);
                    break;
            }
        }
    }

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        submitLoginForm
    };
}