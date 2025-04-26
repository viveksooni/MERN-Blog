import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { TagIcon } from "lucide-react";

export default function BlogCard({ blog }) {
  const { title, category, image, createdAt, slug } = blog;
  const navigate = useNavigate();
  return (
    <div className="flex flex-col max-w-md border  dark:shadow-gray-900 shadow-lg  rounded-lg h-[300px] group relative overflow-hidden transition-all animate-in duration-300">
      <div className="md:h-40 h-60 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-3 ">
        <h1 className="text-xl line-clamp-1 capitalize py-2">{title}</h1>
        <div className="flex justify-between">
          <div
            onClick={() => navigate(`search/?category=${category}`)}
            className=" hover:scale-105 duration-150 cursor-pointer absolute top-2 left-2 text-xs bg-black/60  p-2 backdrop:blur-lg font-medium rounded-full"
          >
            <div className="flex items-center gap-1">
              <TagIcon className="h-3 w-3 text-white"></TagIcon>
              <p className="dark:text-white ">{category}</p>
            </div>
          </div>
          <p className="text-xs mt-3 ">
            {new Date(createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
      <div className="">
        <div className="">
          <Button
            onClick={() => navigate(`/getPosts/${slug}`)}
            variant="secondary"
            className="w-full absolute hidden md:block bottom-0 translate-y-full z-20 group-hover:translate-y-0 transition-all duration-300"
          >
            Read More
          </Button>
        </div>

        <Button
          onClick={() => navigate(`/getPosts/${slug}`)}
          variant="secondary"
          className="w-full  md:hidden z-20 transition-all duration-300"
        >
          Read More
        </Button>
      </div>
    </div>
  );
}
