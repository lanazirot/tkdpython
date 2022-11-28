import { Route, Routes } from "react-router-dom";
import { ProfessorsPage } from "../../professors/pages/ProfessorsPage";
import { ProfessorDetailPage } from "../pages/ProfessorDetailPage";

export const ProfessorsRouter = () => {
  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/" element={<ProfessorsPage />} />
          <Route
            path="/:professorId"
            element={<ProfessorDetailPage />}
          />
        </Routes>
      </div>
    </>
  );
};
