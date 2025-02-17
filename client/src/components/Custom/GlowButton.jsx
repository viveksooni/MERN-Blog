import React from "react";
import { Button } from "../ui/button";

export default function GlowButton({ children,className }) {
  return (
    <Button className={` z-50 relative max-w-xl rounded-lg bg-black text-purple-400  border-2 border-purple-400  ease-in duration-300 transition-all hover:text-purple-300 hover:scale-[102%] hover:bg-[#2B1B4D] ${className}`} >
      <div className="z-0 absolute inset-0 shadow-[0_0_1em_0.5em] shadow-purple-600 ease-in duration-300 transition-opacity rounded-lg"></div>
      {children}
    </Button>
  );
}
