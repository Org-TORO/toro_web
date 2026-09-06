
import { refreshApi } from "../api/api";
import type SuccessResponse from "../api/success.response.";
import { useAuthStore } from "./auth.store";
import type RefreshTokenResponse from "./refresh-token.response";

export const initializeAuth = async (): Promise<void> => {

  const { setAccessToken, setIsAuthenticated, clearAuthState } = useAuthStore.getState();

  try {
    const response =
      await refreshApi.post<SuccessResponse<RefreshTokenResponse>>(
        "/auth/bootstrap-token"
      );


    setAccessToken(response.data.data.accessToken);
    setIsAuthenticated(true);
  } catch {
    clearAuthState();
  }
};