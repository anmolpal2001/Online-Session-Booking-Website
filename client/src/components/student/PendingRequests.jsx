import React, { useEffect } from "react";
import { SessionContextApi } from "../../context/SessionContextProvider";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSelector } from "react-redux";
import StudentLayout from "./Layout";

const PendingRequests = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const {pendingRequests,fetchPendingRequests,setPendingRequests,formatDate,loading,error} = SessionContextApi();
  useEffect(() => {
    fetchPendingRequests();
  }, []);
  const handleCancelRequest = async (sessionId) => {
    console.log("Cancel Request");
    try {
      const response = await fetch("https://knowledgehub-backend.onrender.com/api/v1/student/cancelSession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify({ sessionId }),
      });
      const data = await response.json();
      setPendingRequests(
        pendingRequests.filter((session) => session._id !== sessionId)
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <StudentLayout>
      <div className="flex justify-center flex-col items-center mt-15">
      <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
        Pending Request's List
      </h1>
      <section className="bg-gray-100 w-full h-full mx-5 md:mx-10 dark:bg-gray-900 p-3 sm:p-5">
        <div className="mx-auto max-w-screen-3xl px-4">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"></div>
            <div className="overflow-x-auto overflow-y-auto h-screen">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-y-scroll">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Teacher Name
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Start
                    </th>
                    <th scope="col" className="px-4 py-3">
                      End
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                {pendingRequests.length === 0 ? (
                  <tbody>
                    <tr className="bg-white dark:bg-gray-800 text-center">
                      <td className="px-4 py-3" colSpan="6">
                        {loading ? error ? error : "Loading..." : "No pending requests"}
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {pendingRequests.map((session) => (
                      <tr
                        key={session._id}
                        className="bg-white dark:bg-gray-800"
                      >
                        <td className="px-4 py-3">
                          {session.teacher.accountDetails.fullname}
                        </td>
                        <td className="px-4 py-3">
                          {formatDate(session.date)}
                        </td>
                        <td className="px-4 py-3">{session.slot.start}</td>
                        <td className="px-4 py-3">{session.slot.end}</td>
                        <td className="px-4 py-3">
                          <span className="bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100 rounded-full text-xs px-3 py-1">
                            {session.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-3">
                            <button
                              type="button"
                              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200"
                              onClick={() => handleCancelRequest(session._id)}
                            >
                              <DeleteForeverIcon />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
            <nav
              className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing
                <span className="font-semibold text-gray-900 dark:text-white">
                  1-10
                </span>
                of
                <span className="font-semibold text-gray-900 dark:text-white">
                  1000
                </span>
              </span>
              <ul className="inline-flex items-stretch -space-x-px">
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-current="page"
                    className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    ...
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    100
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </div>
    </StudentLayout>
  );
};

export default PendingRequests;
