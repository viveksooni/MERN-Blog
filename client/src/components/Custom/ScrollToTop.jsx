import userStore from "@/store/userStore";
import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useToast } from "@/hooks/use-toast";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const { currentUser, LogOutSuccess } = userStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check token expiration
  useEffect(() => {
    const checkToken = () => {
      const token = Cookies.get("access_token");
      console.log(token);
      if (!token && currentUser) {
        LogOutSuccess();
       
        toast({
          title: "Session Expired",
          description: "Please sign in again",
          variant: "destructive",
        });
      }
    };

 
    checkToken();


    const interval = setInterval(checkToken, 1000 * 60); // Check every minute

    return () => clearInterval(interval);
  }, []);

 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
