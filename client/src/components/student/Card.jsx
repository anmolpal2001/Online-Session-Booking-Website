import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTeacher } from "../../redux/student/studentSlice";
import SchoolIcon from '@mui/icons-material/School';

const Card = ({teacher}) => {
  console.log(teacher);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleBookSession = () => {
    dispatch(setTeacher({teacher : teacher}));
    navigate("/book-session");
  }

  return (
    <div>
      <div className="w-full max-w-sm flex flex-col bg-[#628a87]  rounded-lg shadow">
        <div className="h-4/5 flex justify-center items-center flex-col px-4 pt-4">
          <img
            className="w-48 h-48 mt-2 rounded-full shadow-lg"
            src={teacher.accountDetails.profilePic ? teacher.accountDetails.profilePic : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"}
            alt=""
          />
          <h5 className="mb-1 mt-3 text-xl font-medium text-white">
            {teacher.accountDetails.fullname}
          </h5>
          <div className="mt-5 grid grid-cols-1 gap-y-4">
            <div className="flex items-center flex-wrap">
              <span className="text-sm sm:text-lg font-medium text-white">
                Subject Specialization :
              </span>
              <span className="text-sm sm:text-lg font-semibold text-[#a7ffd3ee]">{teacher.subjectSpecialization}</span>
            </div>
            <div className="flex items-center flex-wrap">
              <span className="text-sm sm:text-lg font-medium text-white">
                {/* <SchoolIcon/> */}
                Education Qualification :
              </span>
              <span className="text-sm sm:text-lg font-semibold text-[#a7ffd3ee]">{teacher.educationQualification}</span>
            </div>
            <div className="flex items-center flex-wrap">
              <span className="text-sm sm:text-lg font-medium text-white">
                Experience:
              </span>
              <span className="text-sm sm:text-lg font-semibold text-[#a7ffd3ee]">{teacher.experience}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-4 w-full">
          {/* <button
            className="items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-blue-300 w-1/2"
          >
            Book Now
          </button> */}
          <button onClick={handleBookSession} className="bg-blue-700 hover:bg-blue-800 w-full py-2 text-white rounded-b-lg">
            Book Your Session
          </button>
      </div>
      </div>
    </div>
  );
};

export default Card;
