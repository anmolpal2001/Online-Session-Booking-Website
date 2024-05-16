import React, { useEffect, useState } from "react";
import { SessionContextApi } from "../../context/SessionContextProvider"; // Import the SessionContextApi
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import { useSelector } from "react-redux";

const StudentCard = ({ request }) => {
  const { bookingRequests, setBookingRequests,formatDate } = SessionContextApi();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [approveloading, setApproveLoading] = useState(false);
  const [rejectloading, setRejectLoading] = useState(false);
  const [error, setError] = useState("");
  const { fullname, email, profilePic } = request.student.accountDetails;
  const { date } = request;
  const { start, end } = request.slot;
  const handleApproveRequest = async () => {
    console.log("Approve Request");
    try {
      setApproveLoading(true);
      const response = await fetch("http://localhost:3000/api/v1/teacher/approveSession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify({ sessionId: request._id }),
      });
      const data = await response.json();
      if (response.ok) {
        setApproveLoading(false);
        setBookingRequests(
          bookingRequests.filter((req) => req._id !== request._id)
        );
      } else {
        console.log(data);
        setApproveLoading(false);
        setError(data.message);
      }
    } catch (error) {
      console.log(error);
      setApproveLoading(false);
      setError(error.message);
    }
  };

  const handleRejectRequest = async () => {
    console.log("Reject Request");
    try {
      setRejectLoading(true);
      const response = await fetch("https://knowledgehub-backend.onrender.com/api/v1/teacher/rejectSession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify({ sessionId: request._id }),
      });
      const data = await response.json();
      if (response.ok) {
        setBookingRequests(
          bookingRequests.filter((req) => req._id !== request._id)
        );
        setRejectLoading(false);
      } else {
        console.log(data);
        setRejectLoading(false);
        setError(data.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    // handleRejectRequest(); // This should not be called on every render
    // handleApproveRequest(); // This should not be called on every render
  }, [request._id]);

  return (
    <div>
      <div className="w-full max-w-md flex flex-col bg-[#49827e]  rounded-lg shadow">
        <div className="flex justify-center items-center flex-col px-4 pt-4">
          <img
            className="w-28 h-28 mt-2 rounded-full shadow-lg"
            src={profilePic}
            alt=""
          />
          <h5 className="mb-1 mt-3 text-xl font-medium text-white">
            {fullname}
          </h5>
          <span className="text-sm text-white">{email}</span>
          <div className="mb-1 mt-3 text-xl font-medium text-white flex items-center gap-2">
            <div>
              <InsertInvitationIcon />
            </div>
            <div>{formatDate(date)}</div>
          </div>
          <div className="mb-1 mt-3 text-xl font-medium text-white flex items-center gap-2">
            <div>
              <AlarmOnIcon />
            </div>
            <div>
              {start} - {end}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-4 w-full">
          <button
            onClick={handleApproveRequest}
            className={`w-full py-2 text-white rounded-bl-lg ${
              approveloading
                ? "cursor-not-allowed bg-gray-400"
                : "bg-blue-700 hover:bg-blue-600"
            } ${rejectloading ? "cursor-not-allowed" : ""}`}
          >
            {approveloading ? "Loading..." : "Approve"}
          </button>
          <button
            onClick={handleRejectRequest}
            className={`w-full py-2 text-white rounded-br-lg ${
              rejectloading
                ? "cursor-not-allowed bg-gray-400"
                : "bg-red-700 hover:bg-red-600"
            } ${approveloading ? "cursor-not-allowed" : ""}`}
          >
            {rejectloading ? "Loading..." : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
