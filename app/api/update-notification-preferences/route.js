import connect from "@/utils/config/dbConnection";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/utils/models/User";

export async function POST(req) {
  await connect();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ canReview: false }, { status: 200 });
  }

  const body = await req.json();
  const { orderUpdates, promotions } = body;

  try {
    const user = await User.findOneAndUpdate(
      {
        email: session.user.email,
      },
      {
        $set: {
          "notificationPreferences.orderUpdates": orderUpdates,
          "notificationPreferences.promotions": promotions,
        },
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }
    return NextResponse.json({
      message: "preferences updated",
      preferences: user.notificationPreferences,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "internal server error at the update preferences route" },
      { status: 500 }
    );
  }
}
