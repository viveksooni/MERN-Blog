import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckIcon, Loader2, PencilIcon, Trash2, X } from "lucide-react";

import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import axios from "axios";

import { useState } from "react";
import Modal from "../Modal";
import { DEFAULT_PROFILE_IMAGE } from "./DashBoard-Profile";
import { ToolTip } from "../Custom/ToolTip";

export function UserListTable({
  users,
  loading,
  setUsers,
  totalUsers,
  setTotalUser,
}) {
  const handleUserDelete = async () => {
    try {
      const response = await axios.delete(`/api/v1/delete/${userId}`);
      if (response.statusText === "OK") {
        setUsers((prev) => prev.filter((user) => user._id != userId));
        // setTotalUser(response.data.totalUsers);
        toast({
          title: "User deleted successfully",
        });
      }
    } catch (e) {
      console.log(e);
      toast({ title: "post was not deleted", variant: "destructive" });
    } finally {
      setShowModal(false);
    }
  };

  const [userId, setUserId] = useState(null);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hideLoadMore, setHideLoadMore] = useState(users.length < totalUsers);

  const LoadMoreHandler = async () => {
    try {
      setLoadMoreLoading(true);
      const response = await axios.get(
        `/api/v1/getUsers?startIndex=${users.length}&limit=3`
      );
      if (response.statusText == "OK") {
        const updatedUsersList = [...users, ...response.data.users];

        setUsers(updatedUsersList);
        if (updatedUsersList.length >= totalUsers) {
          console.log(`user are ${users.length}`);
          setHideLoadMore(true);
        }
      }
    } catch (e) {
      console.log(e);
      toast({ title: "not able to load more try later.. " });
    } finally {
      setLoadMoreLoading(false);
    }
  };
  return (
    <div>
      <Table>
        <TableCaption>
          A list of Users. [ {users.length} ] total are [ {totalUsers} ]
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px] text-center">
              Date Created
            </TableHead>
            <TableHead className="text-center">User Image</TableHead>
            <TableHead>User Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="w-[120px] text-center">Admin</TableHead>
            <TableHead className="w-[120px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="transition-all">
          {loading ? (
            Array(5)
              .fill(null)
              .map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  <TableCell>
                    <Skeleton className="h-4 w-20"></Skeleton>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-16 w-24 rounded-md"></Skeleton>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[250px]"></Skeleton>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-20 rounded-full"></Skeleton>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-4">
                      <Skeleton className="h-8 w-8 rounded-full"></Skeleton>
                      <Skeleton className="h-8 w-8 rounded-full"></Skeleton>
                      <Skeleton className="h-8 w-8 rounded-full"></Skeleton>
                    </div>
                  </TableCell>
                </TableRow>
              ))
          ) : users.length == 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center h-32">
                {" "}
                No users Yet
              </TableCell>
            </TableRow>
          ) : (
            users.map((user, index) => (
              <TableRow
                key={user._id}
                className="animate-in fade-in-50 duration-300 ease-in-out"
              >
                <TableCell className="font-medium whitespace-nowrap">
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell>
                  <div className=" flex justify-center items-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img
                        src={user.photoURL}
                        alt={user.title}
                        onError={(e) => (e.target.src = DEFAULT_PROFILE_IMAGE)}
                        className="h-full w-full object-cover  transition-transform duration-400 hover:scale-125"
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {" "}
                  <div className="hover:scale-120  hover:text-purple-600 transition-all">
                    {user.username}
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className="flex justify-center items-center">
                    <span className="text-white  rounded-full">
                      {user.isAdmin ? (
                        <CheckIcon color="green" />
                      ) : (
                        <X color="red" />
                      )}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="">
                  <div className="flex flex-row gap-4">
                    <button
                      className="p-2 hover:text-purple-300 hover:scale-[125%] hover:bg-slate-500 rounded-full transition-all"
                      onClick={() => {
                        setPostId(user._id);
                        return;
                      }}
                    >
                      <PencilIcon size={18} />
                    </button>

                    <ToolTip text="Delete User">
                      <button
                        className="p-2 hover:text-purple-300 hover:scale-[125%] hover:bg-slate-500 rounded-full transition-all"
                        onClick={() => {
                          setShowModal(true);
                          setUserId(user._id);
                          console.log(user._id);
                        }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </ToolTip>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        {loading ? (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                <div className="flex justify-center items-center w-full">
                  <Skeleton className="w-24 h-10"></Skeleton>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        ) : (
          <TableFooter>
            {hideLoadMore ? (
              ""
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  <Button
                    className=" text-white bg-green-600 hover:bg-green-500"
                    onClick={LoadMoreHandler}
                  >
                    {loadMoreLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Load More"
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        )}
      </Table>
      {showModal ? (
        <Modal
          Heading="Delete User"
          Description="Are you sure you want to permanently delete this User? This action cannot be undone."
          setShowModal={setShowModal}
          onAccept={handleUserDelete}
          type={"delete"}
        ></Modal>
      ) : null}
    </div>
  );
}
