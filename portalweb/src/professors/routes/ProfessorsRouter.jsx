import { Route, Routes } from "react-router-dom";
import { ProfessorsPage } from "../../professors/pages/ProfessorsPage";
import { AddProfessorPage } from "../pages/AddProfessorPage";
import { ProfessorDetailPage } from "../pages/ProfessorDetailPage";

export const ProfessorsRouter = () => {
  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/" element={<ProfessorsPage />} />
          <Route path="/:professorId" element={<ProfessorDetailPage />} />
          <Route path="/add" element={<AddProfessorPage />} />
        </Routes>
      </div>
    </>
  );
};
