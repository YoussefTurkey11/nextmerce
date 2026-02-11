export type VerificationType = "email-verification" | "password-reset";

export type OTPVerificationProps = {
  type: VerificationType;
  email: string;
  onVerify: (email: string, OTP: string) => Promise<void>;
  onResend: () => Promise<void>;
  isLoading?: boolean;
  isResending?: boolean;
  error?: string;
  successTitle?: string;
  successDescription?: string;
  onSuccessAction?: () => void;
  backButtonText?: string;
  onBack?: () => void;
};
