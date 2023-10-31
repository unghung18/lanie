import Product from "@/models/Product";
import connectDb from "@/utils/db";
import { NextResponse } from "next/server";
export const GET = async () => {
    try {
        await connectDb()

        const productData = await Product.find({}).sort({ updatedAt: -1 }).limit(8);
        return NextResponse.json({
            success: true,
            message: "Oke 2",
            data: productData
        }, { status: 201 })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Internal server error",
            error: error
        }, { status: 500 })
    }
}