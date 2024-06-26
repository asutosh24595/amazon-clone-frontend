import amazonLogo from "../assets/amazonDark.png";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import { TailSpin } from "react-loader-spinner";
import { otpSending } from "../api/OtpVerify";

export default function SignIn() {
  const auth = getAuth();
  const [signInData, setSignInData] = useState({
    emailOrphn: "",
    pwd: "",
  });
  const [error, setError] = useState({
    emailOrphn: "",
    pwd: "",
  });

  const [backendError, setBackendError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    let hasError = false;

    setError({
      emailOrphn: "",
      pwd: "",
    });

    if (!signInData.emailOrphn) {
      setError((prevState) => ({
        ...prevState,
        emailOrphn: "Enter your email or mobile phone number",
      }));
      hasError = true;
    }

    if (!signInData.pwd) {
      setError((prevState) => ({
        ...prevState,
        pwd: "Enter your password",
      }));
      hasError = true;
    }

    if (!hasError) {
      setIsLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          signInData.emailOrphn,
          signInData.pwd
        );
        // eslint-disable-next-line no-unused-vars
        const user = userCredential.user;
        try {
          const response = await otpSending(signInData.emailOrphn);
          if (response && response.status === 200) {
            navigate("/otp-verification");
          }
        } catch (error) {
          let errMsg;
          if (error.response && error.response.status === 500) {
            errMsg = error.response.data.message;
          } else {
            console.error(error);
          }
          setBackendError(
            <div className="w-full border border-red-600 p-4 gap-2 flex justify-start rounded-md shadow-innerRed my-4">
              <span>
                <ReportProblemOutlinedIcon className="text-red-600" />
              </span>
              <div className="flex flex-col items-start">
                <p className="text-lg text-red-600 font-medium">
                  There was a problem
                </p>
                <p className="text-xs">{errMsg}</p>
              </div>
            </div>
          );
        } finally {
          setIsLoading(false);
        }
      } catch (error) {
        const errorCode = error.code;
        let errMsg;
        let errorMessage;

        if (errorCode.includes("auth/user-not-found")) {
          errorMessage = "We cannot find an account with that email address";
        } else if (errorCode.includes("auth/wrong-password")) {
          errorMessage = "Your password is incorrect";
        } else {
          errorMessage = "An unknown error occurred";
        }

        errMsg = (
          <div className="w-full border border-red-600 p-4 gap-2 flex justify-start rounded-md shadow-innerRed my-4">
            <span>
              <ReportProblemOutlinedIcon className="text-red-600" />
            </span>
            <div className="flex flex-col items-start">
              <p className="text-lg text-red-600 font-medium">
                There was a problem
              </p>
              <p className="text-xs">{errorMessage}</p>
            </div>
          </div>
        );
        setBackendError(errMsg);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="w-full mt-2">
      <div className="w-full bg-white pb-10">
        <form
          className="w-[350px] mx-auto flex flex-col items-center"
          onSubmit={handleSignIn}
        >
          <Link to="/">
            <img className="w-32 " src={amazonLogo} alt="amznDark" />
          </Link>
          {backendError && backendError}
          <div className="w-full border border-zinc-200 rounded-md p-6">
            <h2 className="font-titleFont text-3xl font-medium mb-4">
              Sign in
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email or mobile phone number
                </label>
                <input
                  className={`w-full py-1 border px-2 text-base rounded-sm outline-none duration-100 ${
                    error.emailOrphn
                      ? "border-2 border-red-600 focus-within:border-[#e70800] focus-within:shadow-amazonInput"
                      : "border-zinc-400 focus-within:border-[#e77600] focus-within:shadow-amazonInput"
                  }`}
                  type="email"
                  id="email"
                  name="email"
                  value={signInData.emailOrphn}
                  onChange={(e) => {
                    setSignInData((prevState) => ({
                      ...prevState,
                      emailOrphn: e.target.value,
                    }));
                    setError((prevState) => ({
                      ...prevState,
                      emailOrphn: "",
                    }));
                  }}
                />
                {error.emailOrphn && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {error.emailOrphn}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <input
                  className={`w-full py-1 border px-2 text-base rounded-sm outline-none duration-100 ${
                    error.pwd
                      ? "border-2 border-red-600 focus-within:border-[#e70800] focus-within:shadow-amazonInput"
                      : "border-zinc-400 focus-within:border-[#e77600] focus-within:shadow-amazonInput"
                  }`}
                  type="password"
                  id="password"
                  name="password"
                  value={signInData.pwd}
                  onChange={(e) => {
                    setSignInData((prevState) => ({
                      ...prevState,
                      pwd: e.target.value,
                    }));
                    setError((prevState) => ({
                      ...prevState,
                      pwd: "",
                    }));
                  }}
                />
                {error.pwd && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {error.pwd}
                  </p>
                )}
              </div>
              {isLoading ? (
                <div className="flex justify-center">
                  <TailSpin
                    visible={true}
                    height="50"
                    width="50"
                    color="#febd69"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>
              ) : (
                <button
                  className="w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b]
              hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput"
                  disabled={isLoading}
                >
                  Continue
                </button>
              )}
            </div>
            <p className="text-xs text-black leading-4 mt-4">
              By continuing, you agree to Amazon's
              <span className="text-blue-600 cursor-pointer hover:underline hover:text-orange-700 underline-offset-1">
                {" "}
                Conditions of Use{" "}
              </span>{" "}
              and
              <span className="text-blue-600 cursor-pointer hover:underline hover:text-orange-700 underline-offset-1">
                {" "}
                Privacy Notice.
              </span>
            </p>
            <p className="text-xs text-gray-600 mt-4 cursor-pointer group w-24">
              <ArrowRightIcon />{" "}
              <span className="text-blue-600 group-hover:text-orange-700 group-hover:underline underline-offset-1">
                Need help?
              </span>
            </p>
          </div>
          <p className="w-full text-xs text-gray-600 mt-4 flex items-center">
            <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
            <span className="w-1/3 text-center">New to Amazon?</span>
            <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
          </p>
          <Link to="/signup" className="w-full">
            <button
              className="w-full py-1.5 mt-4 text-sm font-normal rounded-sm bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b
          border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput"
            >
              Create your Amazon account
            </button>
          </Link>
        </form>
      </div>
      <div className="w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 justify-center items-center py-10">
        <div className="flex items-center gap-6">
          <p
            className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1
            cursor-pointer duration-100"
          >
            Conditions of Use
          </p>
          <p
            className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1
            cursor-pointer duration-100"
          >
            Privacy Notice
          </p>
          <p
            className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1
            cursor-pointer duration-100"
          >
            Help
          </p>
        </div>
        <p className="text-xs text-gray-600">
          © 1996-2024, ReactEC.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
}
