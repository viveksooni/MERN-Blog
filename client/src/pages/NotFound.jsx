import { Separator } from "@/components/ui/separator";
import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <div className="text-5xl">404 | Not Found</div>
      <div className="max-w-xl w-full mt-6">
        <Separator />
      </div>
    </div>
  );
}
