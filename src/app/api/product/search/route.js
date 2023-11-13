import Product from "@/models/Product";
import connectDb from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {
        await connectDb();

        const { searchParams } = new URL(request.url);

        const data = await Product.find({
            $and: [
                { tag: { $regex: searchParams.get("query") ? searchParams.get("query") : "" } },
                { tag: { $regex: searchParams.get("category") ? searchParams.get("category") : "" } },
                searchParams.get("color") ? { color: { $all: [searchParams.get("color")] } } : {},
                searchParams.get("size") ? { size: { $all: [searchParams.get("size")] } } : {},
                { price: { $gte: searchParams.get("price") ? searchParams.get("price").split(":")[0] : 0, $lte: searchParams.get("price") ? searchParams.get("price").split(":")[1] : 10000000 } }
            ]
        })

        return NextResponse.json({
            success: true,
            message: "Oke",
            data: data
        }, { status: 200 })


    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Internal server error",
            error: error
        }, { status: 500 })
    }
}