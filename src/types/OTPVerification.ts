export type VerificationType = "email-verification" | "password-reset";

export type OTPVerificationProps = {
  type: VerificationType;
  email: string;
  onVerify: (resetCode: string) => Promise<boolean>;
  isLoading?: boolean;
  isResending?: boolean;
  error?: string;
  successTitle?: string;
  successDescription?: string;
  backButtonText?: string;
  onBack?: () => void;
};
