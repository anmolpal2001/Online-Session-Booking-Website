import React, { useContext, useEffect, useState } from "react";
import SessionContext from "./SessionContext";
import { useSelector } from "react-redux";

export const SessionContextApi = () => {
  return useContext(SessionContext);
};

const SessionContextProvider = ({ children }) => {
  const [bookingRequests, setBookingRequests] = useState([]);
  const [bookedSessions, setBookedSessions] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedSessions, setAcceptedSessions] = useState([]);
  const [rejectedSessions, setRejectedSessions] = useState([]);
  const [cancelledSessions, setCancelledSessions] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const formatDate = (date) => {
    return new Date(date).toDateString();
  };

  const fetchTeachers = async () => { 
    try {
      setLoading(true)
      const response = await fetch("https://knowledgehub-backend.onrender.com/api/v1/student/getAllTeachers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setTeachers(data.teachers);
        setLoading(false);
      } else {
        console.log(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.message);
    }
  };

  const fetchPendingRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://knowledgehub-backend.onrender.com/api/v1/student/sessionRequestList",{
        method : "GET",
        headers : {
          "Content-Type" : "application/json",
          Authorization : `Bearer ${currentUser.token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setPendingRequests(data.bookingRequests);
        setLoading(false);
      } else {
        console.log(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.message);
    }
  };

  const fetchBookedSessions = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://knowledgehub-backend.onrender.com/api/v1/student/getbookedSessions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setBookedSessions(data.bookedSessions);
        setLoading(false);
      } else {
        console.log(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.message);
    }
  };
  const fetchRejectedSessions = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://knowledgehub-backend.onrender.com/api/v1/student/rejectedRequestsList", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setLoading(false);
        setRejectedSessions(data.rejectedRequests);
      } else {
        console.log(data);
        setLoading(false);
        setError(data.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.message);
    }
  };

  const fetchBookingRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://knowledgehub-backend.onrender.com/api/v1/teacher/getAllBookingRequests", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setBookingRequests(data.bookingRequests);
        setPendingCount(data.bookingRequests.length);
        setLoading(false);
      } else {
        console.log(data);
        setLoading(false);
        setError(data.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.message);
    }
  };
  const fetchCancelledSessions = async () => {
    try {
      setLoading(true);
        const response = await fetch("https://knowledgehub-backend.onrender.com/api/v1/teacher/cancelledRequests", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${currentUser.token}`,
            },
        });
        const data = await response.json();
        if(response.ok){
            setCancelledSessions(data.cancelledRequests);
            setLoading(false);
        } else {
            setError(data.message);
            setLoading(false);
        }
    } catch (error) {
        console.error("Error fetching cancelled sessions:", error);
        setLoading(false);
        setError(error.message)
    }
};
const fetchAcceptedSessions = async () => {
  try {
    setLoading(true);
    const response = await fetch("https://knowledgehub-backend.onrender.com/api/v1/teacher/getTeacherBookedSessions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      setAcceptedSessions(data.bookedSessions);
      setAcceptedCount(data.bookedSessions.length);
      setLoading(false);
    } else {
      console.log(data);
      setLoading(false);
    }
  } catch (error) {
    console.log(error);
    setLoading(false);
    setError(error.message);
  }
};

  useEffect(() => {
    if(currentUser !== null) {
      if (currentUser && currentUser.accountType === "Teacher") {
        fetchBookingRequests();
        fetchCancelledSessions();
        fetchAcceptedSessions();
      }
      if (currentUser && currentUser.accountType === "Student") {
        fetchBookedSessions();
        fetchPendingRequests();
        fetchRejectedSessions();
        fetchTeachers();
      }
    }
    else {
      console.log("No user found");
    }
  }, []);

  return (
    <SessionContext.Provider
      value={{
        error,
        loading,
        formatDate,
        pendingCount,
        acceptedCount,
        bookingRequests,
        acceptedSessions,
        teachers,
        fetchTeachers,
        fetchAcceptedSessions,
        setBookingRequests,
        setPendingRequests,
        fetchPendingRequests,
        fetchBookingRequests,
        bookedSessions,
        fetchBookedSessions,
        pendingRequests,
        rejectedSessions,
        fetchRejectedSessions,
        cancelledSessions,
        fetchCancelledSessions,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
