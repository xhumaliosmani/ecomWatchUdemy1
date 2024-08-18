import connect from "@/utils/config/dbConnection";
import User from "@/utils/models/User.js";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcryptjs from "bcryptjs";

const DEFAULT_PROFILE_IMAGE =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

async function createUser(email, password, name) {
  const hashedPassword = await bcryptjs.hash(password, 10);
  const newUser = new User({
    email,
    password: hashedPassword,
    name,
    profileImage: DEFAULT_PROFILE_IMAGE,
  });
  return await newUser.save();
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password, name, isRegistering } = credentials;
        try {
          await connect();
          let user = await User.findOne({ email });
          if (isRegistering) {
            if (user) {
              throw new Error("User is already registered");
            }
            user = await createUser(email, password, name);
          } else {
            if (!user) {
              return null;
            }
            const passwordMatch = await bcryptjs.compare(
              password,
              user.password
            );
            if (!passwordMatch) {
              return null;
            }
          }

          //ensure user has profile image
          if (!user.profileImage) {
            user.profileImage = DEFAULT_PROFILE_IMAGE;
            await user.save();
          }
          return user;
        } catch (error) {
          console.log("Error at api/nextauth:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          const { email, name, image } = user;
          await connect();
          let foundUser = await User.findOne({ email });

          if (!foundUser) {
            const newUser = new User({
              email,
              name,
              profileImage: image || DEFAULT_PROFILE_IMAGE,
            });
            foundUser = await newUser.save();
          } else if (
            !foundUser.profileImage ||
            foundUser.profileImage === DEFAULT_PROFILE_IMAGE
          ) {
            foundUser.profileImage = image || DEFAULT_PROFILE_IMAGE;
            await foundUser.save();
          }

          user._id = foundUser._id.toString();
          user.email = foundUser.email;
          user.name = foundUser.name;
          user.notificationPreferences = foundUser.notificationPreferences;
          user.admin = foundUser.admin;
          user.profileImage = foundUser.profileImage;

          console.log("User that logged in:", user);

          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token._id = user._id.toString();
        token.email = user.email;
        token.name = user.name;
        token.notificationPreferences = user.notificationPreferences;
        token.admin = user.admin;
        token.profileImage = user.profileImage;
      }
      if (trigger === "update" && session) {
        token.name = session.user.name;
        token.email = session.user.email;
        token.profileImage = session.user.profileImage || DEFAULT_PROFILE_IMAGE;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user._id = token._id.toString();
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.notificationPreferences = token.notificationPreferences;
        session.user.admin = token.admin;
        session.user.profileImage = token.profileImage;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/"
  }
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};
