"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Head from "next/head";
import { FaFacebookF, FaGithub, FaGoogle, FaEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { register } from "@/lib/action.user";

const SignIn = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  const [loginError, setLoginError] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isRegistering) {
      setRegisterError("");
      setRegisterSuccess("");

      if (
        registerName === "" ||
        registerEmail === "" ||
        registerPassword === ""
      ) {
        setRegisterError("Name, email, and password must be filled!");
        return;
      }

      try {
        const res = await register(
          loginUsername,
          registerName,
          registerEmail,
          registerPassword
        );
        if (res?.status !== 200) {
          setRegisterError("Register failed! " + res?.status);
        } else {
          setRegisterSuccess("Register successful!");
        }
      } catch (e) {
        if (e instanceof Error && 'errors' in e) {
          setRegisterError("An unexpected error occurred: " + e);
        } else {
          setRegisterError("An unexpected error occurred.");
        }
      }
    } else {
      setLoginError("");
      setLoginSuccess("");

      if (loginUsername === "" || loginPassword === "") {
        setLoginError("Username and password must be filled!");
        return;
      }

      try {
        const res = await signIn("credentials", {
          redirect: false,
          username: loginUsername,
          password: loginPassword,
        });
        if (res?.status === 400) {
          setLoginError("Login failed! " + res.error);
        } else {
          setLoginSuccess("Login successful!");
          window.location.href = "/";
        }
      } catch (err) {
        if (err instanceof Error) {
          setLoginError("An unexpected error occurred: " + err.message);
        } else {
          setLoginError("An unexpected error occurred.");
        }
      }
    }
  };

  const handleRegisterToggle = () => {
    setIsRegistering(!isRegistering);
    if (isRegistering) {
      setRegisterName("");
      setRegisterEmail("");
      setRegisterPassword("");
      setRegisterError("");
      setRegisterSuccess("");
    } else {
      setLoginUsername("");
      setLoginPassword("");
      setLoginError("");
      setLoginSuccess("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <Head>
        <title>{isRegistering ? "Sign Up" : "Sign In"}</title>
      </Head>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-5 sm:px-10 text-center">
        <div
          className={`bg-white rounded-2xl shadow-2xl flex flex-col lg:flex-row w-full max-w-4xl transition-all duration-500 ease-in-out transform ${
            isRegistering ? "min-h-[550px]" : "min-h-[550px]"
          }`}
        >
          <div className="lg:w-3/5 p-5">
            <div className="text-left font-bold">
              <span className="text-green-500">wi</span>gnn
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-green-500 mb-2 transition-all duration-700 ease-in-out">
                {isRegistering ? "Create Account" : "Sign in to Account"}
              </h2>
              <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
              {!isRegistering && (
                <div className="flex justify-center my-2">
                  <a
                    href="#"
                    className="border-2 border-gray-200 rounded-full p-3 mx-1"
                  >
                    <FaFacebookF className="text-sm" />
                  </a>
                  <a
                    href="#"
                    className="border-2 border-gray-200 rounded-full p-3 mx-1"
                  >
                    <FaGithub className="text-sm" />
                  </a>
                  <a
                    href="#"
                    className="border-2 border-gray-200 rounded-full p-3 mx-1"
                  >
                    <FaGoogle className="text-sm" />
                  </a>
                </div>
              )}

              <p className="text-gray-400 my-3 transition-all duration-500 ease-in-out">
                {isRegistering
                  ? "or use your email for registration"
                  : "or use your email"}
              </p>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center"
              >
                {isRegistering && (
                  <div className="transition-all duration-500 ease-in-out transform">
                    <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                      <FaEnvelope className="text-gray-400 m-2" />
                      <input
                        type="text"
                        placeholder="Name"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        className="bg-gray-100 outline-none text-sm flex-1"
                      />
                    </div>
                    <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                      <FaEnvelope className="text-gray-400 m-2" />
                      <input
                        type="email"
                        placeholder="Email"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        className="bg-gray-100 outline-none text-sm flex-1"
                      />
                    </div>
                  </div>
                )}
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <FaEnvelope className="text-gray-400 m-2" />
                  <input
                    type="text"
                    placeholder="Username"
                    className="bg-gray-100 outline-none text-sm flex-1"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <MdLockOutline className="text-gray-400 m-2" />
                  <input
                    type="password"
                    placeholder="Password"
                    className="bg-gray-100 outline-none text-sm flex-1"
                    value={isRegistering ? registerPassword : loginPassword}
                    onChange={(e) =>
                      isRegistering
                        ? setRegisterPassword(e.target.value)
                        : setLoginPassword(e.target.value)
                    }
                  />
                </div>
                {!isRegistering && (
                  <div className="flex justify-between w-64 mb-5">
                    <label className="flex items-center text-xs">
                      <input type="checkbox" className="mr-1" />
                      Remember me
                    </label>
                    <a href="#" className="text-xs">
                      Forgot password?
                    </a>
                  </div>
                )}

                {loginError && (
                  <p className="text-red-500 text-xs">{loginError}</p>
                )}
                {registerError && (
                  <p className="text-red-500 text-xs">{registerError}</p>
                )}
                {loginSuccess && (
                  <p className="text-green-500">{loginSuccess}</p>
                )}
                {registerSuccess && (
                  <p className="text-green-500">{registerSuccess}</p>
                )}
                <button
                  type="submit"
                  className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white transition-all duration-500 ease-in-out transform hover:scale-105"
                >
                  {isRegistering ? "Sign Up" : "Sign In"}
                </button>
              </form>
            </div>
          </div>

          <div className="hidden md:block lg:w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12 transition-transform duration-700 ease-in-out transform">
            <h2 className="text-3xl font-bold mb-2">
              {isRegistering ? "Welcome Back!" : "Hello, Friend!"}
            </h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-2">
              {isRegistering
                ? "To keep connected with us, please login with your personal info."
                : "Fill up personal information and start your journey with us."}
            </p>
            <button
              onClick={handleRegisterToggle}
              className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500 transition-all duration-500 ease-in-out transform hover:scale-105"
            >
              {isRegistering ? "Login" : "Create Account"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
