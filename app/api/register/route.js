import connect from '@/utils/config/dbConnection';
import User from '@/utils/models/User';
import bcryptjs from 'bcryptjs';
import {NextResponse, NextRequest} from "next/server";

const DEFAULT_PROFILE_IMAGE =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

export async function POST(request){
    try {
        await connect();
        const {name, email, password} = await request.json();
        const user = await User.findOne({email});

        if(user){
            return NextResponse.json({
                error: "User has already an account"
            }, {status: 400});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
          name,
          email,
          password: hashedPassword,
          profileImage: DEFAULT_PROFILE_IMAGE
        });

        const saveUser = await newUser.save();

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            saveUser
        });
        
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}



