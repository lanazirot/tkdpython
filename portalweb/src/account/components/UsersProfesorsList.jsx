import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ReactSearchBox from "react-search-box";
import axiosInstance from "../../axios";
import { setSelectedProfessor } from "../../slices/professors";

export const UserProfesorsList = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    axiosInstance.get("/professors/norole").then((res) => {
      setUsers(res.data.users);
    });
  }, []);

  return (
    <ReactSearchBox
      placeholder="Search for a user with no role"
      data={users}
      onSelect={(record) => {
        console.log(record);
        dispatch(setSelectedProfessor(record));
      }}
      autoFocus
      leftIcon={<>🔎</>}
      iconBoxSize="48px"
    />
  );
};
