import React from 'react'
import { Link } from 'react-router-dom';

export default function BlogCard({blog}) {
    const {title,category,image,createdAt,slug} = blog
  return (
    <Link to={`/getPosts/${slug}`}>
      <div className="flex flex-col max-w-md border border-gray-600 shadow-lg rounded-lg ">
        <img src={image} alt={title} className=" " />
        <div className="p-5">
          <h1>{title}</h1>
          <div className="flex justify-between">
            <p>{category}</p>
            <p>{createdAt}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
