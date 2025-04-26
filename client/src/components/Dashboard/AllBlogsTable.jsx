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
import {
  EyeIcon,
  Loader2,
  LoaderCircle,
  LucidePersonStanding,
  PencilIcon,
  SplineIcon,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import axios from "axios";
import userStore from "@/store/userStore";
import { useEffect, useState } from "react";
import Modal from "../Modal";

import { toast } from "@/hooks/use-toast";

export function AllBlogsTable({
  blogs,
  loading,
  setBlogs,
  totalBlogs,
  setTotalBlogs,
}) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userIds = blogs.map((blog) => blog.userId);

      const uniqueUserIds = [...new Set(userIds)];
      const newUserData = {};

      for (const userId of uniqueUserIds) {
        try {
          const response = await axios.get(`/api/v1/user/${userId}`);
          console.log(response);
          newUserData[userId] = response.data;
          console.log(newUserData);
        } catch (e) {
          console.log(e);
          newUserData[userId] = null;
        }
      }
      setUserData((prev) => ({ ...prev, ...newUserData }));
    };
    fetchUser();
  }, [blogs]);
  const handlePostDelete = async () => {
    try {
      const response = await axios.delete(
        `/api/v1/post/delete-post/${postId}/${currentUser._id}`
      );
      if (response.statusText === "OK") {
        setBlogs((prev) => prev.filter((post) => post._id != postId));
        setTotalBlogs(response.data.totalPost);
        toast({
          title: "post deleted successfully",
        });
      }
    } catch (e) {
      console.log(e);
      toast({ title: "post was not deleted", variant: "destructive" });
    } finally {
      setShowModal(false);
    }
  };

  const [postId, setPostId] = useState(null);

  const { currentUser } = userStore();
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [blogsLength, setBlogsLength] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [hideLoadMore, setHideLoadMore] = useState(blogs.length < totalBlogs);

  const LoadMoreHandler = async () => {
    try {
      setLoadMoreLoading(true);
      const response = await axios.get(
        `/api/v1/post/getPosts?userId=${currentUser._id}&startIndex=${blogs.length}&limit=3`
      );
      if (response.statusText == "OK") {
        const updatedBlogsList = [...blogs, ...response.data.posts];
        setBlogsLength(updatedBlogsList.length);
        setBlogs(updatedBlogsList);
        if (updatedBlogsList.length >= totalBlogs) {
          console.log(`blog are ${blogs.length}`);
          setHideLoadMore(true);
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoadMoreLoading(false);
    }
  };
  return (
    <div>
      <Table>
        <TableCaption>
          A list of your blogs. [ {blogs.length} ] total are [ {totalBlogs} ]
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">
              Date Updated
            </TableHead>
            <TableHead className="w-[100px] text-center">Post Image</TableHead>

            <TableHead>Post Title</TableHead>
            <TableHead>Posted by</TableHead>
            <TableHead className="w-[120px] text-center">Category</TableHead>
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
          ) : blogs.length == 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center h-32">
                {" "}
                No Blogs Yet
              </TableCell>
            </TableRow>
          ) : (
            blogs.map((blog, index) => (
              <TableRow
                key={blog._id}
                className="animate-in fade-in-50 duration-300 ease-in-out"
              >
                <TableCell className="font-medium whitespace-nowrap">
                  {new Date(blog.updatedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="h-16 w-24 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="h-full w-full object-scale-down  transition-transform hover:scale-125"
                    />
                  </div>
                </TableCell>

                <TableCell>
                  {" "}
                  <div className="hover:scale-120  hover:text-purple-600 transition-all">
                    {blog.title}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="hover:scale-120  hover:text-purple-600 transition-all">
                    {userData && userData[blog?.userId]?.user?.username}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="bg-purple-600 text-white p-1 rounded-full text-xs font-medium px-2">
                    {blog.category}
                  </span>
                </TableCell>
                <TableCell className=" ">
                  <div className="flex flex-row gap-4">
                    <Link to={`/getPosts/${blog.slug}`}>
                      <button className="p-2 hover:text-purple-300 hover:scale-[125%] hover:bg-slate-500 rounded-full transition-all">
                        <EyeIcon size={18} />
                      </button>
                    </Link>
                    <Link to={`/edit-post/${blog._id}`}>
                      <button
                        className="p-2 hover:text-purple-300 hover:scale-[125%] hover:bg-slate-500 rounded-full transition-all"
                        onClick={() => {
                          setPostId(blog._id);
                          return;
                        }}
                      >
                        <PencilIcon size={18} />
                      </button>
                    </Link>
                    <button
                      className="p-2 hover:text-purple-300 hover:scale-[125%] hover:bg-slate-500 rounded-full transition-all"
                      onClick={() => {
                        setShowModal(true);
                        setPostId(blog._id);
                        console.log(blog._id);
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
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
          Heading="Delete Post"
          Description="Are you sure you want to permanently delete this post? This action cannot be undone."
          setShowModal={setShowModal}
          onAccept={handlePostDelete}
          type={"delete"}
        ></Modal>
      ) : null}
    </div>
  );
}
