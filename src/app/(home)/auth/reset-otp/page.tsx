"use client";

import type React from "react";

import { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useVerifyEmailMutation } from "@/Redux/feature/authSlice";
import { toast } from "sonner";

function VerifyOTP() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [email, setEmail] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userMail = searchParams.get("email") || ""; // Get email from URL query parameter
  console.log(userMail, "userMail");

  const [verifyEmail] = useVerifyEmailMutation();

  useEffect(() => {
    // Get email from URL query parameter if available
    const emailParam = "email";
    if (emailParam) {
      setEmail(emailParam);
    }

    // Focus the first input on page load
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    // Start countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [searchParams]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(0, 1);
    setOtp(newOtp);

    // Clear any previous errors
    setError("");

    // Auto-focus next input if value is entered
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Move to previous input on backspace if current input is empty
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);

      // Focus the last input
      if (inputRefs.current[5]) {
        inputRefs.current[5].focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if OTP is complete
    if (otp.some((digit) => !digit)) {
      setError("Please enter the complete verification code");
      return;
    }
    try {
      const otpCode = otp.join("");
      console.log(otpCode, "otpCode");
      const data = {
        email: userMail,
        otp: otpCode,
      };
      console.log(data, "data");
      const res = await verifyEmail(data).unwrap();
      toast.success(res.message || "OTP verified successfully!");
      router.push("/auth/reset-password");
      localStorage.setItem("verify", res.access);
      // router.push(`/auth/reset-password?email=${userMail}`);

      console.log(res, "res");
    } catch (error) {
      // Better error handling
      if (error instanceof Error) {
        toast.error(error.message);
      } else if (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof error.data === "object" &&
        error.data !== null &&
        "message" in error.data
      ) {
        toast.error((error.data as { message: string }).message);
      } else {
        toast.error("Error verifying OTP. Please try again.");
      }
      console.error("Verification error:", error);
    }

    setIsVerifying(true);

    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);

      // For demo purposes, we'll just redirect to home
      // In a real app, you would verify the OTP with your backend
      // router.push("/auth/login");
    }, 1500);
  };

  const resendOTP = () => {
    // Reset the timer
    setTimeLeft(60);

    // Simulate sending a new OTP
    // In a real app, you would call your API to send a new OTP
    console.log("Resending OTP to", email);
  };

  return (
    <div>
      <main
        className="min-h-screen w-full bg-[#005163] text-white"
        style={{
          backgroundImage: "url('/sideGradin.png')",
          backgroundPosition: "top right",
          backgroundRepeat: "no-repeat",
          backgroundSize: "auto 100%",
        }}
      >
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-56 font-[Montserrat]">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16">
            <div className="w-full max-w-md bg-[#003842] rounded-lg shadow-xl p-8">
              <h1 className="lg:text-4xl  text-2xl font-semibold text-white text-center mb-3">
                Verify Your Account
              </h1>

              <p className="text-white text-[16px] font-normal text-center mb-6">
                Enter the OTP sent to your email{" "}
                <span className="font-medium">{email}</span>
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-center gap-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => {
                          inputRefs.current[index] = el;
                        }}
                        type="text"
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        maxLength={1}
                        className="lg:w-14 w-9 h-10  lg:h-12 text-center bg-white text-black border border-gray-600 rounded-md  text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#4ecde6] focus:border-transparent"
                        required
                      />
                    ))}
                  </div>
                  {error && (
                    <p className="text-red-400 text-sm text-center mt-2">
                      {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isVerifying || otp.some((digit) => !digit)}
                  className="w-full py-2 px-4 bg-[#4ecde6] hover:bg-[#3db9d1] text-[#003842] font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4ecde6] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isVerifying ? "Verifying..." : "Verify"}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-white">
                Didn&rsquo;t receive the code?{" "}
                {timeLeft > 0 ? (
                  <span className="text-gray-400">Resend in {timeLeft}s</span>
                ) : (
                  <button
                    onClick={resendOTP}
                    className="text-[#4ecde6] hover:underline font-medium"
                  >
                    Resend Code
                  </button>
                )}
              </div>

              <div className="mt-4 text-center text-sm text-white">
                <Link
                  href="/auth/login"
                  className="text-[#4ecde6] hover:underline font-medium"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function VerifyEmail() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOTP />
    </Suspense>
  );
}
