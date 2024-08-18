"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import {
  User as UserIcon,
  Mail,
  ShieldCheck,
  ShoppingBag,
  Heart,
  Settings,
  ChevronRight,
  Edit2,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import toast, { Toaster } from "react-hot-toast";
import OrdersList from "@/components/OrdersList";
import Wishlist from "@/components/Wishlist";
import SettingsComponent from "@/components/Settings";

const ProfilePage = () => {
  const { data: session, update } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    admin: false,
    image: "",
  });
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (session?.user) {
      setProfile({
        name: session.user.name || "",
        email: session.user.email || "",
        admin: session.user.admin || false,
        image: session.user.profileImage || "",
      });
    }
  }, [session]);

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    setIsEditing(false);
    try {
      const res = await axios.put("/api/updateUser", {
        email: profile.email,
        name: profile.name,
        newEmail: profile.email,
      });

      if (res.status === 200) {
        await update({
          ...session,
          user: { ...session?.user, name: profile.name, email: profile.email },
        });
        setProfile((prevProfile) => ({
          ...prevProfile,
          name: profile.name,
          email: profile.email,
        }));
        toast.success("Updated");
      } else {
        toast.error("error");
      }
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const renderProfileContent = () => (
    <Card className="w-full  bg-white shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl">
      <CardHeader className="bg-[#535C91] p-4 sm:p-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Personal Information
        </h2>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl transition-all duration-300 hover:bg-gray-100">
            <UserIcon className="text-[#535C91] w-6 h-6" />
            {isEditing ? (
              <Input
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="flex-grow bg-white border-2 border-[#535C91] focus:border-[#535C91] rounded-lg px-4 py-2 transition-all duration-300"
              />
            ) : (
              <span className="flex-grow text-lg font-medium text-gray-700">
                {profile.name}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl transition-all duration-300 hover:bg-gray-100">
            <Mail className="text-[#535C91] w-6 h-6" />
            {isEditing ? (
              <Input
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="flex-grow bg-white border-2 border-[#535C91] focus:border-[#535C91] rounded-lg px-4 py-2 transition-all duration-300"
              />
            ) : (
              <span className="flex-grow text-lg font-medium text-gray-700">
                {profile.email}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl transition-all duration-300 hover:bg-gray-100">
            <ShieldCheck className="text-[#535C91] w-6 h-6" />
            <span className="flex-grow text-lg font-medium text-gray-700">
              {profile.admin ? "Admin" : "User"}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4 sm:p-6 flex justify-end">
        {isEditing ? (
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-300 hover:from-emerald-700 hover:to-emerald-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>Save Changes</span>
          </Button>
        ) : (
          <Button
            onClick={handleEdit}
            className="bg-[#535C91] text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-300 focus:outline-none"
          >
            <Edit2 className="w-5 h-5" />
            <span>Edit Profile</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );

  const renderWishlistContent = () => <Wishlist />;

  const renderSettingsContent = () => <SettingsComponent />;

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold text-gray-600">
        Loading...
      </div>
    );
  }
  console.log(profile);

  return (
    <div className="container  mx-auto p-4 sm:p-8 min-h-screen">
      <Toaster position="top-right" />
      <div className="flex flex-col lg:flex-row h-full gap-4 sm:gap-8">
        <div className="w-full sm:h-[50rem] lg:w-[35%] bg-white p-4 sm:p-6 rounded-2xl shadow-lg mb-4 lg:mb-0">
          <div className="mb-6 sm:mb-8 text-center">
            <Avatar className="w-24 h-24 sm:w-24 sm:h-24 mx-auto mt-2 mb-4 rounded-full border-4 shadow-lg">
              <AvatarImage
                src={profile.image}
                alt={profile.name}
                className="rounded-full"
              />
              <AvatarFallback className="bg-indigo-500 text-white text-xl sm:text-2xl font-bold">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              {profile.name}
            </h1>
            <p className="text-gray-500 mb-2">{profile.email}</p>
            {profile.admin && (
              <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full">
                Admin
              </span>
            )}
          </div>
          <nav className="space-y-2">
            {[
              { id: "profile", label: "Profile", icon: UserIcon },
              { id: "orders", label: "Orders", icon: ShoppingBag },
              { id: "wishlist", label: "Wishlist", icon: Heart },
              { id: "settings", label: "Settings", icon: Settings },
            ].map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "secondary" : "ghost"}
                className={`w-full justify-start py-2 sm:py-3 px-3 sm:px-4 rounded-xl transition-all duration-300 ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white"
                    : "text-gray-600 hover:bg-indigo-50"
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon
                  className={`mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 ${
                    activeTab === item.id ? "text-white" : "text-indigo-500"
                  }`}
                />
                <span className="font-medium">{item.label}</span>
                <ChevronRight
                  className={`ml-auto h-4 w-4 sm:h-5 sm:w-5 ${
                    activeTab === item.id ? "text-white" : "text-indigo-300"
                  }`}
                />
              </Button>
            ))}
          </nav>
        </div>
        <div className="w-full lg:w-[65%] overflow-y-auto pr-0 lg:pr-4">
          {activeTab === "profile" && renderProfileContent()}
          {activeTab === "orders" && <OrdersList />}
          {activeTab === "wishlist" && renderWishlistContent()}
          {activeTab === "settings" && renderSettingsContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
