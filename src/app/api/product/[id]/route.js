import Product from "@/models/Product";
import connectDb from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request, { params }) => {
    try {
        await connectDb();

        const { id } = await params;

        const productData = await Product.findById(id);

        if (!productData) {
            return NextResponse.json({
                success: false,
                message: "Product not founded",
            }, { status: 400 })
        }

        return NextResponse.json({
            success: true,
            message: "Oke",
            data: productData
        }, { status: 200 })


    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Internal server error",
            error: error
        }, { status: 500 })
    }
}