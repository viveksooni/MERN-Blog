import React from 'react'
import { Link } from 'react-router-dom';

export default function Logo({size}) {
  return (
    <Link to={"/"} className={`font-bold ${size} dark:text-white`}>
      <span className="px-1 py-2 bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 rounded-lg text-white">
        Vivek's
      </span>
      Blog
    </Link>
  );
}
