import React, { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import userStore from "@/store/userStore";
import uploadImageToCloudinary from "@/lib/UploadImageToCloudinary";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

export default function ProfileComponent() {
  const setPic = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const { currentUser, setCurrentUser } = userStore();

  const cleanPhotoUrl = currentUser.photoURL?.split(" ")[0];

  const handleImageClick = () => {
    setPic.current.click();
  };

  const handleImageUpload = async (e) => {
    try {
      setLoading(true);
      const imageFile = e.target.files[0];

      if (!imageFile) return;

      if (imageFile.type !== "image/jpeg") {
        toast({
          title: "Error",
          description: "Please upload JPEG image only",
          variant: "destructive",
        });
        return;
      }

      setFile(imageFile);
      // Create local preview
      setImageUrl(URL.createObjectURL(imageFile));

      // Update the form data with the current preview URL
      setUpdateBody((prev) => ({
        ...prev,
        photoURL: URL.createObjectURL(imageFile),
      }));
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to process image",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const [updateBody, setUpdateBody] = useState({
    username: currentUser.username,
    email: currentUser.email,
    photoURL: currentUser.photoURL,
  });

  const valueHandler = (e) => {
    setUpdateBody((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      let updatedData = { ...updateBody };

      if (file) {
        const cloudinaryUrl = await uploadImageToCloudinary(file);
        if (cloudinaryUrl) {
          updatedData.photoURL = cloudinaryUrl;
          setImageUrl(cloudinaryUrl);
        }
      }

      const response = await axios.put(
        `/api/v1/update/:${currentUser._id}`,
        updatedData
      );

      if (response) {
        console.log(response.data);
        setCurrentUser(response.data.updatedUser);
        toast({
          title: "Success",
          description: "Successfully updated profile",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex m-4 flex-col md:col-span-3 justify-center items-center gap-6">
      <h1 className="text-4xl font-semibold my-7">Profile</h1>
      <div className="w-40 h-40 self-center shadow-md dark:shadow-white/20 rounded-full">
        <img
          alt="user photo"
          src={imageUrl || cleanPhotoUrl}
          className={`w-full h-full border-8 border-blue-800 object-cover rounded-full ${
            loading ? "cursor-wait opacity-50" : "cursor-pointer"
          }`}
          onClick={loading ? undefined : handleImageClick}
        />
      </div>

      <Input
        id="picture"
        type="file"
        accept="image/*"
        ref={setPic}
        className="hidden"
        onChange={handleImageUpload}
        disabled={loading}
      />
      <Input
        className="max-w-xl"
        placeholder="Username"
        id="username"
        onChange={valueHandler}
        value={updateBody.username}
        disabled={loading}
      />
      <Input
        className="max-w-xl"
        placeholder="Email"
        type="email"
        id="email"
        onChange={valueHandler}
        value={updateBody.email}
        disabled={loading}
      />
      <Input
        className="max-w-xl"
        placeholder="Password"
        type="password"
        id="password"
        onChange={valueHandler}
        value="********"
        disabled={loading}
      />
      <Button className="" onClick={handleSubmit} disabled={loading}>
        {loading ? "Updating..." : "Update"}
      </Button>

      <div className="flex flex-row justify-between w-full max-w-xl capitalize">
        <div className="text-red-600 cursor-pointer dark:text-red-400">
          Delete User
        </div>
        <div className="text-red-600 cursor-pointer dark:text-red-400">
          Log Out
        </div>
      </div>
    </div>
  );
}
