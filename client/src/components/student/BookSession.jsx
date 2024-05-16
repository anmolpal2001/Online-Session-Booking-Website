import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StudentLayout from "./Layout";

const BookSession = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const teacher = useSelector((state) => state.student.teacher);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    subject: "",
    description: "",
    teacherId: teacher.accountDetails._id,
  });

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      setLoading(true);
      const response = await fetch(
        "https://knowledgehub-backend.onrender.com/api/v1/student/bookSession",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        setError(data.message);
      }
      setLoading(false);
      // Reset the form data
      setFormData({
        date: "",
        startTime: "",
        endTime: "",
        subject: "",
        description: "",
      });
      navigate("/student");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.message);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <StudentLayout>
      <div className="flex justify-center items-center mt-20">
        <section className="w-full h-full mx-5 p-3 sm:p-5">
          <div className="flex flex-col lg:flex-row">
            <div className="max-w-2xl xl:w-1/2 w-full sm:px-10 lg:px-15 px-5 flex justify-center">
              <div className="w-full flex justify-center flex-col items-center bg-[#1F3537] py-10 px-5 rounded-lg">
                <h1 className="sm:text-2xl text-xl font-bold text-center text-white">
                  Book a session with {teacher.accountDetails.fullname}
                </h1>
                <div className="mt-5 flex items-center justify-center">
                  <img
                    className="w-28 h-28 rounded-full shadow-lg"
                    src={teacher.accountDetails.profilePic}
                    alt=""
                  />
                </div>
                <div className="mt-5 grid grid-cols-1 gap-y-4">
                  <div className="flex items-center">
                    <span className="sm:text-xl font-medium text-white">
                      Subject Specialization:
                    </span>
                    <span className="ml-2 text-[#57fdfd]">
                      {teacher.subjectSpecialization}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="sm:text-xl font-medium text-white">
                      Education Qualification:
                    </span>
                    <span className="ml-2 text-[#57fdfd]">
                      {teacher.educationQualification}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="sm:text-xl font-medium text-white">
                      Experience:
                    </span>
                    <span className="ml-2 text-[#57fdfd]">
                      {teacher.experience}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-2xl lg:w-1/2 w-full">
              <div className="w-full flex justify-center flex-col items-center py-6">
                <form onSubmit={handleSubmit} className="space-y-4 w-4/6">
                  <div>
                    <label
                      htmlFor="date"
                      className="block font-medium text-gray-700"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="form-input mt-1 block w-full rounded-md border-gray-300"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="startTime"
                      className="block font-medium text-gray-700"
                    >
                      Start Time
                    </label>
                    <input
                      type="time"
                      id="startTime"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      className="form-input mt-1 block w-full rounded-md border-gray-300"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="endTime"
                      className="block font-medium text-gray-700"
                    >
                      End Time
                    </label>
                    <input
                      type="time"
                      id="endTime"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleChange}
                      className="form-input mt-1 block w-full rounded-md border-gray-300"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block font-medium text-gray-700"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-input mt-1 block w-full rounded-md border-gray-300"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                      className="form-textarea mt-1 block w-full rounded-md border-gray-300"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className={`w-full  text-white py-2 px-4 rounded-md  ${
                      loading
                        ? "cursor-not-allowed bg-gray-400"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {loading ? "Loading..." : "Book Session"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </StudentLayout>
  );
};

export default BookSession;
