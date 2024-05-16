import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
import { SessionContextApi } from "../../context/SessionContextProvider";
import StudentLayout from "./Layout";

const StudentDashboard = () => {
  const {teachers,loading,error,fetchTeachers} = SessionContextApi();
  const currentUser = useSelector(state => state.auth.currentUser);
  useEffect(() => {
    fetchTeachers(); 
  }, [currentUser]);
  return (
        <StudentLayout>
          {/* <div className="p-4 sm:ml-64"> */}
          <div className="h-screen">
          <div className="flex justify-center items-center mt-15 flex-col">
          <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">Welcome Back, {currentUser.fullname}</h1>
          <section className="w-full mx-5 md:mx-10 p-3 sm:p-5 bg-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center mx-auto">
                {teachers.map((teacher) => (
                  <Card key={teacher._id} teacher={teacher} />
                ))}
              </div>
            </section>
            </div>
          </div>
        </StudentLayout>
  )
};

export default StudentDashboard;
