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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import axios from "axios";
import uploadImageToCloudinary from "@/lib/UploadImageToCloudinary";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LoaderCircle } from "lucide-react";

import { useNavigate } from "react-router-dom";
export default function CreatePost() {
  const [formData, setFormData] = useState({});
  const [uploadFileLoading, setUploadFileLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      (!formData.title || !formData.content) &&
      (!formData.title === "" || !formData.content === "")
    ) {
      return toast({
        title: "Validation Error",
        description: "Title and content are required",
        variant: "destructive",
        duration: 3000,
      });
    }

    try {
      if (file && !formData.image) {
        toast({
          title: "INFO",
          description:
            "you did not upload the image, please upload image first then try again",
        });
        return;
      }

      const response = await axios.post("/api/v1/post/create-post", formData);
      if (response) {
        toast({
          title: "Success",
          description: "Post Created Successfully",
          variant: "default",
        });
      }

      navigate(`/getPosts/${response.data.slug}`);

      console.log(response);
    } catch (error) {
      const errorMessage =
        error.response?.data?.errorMessage || "something went wrong";
      const errorTitle = error.response?.data?.title || "Error";

      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
      });
    }
  };
  const handleCategoryChange = (value) => {
    setFormData({ ...formData, category: value });
  };
  const handleImageUpload = async (e) => {
    e.preventDefault();

    try {
      setUploadFileLoading(true);
      let imgUrl;
      if (file) {
        imgUrl = await uploadImageToCloudinary(file);

        setFormData({ ...formData, image: imgUrl });
        toast({
          title: "Success",
          description: "Image uploaded successfully",
        });
      } else {
        toast({
          title: "Warning!!",
          description: "Please upload a picture first",
          variant: "destructive",
        });
      }
    } catch (e) {
      const errorMessage =
        error.response?.data?.errorMessage || "something went wrong";
      const errorTitle = error.response?.data?.title || "Error";

      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setUploadFileLoading(false);
    }
  };
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
            className="flex-1 transition-all duration-300 focus:scale-[1.01]"
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
          />
          <Select onValueChange={handleCategoryChange}>
            <SelectTrigger className="sm:w-[180px] ">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="React">React</SelectItem>
                <SelectItem value="JavaScript">JavaScript</SelectItem>
                <SelectItem value="NextJs">NextJs</SelectItem>
                <SelectItem value="How To">How To</SelectItem>
                <SelectItem value="NodeJs">NodeJs</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="border-dotted border-4 border-purple-700 p-4 flex flex-row justify-between items-center gap-8 transition-all duration-300 rounded-lg hover:scale-[1.01]" onDragOver={()=>{e.preventDefault()}}>
          <FileInput
            accept="image/*"
            onChange={(e) => {
              const localFile = e.target.files[0];
              const localFileUrl = URL.createObjectURL(localFile);
              setFileUrl(localFileUrl);
              console.log(localFile);
              setFile(localFile);
            }}
          ></FileInput>
          <div onClick={handleImageUpload}>
            <GlowButton>
              {uploadFileLoading ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                "Upload file"
              )}
            </GlowButton>
          </div>
        </div>
        <div className="mt-2">
          {file && (
            <div className="relative overflow-hidden rounded-md border border-purple-400">
              <img
                src={fileUrl}
                alt="Preview"
                className="max-h-64 w-auto object-contain mx-auto"
              />
            </div>
          )}
        </div>
        <div className="transition-all duration-300 hover:scale-[1.01]">
          <ReactQuill
            theme="snow"
            onChange={(value) => {
              setFormData({ ...formData, content: value });
            }}
            className="h-72 mb-12 "
            placeholder="Write here...."
          ></ReactQuill>
        </div>
        <Button
          disabled={uploadFileLoading}
          className="bg-black text-purple-400  border-2 border-purple-400  ease-in duration-300 transition-all hover:text-purple-300 hover:scale-[102%] hover:bg-black"
          onClick={handleSubmit}
        >
          Publish
        </Button>
      </form>
    </div>
  );
}
