import AuthLayout from "./components/AuthLayout";
import StudentDashboard from "./components/student/Dashboard";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BookedSessions from "./components/student/BookedSessions";
import BookSession from "./components/student/BookSession";
import TeacherDashboard from "./components/teacher/Dashboard";
import ApproveRequest from "./components/teacher/ApproveRequest";
import SessionContextProvider from "./context/SessionContextProvider";
import ProfilePage from "./pages/ProfilePage";
import PendingRequests from "./components/student/PendingRequests";
import RejectsSessions from "./components/student/RejectsSessions";
import Sessions from "./components/teacher/Sessions";
import CancelledRequests from "./components/teacher/CancelledRequests";
import { useSelector } from "react-redux";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const router = createBrowserRouter([
    {
      path: "/signin",
      element: <SigninPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      path: "/",
      children:
        isAuthenticated && currentUser.accountType === "Student"
          ? [
              {
                index: true,
                element: (
                  <AuthLayout>
                    <StudentDashboard />
                  </AuthLayout>
                ),
              },
              {
                path: "book-session",
                element: (
                  <AuthLayout>
                    <BookSession />
                  </AuthLayout>
                ),
              },
              {
                path: "booked-sessions",
                element: (
                  <AuthLayout>
                    <BookedSessions />
                  </AuthLayout>
                ),
              },
              {
                path: "pending-requests",
                element: (
                    <AuthLayout>
                    <PendingRequests />
                    </AuthLayout>
                ),
              },
              {
                path: "rejected-sessions",
                element: (
                  <AuthLayout>
                    <RejectsSessions />
                  </AuthLayout>
                ),
              },
            ]
          : [
              {
                index: true,
                element: (
                  <AuthLayout>
                    <TeacherDashboard />
                  </AuthLayout>
                ),
              },
              {
                path: "approve-session",
                element: (
                  <AuthLayout>
                    <ApproveRequest />
                  </AuthLayout>
                ),
              },
              {
                path: "booked-sessions",
                element: (
                  <AuthLayout>
                    <Sessions />
                  </AuthLayout>
                ),
              },
              {
                path: "cancelled-sessions",
                element: (
                  <AuthLayout>
                    <CancelledRequests />
                  </AuthLayout>
                ),
              },
            ],
    },
    {
      path: "/profile",
      element: (
        <AuthLayout>
          <ProfilePage />
        </AuthLayout>
      ),
    },
    {
      path : "/forgot-password",
      element : <ForgotPassword />
    },
    {
      path : "/reset-password/:id/:token",
      element : <ResetPassword />
    }
  ]);

  return (
    <>
      <SessionContextProvider>
        <RouterProvider router={router} />
      </SessionContextProvider>
    </>
  );
}

export default App;
