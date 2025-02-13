import React from "react";
import { Button } from "./ui/button";

export default function Modal({
  Heading,
  Description,
  onAccept,
  ShowModal,
  setShowModal,
  type,
}) {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50  backdrop-blur-sm flex justify-center items-center "
      onClick={(e) => {
        setShowModal(false);
      }}
    >
      <div
        className="bg-white dark:bg-[#09090b] p-8 rounded-xl shadow-2xl shadow-gray-900/10 dark:shadow-gray-900/20 max-w-md w-full mx-4 border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-3xl hover:scale-105"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl font-bold mb-4 dark:text-white ">{Heading}</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{Description}</p>
        <div className="flex justify-end gap-4">
          <Button onClick={() => setShowModal(false)}> Cancel</Button>
          <Button variant="destructive" className="capitalize" onClick={onAccept}>
            {type}
          </Button>
        </div>
      </div>
    </div>
  );
}
