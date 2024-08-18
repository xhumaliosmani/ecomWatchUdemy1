"use client";
import { Mail, Lock, User, AlertCircle, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

const AnimatedBackground = () => {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad1)" />
      {[...Array(20)].map((_, i) => {
        <motion.circle
          key={i}
          r={Math.random() * 20 + 10}
          fill="#fff"
          initial={{
            opacity: Math.random() * 0.5 + 0.1,
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
          }}
          animate={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />;
      })}
    </svg>
  );
};

const Signup = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //handle the input changes aka when a user is typing something
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  //handle the submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (
        !user.name ||
        !user.email ||
        !user.password ||
        !user.confirmPassword
      ) {
        setError("Please fill in all the fields!");
        return;
      }

      const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

      if (!emailRegex.test(user.email)) {
        setError("Please provide a email adress!");
        return;
      }

      if (user.password !== user.confirmPassword) {
        setError("Please provide matching passwords");
      }

      //register the user

      const res = await axios.post("/api/register", {
        name: user.name,
        email: user.email,
        password: user.password,
      });

      if (res.status === 200 || res.status === 201) {
        console.log("User registered successfully!");

        //sign in the user
        const signInResult = await signIn("credentials", {
          email: user.email,
          password: user.password,
          redirect: false,
        });

        if (signInResult.error) {
          setError("Error signing in");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.error || "An error occured during registration"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      router.push("/");
    }
  }, [status, session, router]);

  return (
    <div className="flex justify-center items-center min-h-screen overflow-hidden bg-blue-100 relative">
      <AnimatedBackground />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Image
            src="/logo.png"
            alt="Logo"
            width={80}
            height={80}
            className="mx-auto mb-4"
          />
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-600">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <div className="relative">
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="John Doe"
                value={user.name}
                onChange={handleInputChange}
                className="pl-10 w-full"
                required
              />
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="you@example.com"
                value={user.email}
                onChange={handleInputChange}
                className="pl-10 w-full"
                required
              />
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="••••••••"
                value={user.password}
                onChange={handleInputChange}
                className="pl-10 pr-10 w-full"
                required
              />
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="••••••••"
                value={user.confirmPassword}
                onChange={handleInputChange}
                className="pl-10 pr-10 w-full"
                required
              />
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm flex items-center"
            >
              <AlertCircle size={16} className="mr-2" />
              {error}
            </motion.div>
          )}

          <Button
            variant="default"
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or sign up with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Button
              onClick={() => signIn("google")}
              className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <FaGoogle className="mr-2" />
              Sign up with Google
            </Button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
