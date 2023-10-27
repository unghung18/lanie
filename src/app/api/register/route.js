import User from "@/models/User";
import connectDb from "@/utils/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (request) => {

    const { name, email, password } = await request.json();

    await connectDb()

    const checkedUser = await User.findOne({ email: email });

    if (checkedUser) {
        return new NextResponse("Email already taken", { status: 422 })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        await User.create({
            name: name,
            email: email,
            password: hashedPassword
        })
        return new NextResponse("User created successfully", { status: 201 })
    } catch (error) {
        return new NextResponse(error, { status: 500 })
    }
}