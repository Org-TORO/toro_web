import type { ERROR_CODES, FailureResponse } from "../../../infra/api/failure.response.";


export type LoginInput = {
    email: string;
    password: string;
}

export type LoginResponse = {
    accessToken: string;
}

export type LoginValidationFailure = 
    FailureResponse<Partial<Record<keyof LoginInput, string>>> & {  
  code: typeof ERROR_CODES.VALIDATION_VALIDATION_ERROR;
}

export type LoginBusinessFailure = 
    FailureResponse<string> & { 
  code: typeof ERROR_CODES.BUSINESS_VALIDATION_ERROR;
}

export type LoginFailure = LoginValidationFailure | LoginBusinessFailure;