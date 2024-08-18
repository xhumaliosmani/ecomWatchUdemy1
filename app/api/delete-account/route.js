import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import connect from "@/utils/config/dbConnection";
import User from "@/utils/models/User";

export async function DELETE() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  await connect();

  try {
    if (!session.user._id) {
      return NextResponse.json(
        { error: "User ID not found in the session" },
        { status: 400 }
      );
    }

    const deletedUser = await User.findByIdAndDelete(session.user._id);
    if (!deletedUser) {
      return NextResponse.json(
        { error: "User ID not found in the session" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Account deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting user account" },
      { status: 500 }
    );
  }
}
