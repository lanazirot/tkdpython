import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ReactSearchBox from "react-search-box";
import axiosInstance from "../../axios";
import { setSelectedProfessor } from "../../slices/professors";

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    axiosInstance.get("/norole").then((res) => {
      //Map each user to a new object
      const users = res.data.users.map((user) => {
        return {
          key: user.uuid,
          value: `${user.name} - ${user.email}`,
          data: user
        }});
        setUsers(users);
    });
    return () => {
      setUsers([]);
      dispatch(setSelectedProfessor(null));
    };
  }, []);
  return (
    <ReactSearchBox
      clearOnSelect
      placeholder="Busca un usuario que no tenga rol"
      data={users}
      onSelect={(record) => {
        dispatch(setSelectedProfessor(record.item.data));
      }}
      autoFocus
      leftIcon={<>🔎</>}
      iconBoxSize="48px"
    />
  );
};
