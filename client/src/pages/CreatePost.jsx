import GlowButton from "@/components/Custom/GlowButton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useState } from "react";
import { FileInput } from "flowbite-react";
import SlateEditor from "@/components/Custom/Slate";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
export default function CreatePost() {
  const [content, setContent] = useState("");
  return (
    <div className="mx-auto max-w-3xl min-h-screen p-4">
      <h1 className="text-3xl my-7 font-bold text-center">Create Post</h1>
      <form className="flex flex-col gap-4 ">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Input
            type="text"
            required
            placeholder="Title"
            id="title"
            className="flex-1"
          />
          <Select>
            <SelectTrigger className="sm:w-[180px] ">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="border-dotted border-4 border-purple-700 p-4 flex flex-row justify-between items-center gap-8">
          <FileInput></FileInput>
          <GlowButton>Upload file</GlowButton>
        </div>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          className="h-72 mb-12"
          placeholder="Write here...."
        ></ReactQuill>
        <Button className="bg-black text-purple-400  border-2 border-purple-400  ease-in duration-300 transition-all hover:text-purple-300 hover:scale-[102%] hover:bg-black">
          Publish
        </Button>
      </form>
    </div>
  );
}
