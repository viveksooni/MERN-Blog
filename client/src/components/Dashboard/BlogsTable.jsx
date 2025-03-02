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
import { useState } from "react";

export function BlogsTable({ blogs, loading, setBlogs, totalBlogs }) {
  const { currentUser } = userStore();
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [blogsLength, setBlogsLength] = useState(9);
  const [hideLoadMore, setHideLoadMore] = useState(false);
  const LoadMoreHandler = async () => {
    try {
      setLoadMoreLoading(true);
      const response = await axios.get(
        `/api/v1/post/getPosts?userId=${currentUser._id}&startIndex=${blogsLength}`
      );
      if (response.statusText == "OK") {
        const updatedBlogsList = [...blogs, ...response.data.posts];
        setBlogsLength(updatedBlogsList.length);
        setBlogs(updatedBlogsList);
        if (totalBlogs == updatedBlogsList.length) {
          setHideLoadMore(true);
        }
        console.log(blogs);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoadMoreLoading(false);
    }
  };
  return (
    <Table>
      <TableCaption>A list of your blogs. [ {blogsLength} ]</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-center">Date Updated</TableHead>
          <TableHead className="w-[100px] text-center">Post Image</TableHead>
          <TableHead>Post Title</TableHead>
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
            <TableCell colSpan={5} className="text-center h-32">
              {" "}
              No Blogs found
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
                <Link to={`/getPosts/${blog.slug}`}>
                  <div className="h-16 w-24 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="h-full w-full object-scale-down  transition-transform hover:scale-125"
                    />
                  </div>
                </Link>
              </TableCell>
              <TableCell>
                {" "}
                <Link
                  to={`/getPosts/${blog.slug}`}
                  className="hover:scale-120  hover:text-purple-600 transition-all"
                >
                  {blog.title}
                </Link>
              </TableCell>
              <TableCell>
                <span className="bg-purple-600 text-white p-1 rounded-full text-xs font-medium px-2">
                  {blog.category}
                </span>
              </TableCell>
              <TableCell className=" ">
                <div className="flex flex-row gap-4">
                  <button className="p-2 hover:text-purple-300 hover:scale-[125%] hover:bg-slate-500 rounded-full transition-all">
                    <EyeIcon size={18} />
                  </button>
                  <button className="p-2 hover:text-purple-300 hover:scale-[125%] hover:bg-slate-500 rounded-full transition-all">
                    <PencilIcon size={18} />
                  </button>
                  <button className="p-2 hover:text-purple-300 hover:scale-[125%] hover:bg-slate-500 rounded-full transition-all">
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
            <TableCell colSpan={5} className="text-center">
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
              <TableCell colSpan={5} className="text-center">
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
  );
}
