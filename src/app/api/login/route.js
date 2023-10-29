import User from "@/models/User";
import connectDb from "@/utils/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (request) => {

    try {
        await connectDb()

        const { email, password } = await request.json();


        const checkedUser = await User.findOne({ email: email })
        if (!checkedUser) {
            return NextResponse.json({
                success: false,
                message: "Invalid email"
            }, { status: 401 })
        }

        const validPassword = await bcrypt.compare(password, checkedUser.password);
        if (!validPassword) {
            return NextResponse.json({
                success: false,
                message: "Invalid password"
            }, { status: 401 })
        }

        if (checkedUser && validPassword) {
            return NextResponse.json({
                success: true,
                message: "Login successfully"
            }, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Internal server error",
            error: error
        }, { status: 500 })
    }
}