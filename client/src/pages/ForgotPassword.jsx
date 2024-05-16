import React, { useState } from "react";
import logo from "../assets/knowhub.png";
import { Link } from "react-router-dom";
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const onChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://knowledgehub-backend.onrender.com/api/v1/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        setError("");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {!success ? (
        <div>
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-28 w-auto"
                src={logo}
                alt="Your Company"
              />
              <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Forgot Password
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    EMAIL ADDRESS
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={onChangeHandler}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    onClick={handleSubmit}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {loading ? "Sending..." : "Send Email"}
                  </button>
                  {error && (
                    <p className="text-red-500 text-center text-sm mt-2">
                      {error}
                    </p>
                  )}
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                <Link
                  to="/signin"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Back to Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center mt-16 mx-auto">
          <div className="flex flex-col justify-center items-center w-full max-w-lg px-6 py-8 bg-white rounded-lg md:px-8 lg:px-10">
            <h1 className="text-3xl font-bold mb-4 text-center text-[#2A8683]">
              Email Sent Successfully
            </h1>
            <div className=" mb-4">
              <MarkEmailReadIcon style={{ fontSize: 60, color: '#2A8683' }}  />
            </div>
            <p className="mb-2 text-center">
              An email with instructions to reset your password has been sent
              to:
            </p>
            <p className="mb-4 text-center font-bold text-blue-700">{email}</p>
            <p className="mb-4 text-center">
              Click the link in that email to reset your password.
            </p>
            <p className="mb-2 text-center">
              Didn't receive the email? Check your Spam folder, it may have been
              caught by a filter. If you still don't see it, you can{" "}
              <a href="#" className="text-[#2A8683] hover:underline">
                resend the reset password email.
              </a>
            </p>
            <p className="mb-4 text-center">
              Wrong email address?{" "}
              <Link to="/forgot-password" className="text-[#2A8683] hover:underline">
                Change it.
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
