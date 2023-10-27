import User from "@/models/User";
import connectDb from "@/utils/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (request) => {

    const { email, password } = await request.json();

    await connectDb()

    try {
        const checkedUser = await User.findOne({ email: email })
        if (!checkedUser) {
            return new NextResponse("Invalid email", { status: 401 })
        }

        const validPassword = await bcrypt.compare(password, checkedUser.password);
        if (!validPassword) {
            return new NextResponse("Invalid password", { status: 401 })
        }

        if (checkedUser && validPassword) {
            return new NextResponse("Login successfully", { status: 200 })
        }
    } catch (error) {
        return new NextResponse(error, { status: 500 })
    }
}