import React, { useEffect, useRef, useState } from "react";
import TeacherLayout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, setUserDetails } from "../../redux/auth/authSlice";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ClearIcon from "@mui/icons-material/Clear";
import CircularProgress from "@mui/material/CircularProgress";

const TeacherProfile = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [formDisable, setFormDisable] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(currentUser.profilePic);
  const fileInputRef = useRef(null);
  const formDisableHandler = () => {
    setFormDisable((val) => !val);
  };
  const [formData, setFormData] = useState({
    name: currentUser.fullname || "",
    email: currentUser.email || "",
    educationQualification: currentUser.educationQualification || "",
    subjectSpecialization: currentUser.subjectSpecialization || "",
    experience: currentUser.experience || "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      setLoading(true);
      const newData = new FormData();
      newData.append("formData",JSON.stringify(formData));
      newData.append("file",profileImage);
      for (let [key, value] of newData.entries()) {
        console.log(`${key}: ${value}`);
      }
      const response = await fetch("https://knowledgehub-backend.onrender.com/api/v1/teacher/updateProfile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: newData,
      });
      const data = await response.json();
      setLoading(false);
      if (data.success) {
        console.log(data);
        setFormDisable(true);
      } else {
        setError(data.message);
        console.log(data.message);
      }
      dispatch(loginSuccess({ currentUser: { ...currentUser, ...data.updatedTeacher } }));
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.message);
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    if (!file) return;
    else {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <TeacherLayout>
      <div className="mt-14 lg:ml-14 mx-auto">
        <div className="lg:w-5/6 w-5/6 mx-auto p-6 bg-gray-100 rounded-lg shadow-md flex justify-center relative">
        <div className="absolute right-4 ">
            <button
              className={`text-white flex justify-center gap-3 items-center  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                !formDisable ? "bg-gray-600" : "bg-blue-700 hover:bg-blue-800"
              }`}
              onClick={formDisableHandler}
            >
              <div>{formDisable ? "Edit Profile" : "Cancel"}</div>
              <div>{formDisable ? <BorderColorIcon /> : <ClearIcon />}</div>
            </button>
          </div>
          <div className="flex mt-10 mx-auto flex-col justify-center items-center w-full h-full">
          <div className="w-full">
              <div className="mt-20 md:mx-auto gap-10 flex flex-col items-center justify-center">
                <img
                  src={
                    selectedImage ||
                    "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg"
                  }
                  className="lg:h-64 lg:w-64 h-56 w-56 object-cover rounded-full border-[#63d3a6] border-8"
                  alt=""
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleProfilePicChange}
                  style={{ display: "none" }}
                />
                <button
                  type="button"
                  className={`text-white bg-[#3797eb] hover:bg-gray-900 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 -mt-5 ml-4 dark:border-gray-700 ${
                    formDisable ? "hidden" : ""
                  }`}
                  onClick={() => fileInputRef.current.click()}
                >
                  Change Profile Pic
                </button>
              </div>
            </div>
            <div className="lg:w-4/5 w-full my-10 mx-5">
            <form className="w-full">
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={formDisable}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={formDisable}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={formDisable}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Education Qualification:
                </label>
                <input
                  type="text"
                  name="educationQualification"
                  value={formData.educationQualification}
                  onChange={handleChange}
                  disabled={formDisable}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Subject Specialization:
                </label>
                <input
                  type="text"
                  name="subjectSpecialization"
                  value={formData.subjectSpecialization}
                  onChange={handleChange}
                  disabled={formDisable}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Experience:
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  disabled={formDisable}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col mt-10 w-full">
                  <button
                    onClick={handleSubmit}
                    className={`p-3 rounded-lg hover:opacity-90 font-bold text-white mx-2    ${
                      formDisable
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-blue-700 shadow-lg shadow-blue-500/50"
                    }`}
                    disabled={formDisable}
                  >
                    {loading ? <CircularProgress size={22} style={{"color" : "white"}} thickness={5}/> : "SAVE CHANGES"}
                  </button>
                  {error && <p className="text-red-600 text-center">{error}</p>}
                </div>
            </form>
            </div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherProfile;
