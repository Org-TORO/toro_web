import {
  AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

import { api, refreshApi } from "./api";
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "../security/jwt.helper";
import {
  getRefreshPromise,
  setRefreshPromise,
} from "../security/refresh.helper";
import type FailureResponse from "./failure.response.";
import type RefreshTokenResponse from "../security/refresh-token.response";


interface RetryRequestConfig
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const setupInterceptors = (): void => {
  /**
   * Attach access token to every request.
   */
  api.interceptors.request.use(
    (config) => {
      const accessToken = getAccessToken();

      if (accessToken) {
        config.headers.Authorization =
          `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  /**
   * Handle expired access tokens.
   */
  api.interceptors.response.use(
    (response) => response,

    async (error: AxiosError<FailureResponse<string>>) => {
      const originalRequest = error.config as
        | RetryRequestConfig
        | undefined;

      if (!originalRequest) {
        return Promise.reject(error);
      }

      const isAccessTokenExpired =
        error.response?.status === 401 &&
        error.response?.data?.code === "ACCESS_TOKEN_EXPIRED";

      if (!isAccessTokenExpired) {
        return Promise.reject(error);
      }

      /**
       * Prevent infinite retry loops.
       */
      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        let refreshPromise = getRefreshPromise();

        /**
         * If no refresh request is running,
         * start one.
         */
        if (!refreshPromise) {
          refreshPromise = refreshApi
            .post<RefreshTokenResponse>(
              "/auth/refresh-token"
            )
            .then((response) => {
              const newAccessToken =
                response.data.data.accessToken;

              setAccessToken(newAccessToken);

              return newAccessToken;
            })
            .finally(() => {
              setRefreshPromise(null);
            });

          setRefreshPromise(refreshPromise);
        }

        /**
         * All failed requests wait for
         * the same refresh request.
         */
        const newAccessToken =
          await refreshPromise;

        /**
         * Retry the original request
         * with the new access token.
         */
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        clearAccessToken();

        // Optional:
        // window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }
  );
};