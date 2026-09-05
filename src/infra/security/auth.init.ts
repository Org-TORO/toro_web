
import { refreshApi } from "../api/api";
import type SuccessResponse from "../api/success.response.";
import {
  clearAccessToken,
  setAccessToken,
} from "./jwt.helper";
import type RefreshTokenResponse from "./refresh-token.response";

export const initializeAuth = async (): Promise<void> => {
  try {
    const response =
      await refreshApi.post<SuccessResponse<RefreshTokenResponse>>(
        "/auth/bootstrap-token"
      );

    setAccessToken(response.data.data.accessToken);
  } catch {
    clearAccessToken();
  }
};