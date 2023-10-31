import Product from "@/models/Product";
import connectDb from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {
        await connectDb();

        const reqData = await request.json()

        const productData = await Product.create(reqData)

        if (productData) {
            return NextResponse.json({
                success: true,
                message: "Oke 1",
            }, { status: 201 })
        }
        else {
            return NextResponse.json({
                success: false,
                message: "Oke 2",
            }, { status: 400 })
        }

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Internal server error",
            error: error
        }, { status: 500 })
    }
}

export const GET = async () => {
    try {
        await connectDb()

        const productData = await Product.find({});

        return NextResponse.json({
            success: true,
            message: "Oke 2",
            data: productData
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Internal server error",
            error: error
        }, { status: 500 })
    }
}