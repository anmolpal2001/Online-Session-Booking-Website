import React, { useEffect, useState } from "react";
import { SessionContextApi } from "../../context/SessionContextProvider";
import TeacherLayout from "./Layout";

const TeacherDashboard = () => {
  const {pendingCount,acceptedCount,fetchBookingRequests,fetchAcceptedSessions} = SessionContextApi();

  useEffect(() => {
    fetchBookingRequests();
    fetchAcceptedSessions();
  }, []);


  return (
    <>
      <TeacherLayout>
        <div>
          <div className="flex justify-center flex-col items-center mt-15">
            <section className="w-full h-full mx-5 md:mx-10 p-3 sm:p-5">
              <h1 className="mb-4 text-2xl text-center font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                Welcome Back
              </h1>
              <p className="text-gray-700 dark:text-gray-300 text-center mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                pulvinar ultricies elit, id laoreet ex vehicula eget. Phasellus
                posuere felis vitae justo tincidunt, id tempus sapien auctor.
                Duis vitae consequat purus.
              </p>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                <div className="bg-blue-200 dark:bg-blue-600 text-blue-800 dark:text-white py-4 px-6 rounded-lg">
                  <h2 className="font-semibold text-lg mb-2">
                    Scheduled Sessions
                  </h2>
                  <p className="text-sm">
                    You have {acceptedCount} sessions scheduled.
                  </p>
                </div>
                <div className="bg-yellow-200 dark:bg-yellow-600 text-yellow-800 dark:text-white py-4 px-6 rounded-lg">
                  <h2 className="font-semibold text-lg mb-2">
                    Pending Requests
                  </h2>
                  <p className="text-sm">
                    You have {pendingCount} pending session requests from students.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </TeacherLayout>
    </>
  );
};

export default TeacherDashboard;
