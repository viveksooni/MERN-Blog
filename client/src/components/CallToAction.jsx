import React from "react";
import { Button } from "./ui/button";

export default function CallToAction() {
  
  return (
    <div className="flex flex-col md:flex-row mb-10 items-center border-2 border-gray-200 p-5 rounded-tl-md rounded-br-md mx-auto mt-10">
      <div className="mb-2 md:mb-0 flex flex-col   p-5 gap-3 flex-1">
        <h1 className="text-2xl font-semibold capitalize text-foreground">
          Get started with Next.js
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed my-4">
          Next.js gives you the best developer experience with all the features
          you need for production: hybrid static & server rendering, TypeScript
          support, smart bundling, route pre-fetching, and more. No config
          needed.
        </p>
        <Button className="w-fit mx-auto md:mx-0">Start Learning</Button>
      </div>
      <div className="flex-1 p-3">
        <img
          className=" flex-1 w-full h-auto border-2 border-white rounded-tr-3xl  rounded-bl-3xl"
          src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*KDMx1YspSrBcFJG-NDZgDg.png"
          alt="nextjs"
        />
      </div>
    </div>
  );
}
