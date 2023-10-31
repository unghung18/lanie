import User from "@/models/User";
import connectDb from "@/utils/db";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        Credentials({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                try {
                    await connectDb();
                    const { email, password } = credentials;

                    const userData = await User.findOne({ email: email })

                    if (!userData) {
                        return null
                    }

                    const validPassword = await bcrypt.compare(password, userData.password);

                    if (!validPassword) {
                        return null
                    }

                    return userData
                } catch (error) {
                    throw new Error(error);
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }