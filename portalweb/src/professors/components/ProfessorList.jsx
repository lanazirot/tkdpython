import React, { useEffect } from "react";
import { MDBRow } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfessors } from "../../slices/professors";
import MoonLoader from "react-spinners/MoonLoader";
import { Professor } from "./Professor";

export const ProfessorsList = () => {
  const dispatch = useDispatch();
  const { loading, hasErrors, professors } = useSelector(
    (state) => state.professor
  );

  useEffect(() => {
    dispatch(fetchProfessors());
  }, [dispatch]);

  return (
    <MDBRow className="row-cols-1 row-cols-md-3 g-4 mt-3">
      {loading && !professors && <MoonLoader />}
      {hasErrors && <p>Unable to display professors.</p>}
      {professors.data &&
        professors.data.map((professor) => (
          <Professor key={professor.id} item={professor} />
        ))}
    </MDBRow>
  );
};
