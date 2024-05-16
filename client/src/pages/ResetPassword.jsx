import React, { useState } from "react";
import { Link,useParams } from "react-router-dom";
import logo from "../assets/knowhub.png";
import MailLockIcon from '@mui/icons-material/MailLock';

const ResetPassword = () => {
  const {id, token} = useParams();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`https://knowledgehub-backend.onrender.com/api/v1/auth/change-password/${id}/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Something went wrong");
    }
    setLoading(false);
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
                Reset Your Password
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    New Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      required
                      value={formData.newPassword}
                      onChange={onChangeHandler}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="confirmNewPassword"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      type="password"
                      required
                      value={formData.confirmNewPassword}
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
                    {loading ? "Updating Password..." : "Reset Password"}
                  </button>
                  {error && (
                    <p className="text-red-500 text-center text-sm mt-2">
                      {error}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center mt-16 mx-auto">
          <div className="flex flex-col justify-center items-center w-full max-w-lg px-6 py-8 bg-white rounded-lg md:px-8 lg:px-10">
            <h1 className="text-3xl font-bold mb-4 text-center text-[#2A8683]">
              Password Reset Successfull
            </h1>
            <div className=" mb-4">
              <MailLockIcon style={{ fontSize: 60, color: '#2A8683' }} />
            </div>
            <p className="mb-2 text-center">
              Your password has been reset successfully.
            </p>
            <Link to="/signin">
              <p className="text-[#2A8683] text-center text-sm mt-2">
                Go to Sign In Page
              </p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
