import { getServerSession } from 'next-auth/next'
import {NextResponse} from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'
import bcrypt from 'bcryptjs'
import User from '@/utils/models/User'
import connect from '@/utils/config/dbConnection'

export async function POST(req){
    await connect();
    const session = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json({error:"Not authenticated"}, {status: 401})
    }

    const body = await req.json();

    const {currentPassword, newPassword} = body;

    if(!currentPassword || !newPassword) {
         return NextResponse.json(
           { error: "Missing fields" },
           { status: 400 }
         );
    }

    const user = await User.findOne({email: session.user?.email});

    if(!user){
       return NextResponse.json(
         { error: "No user found" },
         { status: 400 }
       );
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if(!isPasswordValid){
         return NextResponse.json({ error: "passwords dosent match" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(user._id, {password: hashedPassword});

    return NextResponse.json({message: "Users password was updated successfully."});

}

