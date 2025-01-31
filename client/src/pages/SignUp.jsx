import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import axios from "axios";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [textValue, setTextValue] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const onChangeHandler = (event) => {
    setTextValue({ ...textValue, [event.target.id]: event.target.value });
    console.log(textValue);
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(textValue);
      if (!textValue.username || !textValue.email || !textValue.password) {
        setError("All fields are required");
        return;
      }
      const response = await axios.post("/api/v1/signup", textValue);
      console.log(response);
      response.data && navigate("/sign-in");
    } catch (e) {
      setError(e.response.data.errorMessage || "something went wrong");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen mt-20  flex md:flex-row flex-col">
      <div className=" p-3 md:ml-auto mx-auto md:mx-0 w-full  max-w-md flex flex-col md:mt-24  ">
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
          <span className="font-semibold"> Sign Up now</span> to start writing
          your own blog posts.
        </p>
      </div>

      {/* Right */}
      <div className=" p-5 flex flex-col  w-full max-w-md md:mr-auto mx-auto md:mx-0  flex-2 ">
        {/* SignUp form */}
        <form className="flex flex-col mt-2 p-5 w-full max-w-md bg-white dark:bg-black  rounded-lg  ">
          <Label value="User Name" className="font-semibold"></Label>
          <TextInput
            id="username"
            type="text"
            placeholder="ex. Vivek"
            className="mb-2"
            onChange={onChangeHandler}
          ></TextInput>
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
            placeholder="!@#$%^&*"
            className="mb-2"
            onChange={onChangeHandler}
          ></TextInput>
          {error && (
            // <span className="text-red-500 text-sm font-semibold mb-2">{error}</span>
            <Alert color="red" className="mb-4">
              {error}
            </Alert>
          )}
          <Button
            outline
            gradientDuoTone="cyanToBlue"
            className="font-semibold"
            onClick={SubmitHandler}
          >
            {loading ? (
              <>
                <Spinner />
                <span className="ml-2"> Signing Up.....</span>
              </>
            ) : (
              "Sign Up"
            )}
          </Button>

          <OAuth></OAuth>
          <span className="text-sm mt-2">
            Already have an account?{" "}
            <Link to="/sign-in" className=" text-blue-600">
              Sign In here
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
