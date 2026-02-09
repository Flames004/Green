import { ArrowRight } from "lucide-react";
import API from "../api/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const [resend, setResend] = useState(true);

  const [phoneError, setPhoneError] = useState("");
  const [otpError, setOtpError] = useState("");

  const otpHandler = async () => {
    setPhoneError("");

    if (!phone) {
      setPhoneError("Phone number is required");
      return;
    }

    try {
      const { data } = await API.post("/auth/login", { phone });
      if (data.success) {
        toast.success("OTP sent successfully");
        setTimer(60);
        setResend(false);
      } else {
        setPhoneError(data.message || "Unable to send OTP");
      }
    } catch (error) {
      setPhoneError(error.response?.data?.message || "Server error");
    }
  };

  useEffect(() => {
    if (timer === 0) {
      setResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setPhoneError("");
    setOtpError("");

    if (!phone) {
      setPhoneError("Phone number is required");
      return;
    }

    if (!otp) {
      setOtpError("OTP is required");
      return;
    }

    try {
      const res = await API.post("/auth/verify-otp", { phone, otp });
      if (res.data.success) {
        toast.success("Login Successfully");
        dispatch(setUser(res.data.data));
        navigate("/");
      } else {
        setOtpError(res.data.message || "Invalid OTP");
      }
    } catch (error) {
      setOtpError(error.response?.data?.message || "Server error");
    }
  };

  return (
    <main className="bg-sage-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm border border-sage-200 p-4 sm:p-8">
          <h1 className="text-xl sm:text-2xl font-semibold text-sage-900 mb-2 text-center">
            Create Account
          </h1>
          <p className="text-center text-sage-700 mb-8 text-sm">
            Join Greenland and start shopping plants & pots
          </p>

          <form onSubmit={submitHandler} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-sage-900">
                Phone Number
              </label>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 0000000000"
                  className={`flex-1 px-2 py-3 rounded-lg border ${
                    phoneError ? "border-red-500" : "border-sage-200"
                  } bg-sage-50 text-sage-900 focus:outline-none focus:ring-2 focus:ring-emerald-600`}
                />
                <button
                  type="button"
                  disabled={!resend}
                  onClick={otpHandler}
                  className="w-full sm:w-auto px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg disabled:opacity-60"
                >
                  {resend ? "OTP" : "Wait"}
                </button>
              </div>

              {phoneError && (
                <p className="text-sm text-red-500">{phoneError}</p>
              )}
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">
                {timer > 0
                  ? `Resend OTP in ${timer}s`
                  : "You can resend OTP now"}
              </span>

              <button
                type="button"
                disabled={!resend}
                onClick={otpHandler}
                className={`font-medium ${
                  resend
                    ? "text-emerald-600 hover:underline"
                    : "text-gray-400"
                }`}
              >
                Resend OTP
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-sage-900">
                OTP Code
              </label>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="000000"
                className={`w-full px-4 py-3 rounded-lg border ${
                  otpError ? "border-red-500" : "border-sage-200"
                } bg-sage-50 text-center text-xl tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-emerald-600`}
              />

              {otpError && (
                <p className="text-sm text-red-500 text-center">{otpError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2"
            >
              Login
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-sage-700 mt-6">
          By signing up, you agree to our Terms & Conditions and Privacy Policy
        </p>
      </div>
    </main>
  );
};

export default Login;
