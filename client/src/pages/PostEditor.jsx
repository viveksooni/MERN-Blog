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
import React, { useEffect, useState } from "react";
import { FileInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import axios from "axios";
import uploadImageToCloudinary from "@/lib/UploadImageToCloudinary";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import userStore from "@/store/userStore";

export default function PostEditor() {
  const { postId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
  });
  const [loading, setLoading] = useState(!!postId);
  const { currentUser } = userStore();
  const [uploadFileLoading, setUploadFileLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      if (!postId) return;

      try {
        setLoading(true);
        console.log("Fetching post with ID:", postId);
        const response = await axios.get(`/api/v1/post/postId/${postId}`);
        console.log("API Response:", response.data);

        if (response.data) {
          // Create a new object with the API data, ensuring all fields exist with fallbacks
          const postData = {
            title: response.data.title || "",
            content: response.data.content || "",
            category: response.data.category || "",
            image: response.data.image || "",
          };

          console.log("Setting form data:", postData);

          // Completely replace formData with the new object
          setFormData(postData);
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
        toast({
          title: "Error",
          description: "Failed to fetch post details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [postId, toast]);

  const handleUpdate = async () => {
    try {
      // Validation
      if (!formData.title.trim() || !formData.content.trim()) {
        return toast({
          title: "Validation Error",
          description: "Title and content are required",
          variant: "destructive",
          duration: 3000,
        });
      }

      const response = await axios.put(
        `/api/v1/post/edit-post/${postId}/${currentUser._id}`,
        formData
      );

      if (response.data) {
        navigate(`/getPosts/${response.data.slug}`);
        toast({ title: "Post updated successfully" });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: error.response?.data?.errorMessage || "Update failed",
        variant: "destructive",
      });
    }
  };

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();

    try {
      if (!file) {
        return toast({
          title: "Warning",
          description: "Please upload a picture first",
          variant: "destructive",
        });
      }

      setUploadFileLoading(true);
      const imgUrl = await uploadImageToCloudinary(file);

      setFormData((prev) => ({ ...prev, image: imgUrl }));
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.errorMessage || "Something went wrong";
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

  // Debug output to see what's in formData
  console.log("Current formData:", formData);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl min-h-screen p-4">
      <h1 className="text-3xl my-7 font-bold text-center">
        {postId ? "Update Post" : "Create Post"}
      </h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Input
            type="text"
            required
            value={formData.title}
            placeholder="Title"
            id="title"
            className="flex-1"
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, title: e.target.value }));
            }}
          />
          <Select
            onValueChange={handleCategoryChange}
            value={formData.category}
            defaultValue=""
          >
            <SelectTrigger className="sm:w-[180px]">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="React">React</SelectItem>
                <SelectItem value="JavaScript">JavaScript</SelectItem>
                <SelectItem value="NextJs">NextJs</SelectItem>
                <SelectItem value="How To">How To</SelectItem>
                <SelectItem value="NodeJs">NodeJs</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="border-dotted border-4 border-purple-700 p-4 flex flex-row justify-between items-center gap-8">
          <FileInput
            accept="image/*"
            onChange={(e) => {
              const localFile = e.target.files[0];
              if (localFile) {
                const localFileUrl = URL.createObjectURL(localFile);
                setFileUrl(localFileUrl);
                setFile(localFile);
              }
            }}
          />
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
          {(file || formData.image) && (
            <div className="relative overflow-hidden rounded-md border border-purple-400">
              <img
                src={file ? fileUrl : formData.image}
                alt="Preview"
                className="max-h-64 w-auto object-contain mx-auto"
              />
            </div>
          )}
        </div>
        <ReactQuill
          theme="snow"
          value={formData.content}
          onChange={(value) => {
            setFormData((prev) => ({ ...prev, content: value }));
          }}
          className="h-72 mb-12"
          placeholder="Write here...."
        />
        <Button
          disabled={uploadFileLoading}
          className="bg-black text-purple-400 border-2 border-purple-400 ease-in duration-300 transition-all hover:text-purple-300 hover:scale-[102%] hover:bg-black"
          onClick={handleUpdate}
        >
          {postId ? "Update" : "Create"}
        </Button>
      </form>
    </div>
  );
}
