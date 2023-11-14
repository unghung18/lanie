import connectDb from "@/utils/db";
import { NextResponse } from "next/server";
import Collection from "@/models/Collection";
import Product from "@/models/Product";

export const POST = async (request) => {
    try {
        await connectDb();

        const reqData = await request.json()

        const collectionData = await Collection.create(reqData)

        if (collectionData) {
            return NextResponse.json({
                success: true,
                message: "Thêm thành công",
            }, { status: 201 })
        }
        else {
            return NextResponse.json({
                success: false,
                message: "Thêm thất bại",
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

        const collectionData = await Collection.find().populate({ path: 'products', model: Product })

        return NextResponse.json({
            success: true,
            message: "Oke",
            data: collectionData
        }, { status: 201 })

    } catch (error) {

        return NextResponse.json({
            success: false,
            message: "Internal server error",
            error: error
        }, { status: 500 })
    }
}