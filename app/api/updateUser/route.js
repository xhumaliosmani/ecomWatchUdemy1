import connect from "@/utils/config/dbConnection";
import { NextResponse } from "next/server";
import User from "@/utils/models/User";

export async function PUT(req) {
  try {
    await connect();
    const { email, name, newEmail } = await req.json();

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { name, email: newEmail },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User updated successfully",
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        admin: updatedUser.admin,
        profileImage: updatedUser.profileImage,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Error updating user" },
      { status: 500 }
    );
  }
}
