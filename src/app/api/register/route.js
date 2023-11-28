import User from "@/models/User";
import connectDb from "@/utils/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {
        await connectDb()

        const { name, email, password } = await request.json();


        const checkedUser = await User.findOne({ email: email });

        if (checkedUser) {
            return NextResponse.json({
                success: false,
                message: "Tài khoản đã được đăng ký !!!",
            }, { status: 422 })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        })
        return NextResponse.json({
            success: true,
            message: "User created successfully",
            data: userData
        }, { status: 201 })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Internal server error",
            error: error
        }, { status: 500 })
    }
}