import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import userStore from "../store/userStore.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OAuth() {
  const { signInFail, signInSuccess, signInStart } = userStore();
  const navigate = useNavigate("/");

  const OauthHandler = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);

      if (!resultsFromGoogle) {
        signInFail("google sign in failed");
        return;
      }

      const response = await axios.post("/api/v1/google", {
        email: resultsFromGoogle?.user.email,
        username: resultsFromGoogle?.user.displayName,
        photoUrl: resultsFromGoogle?.user.photoURL,
      });

      signInSuccess(response.data);
      navigate("/");
    } catch (e) {
      console.log(e);
      signInFail(e.response?.data?.errorMessage);
    }
  };
  return (
    <Button
      className="font-semibold mt-2"
      gradientDuoTone="pinkToOrange"
      outline
      onClick={OauthHandler}
    >
      Continue with{" "}
      <AiFillGoogleCircle className="w-5 h-6 ml-2"></AiFillGoogleCircle>
    </Button>
  );
}
