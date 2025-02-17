import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import axios from "axios";
import userStore from "../store/userStore";
// import { BsGoogle } from "react-icons/bs";
import OAuth from "../components/OAuth";
import { useToast } from "@/hooks/use-toast";

export default function SignIn() {
  const [textValue, setTextValue] = useState({});
  const {
    loading,
    errorMessage,
    setError,
    signInStart,
    signInFail,
    signInSuccess,
    currentUser
  } = userStore();

  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = errorMessage ? setTimeout(() => setError(null), 10000) : null;
    return () => timer && clearTimeout(timer);
  }, [errorMessage, setError]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.get("redirect") && !currentUser) {
      toast({
        title: "Info",
        description: "Please Login first to access the page",
        variant: "default",
      });
    }
  }, [location]);

  const onChangeHandler = (event) => {
    setTextValue({ ...textValue, [event.target.id]: event.target.value });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      signInStart();
      if (!textValue.email || !textValue.password) {
        signInFail("all fields are required");
        return;
      }
      const response = await axios.post("/api/v1/signin", textValue);
      if (!response) {
        signInFail("something went wrong");
        return;
      }
      signInSuccess(response.data);
      navigate("/");
    } catch (e) {
      signInFail(e.response?.data?.errorMessage || "something went wrong");
    }
  };
  return (
    <>
      <div className="min-h-screen mt-20  flex md:flex-row flex-col">
        <div className=" p-3 md:ml-auto mx-auto md:mx-0 w-full  max-w-md flex flex-col md:mt-24">
          {/* {logo} */}
          <Link to={"/"} className=" font-bold text-4xl dark:text-white">
            <span className="px-1 py-2 bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 rounded-lg text-white">
              Vivek's
            </span>
            Blog
          </Link>

          {/* login text */}
          <p className="text-sm mt-5 text-gray-600 capitalize ">
            Share your thoughts and ideas with the world. Join our community of
            bloggers and readers today!
            <br />
            <br />
            <span className="font-semibold"> Sign-In now</span> to start writing
            your own blog posts.
          </p>
        </div>

        {/* Right */}
        <div className=" p-5 flex flex-col  w-full max-w-md md:mr-auto mx-auto md:mx-0  flex-2 ">
          {/* SignUp form */}
          <form className="flex flex-col mt-2 p-5 w-full max-w-md bg-white dark:bg-black rounded-lg  ">
            <Label value="Email" className="font-semibold"></Label>
            <TextInput
              id="email"
              type="email"
              placeholder="ex. name@gmail.com"
              className="mb-2"
              onChange={onChangeHandler}
            ></TextInput>
            <Label value="Password" className="font-semibold"></Label>
            <TextInput
              id="password"
              type="password"
              placeholder="******"
              className="mb-2"
              onChange={onChangeHandler}
            ></TextInput>
            {errorMessage && (
              <Alert color="red" className="mb-4">
                {errorMessage}
              </Alert>
            )}
            <Button
              outline
              disabled={loading}
              gradientDuoTone="cyanToBlue"
              className="font-semibold"
              onClick={SubmitHandler}
            >
              {loading ? (
                <>
                  <Spinner />
                  <span className="ml-2"> Signing In.....</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth></OAuth>
            <span className="text-sm mt-2">
              Don't have an Account?{" "}
              <Link to="/sign-up" className=" text-blue-600">
                Sign Up here
              </Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
}
