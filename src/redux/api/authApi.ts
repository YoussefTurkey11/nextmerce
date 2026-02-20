import { api } from "@/redux/baseApi";
import { AuthResponse, RegisterPayload, User } from "@/types/authTypes";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ------- Auth Action -------
    login: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: (body) => ({
        url: "/api/v1/auth/logIn",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
    register: builder.mutation<AuthResponse, RegisterPayload>({
      query: (body) => ({
        url: "/api/v1/auth/signUp",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
    signUpWithGoogle: builder.mutation<
      { token: string; data: any },
      { idToken: string }
    >({
      query: (body) => ({
        url: "/api/v1/auth/signUp-google",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
    // logout: builder.mutation<void, void>({
    //   query: () => ({
    //     url: "/auth/logout",
    //     method: "POST",
    //   }),
    //   invalidatesTags: ["Auth"],
    // }),

    // ------- User Info -------
    getUser: builder.query<AuthResponse, void>({
      query: () => "/api/v1/userDashboard/getMyData",
      providesTags: [{ type: "Users", id: "LIST" }],
    }),

    updateUserData: builder.mutation<AuthResponse, FormData>({
      query: (body) => ({
        url: `/api/v1/userDashboard/updateMyData`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),

    // ------- Email Action -------
    verifyEmail: builder.mutation<void, { email: string; OTP: string }>({
      query: (body) => ({
        url: "/api/v1/auth/verifyEmail",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
    resendVerifyCode: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/verify-email/resend-code",
        method: "POST",
      }),
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),

    // ------- Password Action -------
    sendResetEmail: builder.mutation<void, { email: string }>({
      query: (body) => ({
        url: "/api/v1/forgetPassword/sendResetCode",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
    checkResetOtp: builder.mutation<void, { resetCode: string }>({
      query: (body) => ({
        url: "/api/v1/forgetPassword/verifyResetCode",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
    resetPassword: builder.mutation<
      void,
      {
        email: string;
        newPassword: string;
        confirmNewPassword: string;
        resetCode: string;
      }
    >({
      query: (body) => ({
        url: "/api/v1/forgetPassword/resetPassword",
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSignUpWithGoogleMutation,
  // useLogoutMutation,
  useGetUserQuery,
  useLazyGetUserQuery,
  useUpdateUserDataMutation,
  useVerifyEmailMutation,
  useResendVerifyCodeMutation,
  useSendResetEmailMutation,
  useCheckResetOtpMutation,
  useResetPasswordMutation,
} = authApi;
