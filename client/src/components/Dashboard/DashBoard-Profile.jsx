import React, { useRef, useState, useCallback, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import userStore from "@/store/userStore";
import uploadImageToCloudinary from "@/lib/UploadImageToCloudinary";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import GlowButton from "../Custom/GlowButton";

const DEFAULT_PROFILE_IMAGE = "https://github.com/shadcn.png";
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function ProfileComponent() {
  const fileInputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState(null);
  const { currentUser, setCurrentUser, LogOutSuccess } = userStore();
  const [showPassword, setShowPassword] = useState(false);
  const cleanPhotoUrl = currentUser.photoURL?.split(" ")[0];
  const [modal, setModal] = useState({ isOpen: false, type: null });
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const [updateBody, setUpdateBody] = useState({
    username: currentUser.username || "",
    email: currentUser.email || "",
    photoURL: currentUser.photoURL || "",
    password: "",
  });

  useEffect(() => {
    return () => {
      if (imageUrl && imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const handleLogout = async () => {
    try {
      navigate("/sign-in", { replace: true });
      await axios.post("/api/v1/signout");
      LogOutSuccess();
      toast({
        title: "Success",
        description: `Logged out successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    } finally {
      setModal({ isOpen: false, type: null });
    }
  };

  const handleAccountDelete = async () => {
    if (!currentUser?._id) return;

    try {
      await axios.delete(`/api/v1/delete/${currentUser._id}`);
      navigate("/sign-in", { replace: true });
      setTimeout(() => {
        LogOutSuccess();
      }, 500);
      toast({
        title: "Success",
        description: "Account deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.response?.data?.errorMessage || "Failed to delete account",
        variant: "destructive",
      });
    } finally {
      setModal({ isOpen: false, type: null });
    }
  };

  const validateImage = (file) => {
    if (!file) return "Please select an image";
    if (!ALLOWED_IMAGE_TYPES.includes(file.type))
      return "Please upload a JPEG, PNG or WebP image";
    if (file.size > MAX_FILE_SIZE) return "Image size should be less than 5MB";
    return null;
  };

  const handleImageClick = useCallback(() => {
    if (!loading) {
      fileInputRef.current?.click();
    }
  }, [loading]);

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    try {
      const error = validateImage(imageFile);
      if (error) {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
        return;
      }

      // Cleanup previous object URL
      if (imageUrl && imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }

      const newImageUrl = URL.createObjectURL(imageFile);
      setFile(imageFile);
      setImageUrl(newImageUrl);
      setImgError(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process image",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e) => {
    setUpdateBody((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleProfileUpdate = async () => {
    if (
      !Object.keys(updateBody).some(
        (key) => updateBody[key] !== currentUser[key]
      )
    ) {
      toast({
        title: "Info",
        description: "No changes to update",
      });
      return;
    }

    try {
      setLoading(true);
      let updatedData = { ...updateBody };

      if (file) {
        const cloudinaryUrl = await uploadImageToCloudinary(
          file,
          (progress) => {
            setUploadProgress(progress);
          }
        );

        if (cloudinaryUrl) {
          updatedData.photoURL = cloudinaryUrl;
          setImageUrl(cloudinaryUrl);
        }
      }

      if (!updatedData.password) {
        delete updatedData.password;
      }

      const response = await axios.put(
        `/api/v1/update/${currentUser._id}`,
        updatedData
      );

      setCurrentUser(response.data);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.errorMessage || "Update failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setUploadProgress(0);
      setFile(null);
    }
  };

  const modalConfig = {
    delete: {
      Heading: "Delete Account",
      Description:
        "Are you sure you want to permanently delete your account? This action cannot be undone.",
      onAccept: handleAccountDelete,
    },
    logout: {
      Heading: "Log Out",
      Description: "Are you sure you want to log out from your account?",
      onAccept: handleLogout,
    },
  };

  return (
    <div className="flex m-4 flex-col justify-center items-center gap-6 animate-in fade-in duration-500">
      <h1 className="text-4xl font-semibold my-7">Profile</h1>

      <div className="relative w-40 h-40 self-center shadow-md dark:shadow-white/20 rounded-full group">
        <img
          alt="Profile"
          src={imgError ? DEFAULT_PROFILE_IMAGE : imageUrl || cleanPhotoUrl}
          onError={() => setImgError(true)}
          className={`w-full h-full border-8 border-gray-300 group-hover:border-purple-600 object-cover rounded-full transition-all duration-300 ${
            loading ? "cursor-wait opacity-50" : "cursor-pointer"
          } ${uploadProgress > 0 ? "opacity-50" : ""}`}
          onClick={handleImageClick}
        />
        {uploadProgress > 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full">
            <div className="text-white text-lg font-semibold">
              {uploadProgress}%
            </div>
          </div>
        )}
      </div>

      <Input
        id="picture"
        type="file"
        accept={ALLOWED_IMAGE_TYPES.join(",")}
        ref={fileInputRef}
        className="hidden"
        onChange={handleImageUpload}
        disabled={loading}
      />

      <Input
        className="max-w-xl transition-all duration-300 focus:scale-[1.01]"
        placeholder="Username"
        id="username"
        onChange={handleInputChange}
        value={updateBody.username}
        disabled={loading}
      />

      <Input
        className="max-w-xl transition-all duration-300 focus:scale-[1.01]"
        placeholder="Email"
        type="email"
        id="email"
        onChange={handleInputChange}
        value={updateBody.email}
        disabled={loading}
      />

      <div className="relative w-full max-w-xl">
        <Input
          className="w-full pr-10 transition-all duration-300 focus:scale-[1.01]"
          placeholder="New Password (optional)"
          type={showPassword ? "text" : "password"}
          id="password"
          onChange={handleInputChange}
          value={updateBody.password}
          disabled={loading}
        />
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2"
          onClick={() => setShowPassword(!showPassword)}
          type="button"
        >
          {showPassword ? (
            <Eye className="h-4 w-4 text-gray-500" />
          ) : (
            <EyeClosed className="h-4 w-4 text-gray-500" />
          )}
        </button>
      </div>

      <Button
        className="w-full max-w-xl relative overflow-hidden [&>span]:text-inherit"
        onClick={handleProfileUpdate}
      >
        {loading ? (
          <span className="flex items-center gap-2 ">
            <Loader2 className="h-4 w-4 animate-spin" />
            Updating Profile
          </span>
        ) : (
          "Update Profile"
        )}
      </Button>
      {currentUser.isAdmin && (
        <Link to="/create-post" className="w-full max-w-xl">
        
            <GlowButton className="w-full">Post Blog</GlowButton>
   
        </Link>
      )}

      <div className="flex flex-row justify-between w-full max-w-xl capitalize mt-4">
        <button
          className="text-red-600 hover:text-red-700 transition-colors dark:text-red-400 dark:hover:text-red-300"
          onClick={() => setModal({ isOpen: true, type: "delete" })}
          disabled={loading}
        >
          Delete Account
        </button>
        <button
          className="text-red-600 hover:text-red-700 transition-colors dark:text-red-400 dark:hover:text-red-300"
          onClick={() => setModal({ isOpen: true, type: "logout" })}
          disabled={loading}
        >
          Log Out
        </button>
      </div>

      {modal.isOpen && modal.type && (
        <Modal
          {...modalConfig[modal.type]}
          type={modal.type}
          showModal={modal.isOpen}
          setShowModal={(show) =>
            setModal({ isOpen: show, type: show ? modal.type : null })
          }
        />
      )}
    </div>
  );
}
