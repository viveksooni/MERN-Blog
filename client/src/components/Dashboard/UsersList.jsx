import userStore from "@/store/userStore";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DEFAULT_PROFILE_IMAGE } from "./DashBoard-Profile";
import { UserListTable } from "./UserListTable";

export default function UsersList() {
  const [userList, setUserList] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [LastMonthUsers, setLastMonthUsers] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsersList = async () => {
      try {
        const response = await axios.get(`/api/v1/getUsers`);

        if (response.data) {
          setUserList(response.data.users);
          setTotalUser(response.data.totalUsers);
          setLastMonthUsers(response.data.UserAddedLastMonth);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUsersList();
  }, []);
  console.log(userList);
  return (
    <div className="w-full  p-4">
      <h1 className="text-4xl font-semibold my-7">All Users</h1>
      <div className="overflow-x-auto">
        <UserListTable
          users={userList}
          loading={loading}
          setUsers={setUserList}
          totalUsers={totalUser}
          setTotalUser={setTotalUser}
        />
      </div>
    </div>
  );
}
