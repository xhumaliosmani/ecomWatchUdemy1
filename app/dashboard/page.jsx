"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen py-20">
      <div className="w-full max-w-2xl grid place-items-center mx-auto py-40 gap-6 bg-scale-50">
        <span className="text-4xl tracking-wide font-semibold capitalize text-slate-800">
          Welcome to the dashboard
        </span>
        {session && (
          <span className="text-2xl tracking-normal py-10 font-semibold">
            {session.user.name}
          </span>
        )}
        <Button
          onClick={() => signOut()}
          variant="myButton"
          className="text-white rounded-lg px-3 py-3 uppercase"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
