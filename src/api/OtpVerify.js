import axios from "axios";

export const otpSending = async (email) => {
  const response = await axios.post("http://localhost:4000/send-otp", {
    email,
  });
  return response;
};

export const otpVerifying = async (email, otp) => {
  const response = await axios.post("http://localhost:4000/verify-otp", {
    email,
    otp,
  });
  return response;
};
