import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import toast from "react-hot-toast";
import { User, Lock, Bell, XCircle } from "lucide-react";

const Settings = () => {
  const { data: session, update } = useSession();
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [communicationPrefs, setCommunicationPrefs] = useState({
    orderUpdates: false,
    promotions: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [preferencesChanged, setPreferencesChanged] = useState(false);

  useEffect(() => {
    try {
      const fetchUserData = async () => {
        const res = await axios.get("/api/user-data");
        const userData = res.data;
        setPersonalInfo({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
        });
      };
    } catch (error) {
      console.log(error);
    }
    fetchUserData();
  }, []);

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.targer.value });
  };

  const handleCommunicationPrefsChange = (e) => {
    setCommunicationPrefs((prev) => {
      const newPref = { ...prev, [key]: !prev[key] };
      setPreferencesChanged(true);
      return newPref;
    });
  };

  const changePassword = async () => {
    if (password.new !== password.confirm) {
      toast.error("Enter the same password twice");
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post("/api/change-password", {
        currentPassword: password.current,
        newPassword: password.new,
      });
      toast.success("password has been changed");
      setShowPasswordForm(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveNotificationPreferences = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "/api/update-notification-preferences",
        communicationPrefs
      );
      if (res.status === 200) {
        await update({
          ...session,
          user: {
            ...session?.user,
            notificationPreferences: communicationPrefs,
          },
        });
        setPreferencesChanged(false);
      } else {
        throw new Error("failed to update preferences");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want do DELETE your account. This is not Recoverable!"
      )
    ) {
      setIsLoading(true);
      try {
        const res = await axios.delete("/api/delete-account");
        if (res.status === 200) {
          toast.success("Account deleted");
          signOut({ callbackUrl: "/" });
        } else {
          throw new Error("Failed to delete account");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <style jsx>{`
        @media (max-width: 639px) {
          .tab-text {
            display: none;
          }
        }
      `}</style>
      <Card className="w-full max-w-4xl mx-auto shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl">
        <CardHeader className="bg-gradient-to-r from-[#3a4063] to-[#535C91] p-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Account Settings
          </h2>
        </CardHeader>
        <Tabs defaultValue="personal-info" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-2">
            <TabsTrigger
              value="personal-info"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center justify-center py-2"
            >
              <User className="w-5 h-5 mr-2" />
              <span className="tab-text">Personal Info</span>
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center justify-center py-2"
            >
              <Lock className="w-5 h-5 mr-2" />
              <span className="tab-text">Security</span>
            </TabsTrigger>
            <TabsTrigger
              value="preferences"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center justify-center py-2"
            >
              <Bell className="w-5 h-5 mr-2" />
              <span className="tab-text">Preferences</span>
            </TabsTrigger>
            <TabsTrigger
              value="close-account"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center justify-center py-2"
            >
              <XCircle className="w-5 h-5 mr-2" />
              <span className="tab-text">Terminate</span>
            </TabsTrigger>
          </TabsList>

          <CardContent className="p-6">
            <TabsContent value="personal-info">
              <h3 className="text-xl font-semibold mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <Input
                    value={personalInfo.name}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    value={personalInfo.email}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                To update your personal information, please contact customer
                support or go to <span className="font-bold">Profile</span>{" "}
                section.
              </p>
            </TabsContent>

            <TabsContent value="security">
              <h3 className="text-xl font-semibold mb-4">Security Settings</h3>
              <div className="relative">
                {!showPasswordForm ? (
                  <div
                    className="border border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => setShowPasswordForm(true)}
                  >
                    Click to update password
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Input
                      name="current"
                      value={password.current}
                      onChange={handlePasswordChange}
                      placeholder="Current Password"
                      type="password"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        name="new"
                        value={password.new}
                        onChange={handlePasswordChange}
                        placeholder="New Password"
                        type="password"
                      />
                      <Input
                        name="confirm"
                        value={password.confirm}
                        onChange={handlePasswordChange}
                        placeholder="Confirm New Password"
                        type="password"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <Button
                        onClick={changePassword}
                        className="border bg-slate-100"
                        disabled={isLoading}
                      >
                        {isLoading ? "Changing Password..." : "Change Password"}
                      </Button>
                      <Button
                        onClick={() => setShowPasswordForm(false)}
                        className="text-gray-500 hover:text-gray-700"
                        variant="ghost"
                      >
                        Cancel
                      </Button>
                    </div>
                    <p className="text-xs">
                      Note: If you are logging in using Google or any other
                      external provider you cant change the password!
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="preferences">
              <h3 className="text-xl font-semibold mb-4">
                Notification Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-sm font-medium text-gray-700">
                    Receive order updates
                  </span>
                  <Switch
                    checked={communicationPrefs.orderUpdates}
                    onCheckedChange={() =>
                      handleCommunicationPrefsChange("orderUpdates")
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-sm font-medium text-gray-700">
                    Receive promotional emails
                  </span>
                  <Switch
                    checked={communicationPrefs.promotions}
                    onCheckedChange={() =>
                      handleCommunicationPrefsChange("promotions")
                    }
                  />
                </div>
                {preferencesChanged && (
                  <Button
                    onClick={saveNotificationPreferences}
                    className="mt-4 w-full md:w-auto bg-[#535C91] text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                )}
              </div>
            </TabsContent>

            <TabsContent value="close-account">
              <h3 className="text-xl font-semibold mb-4 text-red-600">
                Close Account
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                Closing your account is permanent. All your data will be
                permanently deleted.
              </p>
              <Button
                variant="destructive"
                onClick={deleteAccount}
                className="w-full md:w-auto"
                disabled={isLoading}
              >
                {isLoading ? "Deleting Account..." : "Close Account"}
              </Button>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </>
  );
};

export default Settings;
