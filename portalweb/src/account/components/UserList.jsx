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
      // Iterate over the users and add a key to each one
      const users = res.data.users.map((user) => {
        return {
          key: user.id,
          value: user.name,
          data: user,
        };
      });
      setUsers(users);
    });
  }, []);


  return (
    <ReactSearchBox
      placeholder="Busca un usuario sin rol"
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
