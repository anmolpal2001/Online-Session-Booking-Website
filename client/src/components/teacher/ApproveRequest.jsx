import React, { useEffect, useState } from "react";
import StudentCard from "./StudentCard";
import { SessionContextApi } from "../../context/SessionContextProvider";
import TeacherLayout from "./Layout";

const ApproveRequest = () => {
  const { bookingRequests, fetchBookingRequests, loading, error } =
    SessionContextApi();
  useEffect(() => {
    fetchBookingRequests();
  }, []);

  return (
    <TeacherLayout>
      <div>
        <div className="flex justify-center items-center flex-col mt-20">
          <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
            Approve Session's Requst
          </h1>
          <section className="w-full h-full mx-5 md:mx-10 p-3 sm:p-5">
            {bookingRequests.length === 0 ? (
              <section className="w-full h-full mx-5 md:mx-10 p-3 sm:p-5">
                <div className="bg-blue-200 text-center text-blue-800 mr-10 px-6 py-4 rounded-lg">
                  <h2 className="font-semibold text-lg mb-2">
                    {loading ? error ? error : "Loading..." : "No pending requests"}
                  </h2>
                </div>
              </section>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookingRequests.map((request) => (
                  <StudentCard
                    key={request._id}
                    request={request}
                    loading={loading}
                    error={error}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default ApproveRequest;
