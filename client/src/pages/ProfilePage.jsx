import React from 'react'
import { useSelector } from 'react-redux'
import StudentProfile from '../components/student/Profile';
import TeacherProfile from '../components/teacher/Profile';

const ProfilePage = () => {
    const currentUser = useSelector(state => state.auth.currentUser);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return isAuthenticated && currentUser && currentUser.accountType === "Student" ? <StudentProfile /> : <TeacherProfile />
}

export default ProfilePage