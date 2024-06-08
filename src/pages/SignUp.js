import amazonLogo from "../assets/amazonDark.png";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { TailSpin } from "react-loader-spinner";
import { motion } from "framer-motion";

export default function SignUp() {
  const auth = getAuth();

  const [signUpData, setSignUpData] = useState({
    fullName: "",
    emailOrphn: "",
    pwd: "",
    repwd: "",
  });
  const [error, setError] = useState({
    fullName: "",
    emailOrphn: "",
    pwd: "",
    repwd: "",
  });

  const [backendError, setBackendError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const emailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };
  const phoneValidation = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    let hasError = false;

    setError({
      fullName: "",
      emailOrphn: "",
      pwd: "",
      repwd: "",
    });

    if (signUpData.fullName.trim() === "") {
      setError((prevState) => {
        return { ...prevState, fullName: "Enter your name" };
      });
      hasError = true;
    }
    if (!signUpData.emailOrphn) {
      setError((prevState) => {
        return {
          ...prevState,
          emailOrphn: "Enter your email or mobile phone number",
        };
      });
      hasError = true;
    } else {
      if (
        !emailValidation(signUpData.emailOrphn) &&
        !phoneValidation(signUpData.emailOrphn)
      ) {
        setError((prevState) => {
          return {
            ...prevState,
            emailOrphn:
              "Wrong or Invalid email address or mobile phone number. Please correct and try again.",
          };
        });
        hasError = true;
      }
    }

    if (!signUpData.pwd || signUpData.pwd.length < 6) {
      setError((prevState) => {
        return { ...prevState, pwd: "Minimum 6 characters required" };
      });
      hasError = true;
    }
    if (signUpData.pwd !== "") {
      if (!signUpData.repwd) {
        setError((prevState) => ({
          ...prevState,
          repwd: "Type your password again",
        }));
        hasError = true;
      } else if (signUpData.pwd !== signUpData.repwd) {
        setError((prevState) => ({
          ...prevState,
          repwd: "Passwords must match",
        }));
        hasError = true;
      }
    }

    if (!hasError) {
      setIsLoading(true);
      createUserWithEmailAndPassword(
        auth,
        signUpData.emailOrphn,
        signUpData.pwd
      )
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: signUpData.fullName,
          });
          // eslint-disable-next-line no-unused-vars
          const user = userCredential.user;
          setIsLoading(false);
          setSuccessMsg("Account Created Successfully!");
          setTimeout(() => {
            navigate("/signin");
          }, 3000);
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("auth/email-already-in-use")) {
            const errMsg = (
              <p className="text-red-600 text-xs tracking-wide -mt-1.5">
                <span className="italic font-titleFont font-extrabold text-base mr-2">
                  !
                </span>
                There's already an account with this email.{" "}
                <a
                  href="#si"
                  class="text-blue-600 hover:text-orange-600 hover:underline"
                >
                  Sign in
                </a>
                <span class="mx-1">or</span>
                <a
                  href="#lm"
                  class="text-blue-600 hover:text-orange-600 hover:underline"
                >
                  learn more
                </a>
              </p>
            );
            setBackendError(errMsg);
            setIsLoading(false);
          }
        });

      setSignUpData({
        fullName: "",
        emailOrphn: "",
        pwd: "",
        repwd: "",
      });
    }
  };
  return (
    <div className="w-full mt-2">
      <div className="w-full bg-white pb-10">
        <form
          className="w-[350px] mx-auto flex flex-col items-center"
          onSubmit={handleSignUp}
        >
          <Link to="/">
            <img className="w-32 " src={amazonLogo} alt="amznDark" />
          </Link>
          <div className="w-full border border-zinc-200 rounded-md p-6">
            <h2 className="font-titleFont text-3xl font-medium mb-4">
              Create Account
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Your name
                </label>
                <input
                  className={`w-full py-1 border px-2 text-base rounded-sm outline-none duration-100 ${
                    error.fullName
                      ? "border-2 border-red-600 focus-within:border-[#e70800] focus-within:shadow-amazonInput"
                      : "border-zinc-400 focus-within:border-[#e77600] focus-within:shadow-amazonInput"
                  }`}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="First and last name"
                  value={signUpData.fullName}
                  onChange={(e) => {
                    setSignUpData((prevState) => ({
                      ...prevState,
                      fullName: e.target.value,
                    }));
                    setError((prevState) => ({
                      ...prevState,
                      fullName: "",
                    }));
                  }}
                />
                {error.fullName && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {error.fullName}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="emailOrphone" className="text-sm font-medium">
                  Mobile number or email
                </label>
                <input
                  className={`w-full py-1 border px-2 text-base rounded-sm outline-none duration-100 ${
                    error.emailOrphn || backendError
                      ? "border-2 border-red-600 focus-within:border-[#e70800] focus-within:shadow-amazonInput"
                      : "border-zinc-400 focus-within:border-[#e77600] focus-within:shadow-amazonInput"
                  }`}
                  type="email"
                  id="emailOrphone"
                  name="emailOrphone"
                  value={signUpData.emailOrphn}
                  onChange={(e) => {
                    setSignUpData((prevState) => ({
                      ...prevState,
                      emailOrphn: e.target.value,
                    }));
                    setError((prevState) => ({
                      ...prevState,
                      emailOrphn: "",
                    }));
                    setBackendError("");
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
                {backendError && backendError}
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
                  placeholder="At least 6 characters"
                  value={signUpData.pwd}
                  onChange={(e) => {
                    setSignUpData((prevState) => ({
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
                )}{" "}
              </div>
              {signUpData.pwd.length < 6 && !error.pwd && (
                <div className="flex items-center gap-2">
                  <InfoOutlinedIcon className="text-blue-500" />
                  <p className="text-xs">
                    Passwords must be at least 6 characters
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label htmlFor="re-password" className="text-sm font-medium">
                  Re-enter password
                </label>
                <input
                  className={`w-full py-1 border px-2 text-base rounded-sm outline-none duration-100 ${
                    error.repwd
                      ? "border-2 border-red-600 focus-within:border-[#e70800] focus-within:shadow-amazonInput"
                      : "border-zinc-400 focus-within:border-[#e77600] focus-within:shadow-amazonInput"
                  }`}
                  type="password"
                  id="re-password"
                  name="re-password"
                  value={signUpData.repwd}
                  onChange={(e) => {
                    setSignUpData((prevState) => ({
                      ...prevState,
                      repwd: e.target.value,
                    }));
                    setError((prevState) => ({
                      ...prevState,
                      repwd: "",
                    }));
                  }}
                />
                {error.repwd && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {error.repwd}
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
                >
                  {signUpData.emailOrphn && error.emailOrphn === ""
                    ? "Verify Email"
                    : "Continue"}
                </button>
              )}
            </div>
            {successMsg && (
              <div className="py-2">
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-base font-titleFont font-semibold text-green-500 border-[1px] border-green-500 px-2 text-center"
                >
                  {successMsg}
                </motion.p>
              </div>
            )}
            <p className="text-xs text-black leading-4 my-8">
              By creating an account, you agree to Amazon's
              <span className="text-blue-600 cursor-pointer hover:underline hover:text-orange-600 underline-offset-1">
                {" "}
                Conditions of Use{" "}
              </span>{" "}
              and
              <span className="text-blue-600 cursor-pointer hover:underline hover:text-orange-600 underline-offset-1">
                {" "}
                Privacy Notice.
              </span>
            </p>
            <p className="border border-zinc-200"></p>
            <div className="flex flex-col text-xs my-6">
              <p className="font-bold">Buying for work?</p>
              <p className="text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
                Create a free business account
              </p>
            </div>
            <div>
              <p className="text-xs text-black">
                Already have an account?{" "}
                <span className="text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
                  <Link to="/signin">
                    Sign in
                    <ArrowRightIcon />
                  </Link>
                </span>
              </p>
            </div>
          </div>
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
