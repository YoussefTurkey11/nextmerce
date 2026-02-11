import { api } from "@/redux/baseApi";
import { AuthResponse, RegisterPayload } from "@/types/authTypes";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ------- Auth Action -------
    login: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: (body) => ({
        url: "/api/v1/auth/logIn",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    register: builder.mutation<AuthResponse, RegisterPayload>({
      query: (body) => ({
        url: "/api/v1/auth/signUp",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),

    // ------- Get User Info -------
    getUser: builder.query<AuthResponse, void>({
      query: () => "/api/v1/userDashboard/getMyData",
      providesTags: ["Users"],
    }),

    // ------- Email Action -------
    verifyEmail: builder.mutation<void, { code: string }>({
      query: (body) => ({
        url: "/api/v1/auth/verifyEmail",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    resendVerifyCode: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/verify-email/resend-code",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),

    // ------- Password Action -------
    sendResetEmail: builder.mutation<void, { email: string }>({
      query: (body) => ({
        url: "/forget-password/check-email",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    checkResetOtp: builder.mutation<void, { email: string; otp: string }>({
      query: (body) => ({
        url: "/forget-password/check-otp",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    resetPassword: builder.mutation<
      void,
      {
        email: string;
        otp: string;
        password: string;
        passwordConfirmation: string;
      }
    >({
      query: (body) => ({
        url: "/forget-password/reset-password",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetUserQuery,
  useLazyGetUserQuery,
  useVerifyEmailMutation,
  useResendVerifyCodeMutation,
  useSendResetEmailMutation,
  useCheckResetOtpMutation,
  useResetPasswordMutation,
} = authApi;
