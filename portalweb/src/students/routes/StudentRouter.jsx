import { Route, Routes } from "react-router-dom";
import { AddStudentPage } from "../pages/AddStudentPage";
import { StudentDetailPage } from "../pages/StudentDetailPage";
import { StudentsPage } from "../pages/StudentsPage";



export const StudentRouter = () => {
  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/" element={<StudentsPage />} />
          <Route path="/:studentId" element={<StudentDetailPage />} />
          <Route path="/add" element={<AddStudentPage />} />
        </Routes>
      </div>
    </>
  );
};
