import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const data = await req.formData()
    const image =  data.get('image')
    
    if (!image) {
        return NextResponse.json({ "message": "no image found" })
        }
        
        // @ts-ignore
        const byteData = await image.arrayBuffer()
        const buffer = Buffer.from(byteData)
        // @ts-ignore
        const path = `./public/category_images/${image.name}`
        await writeFile(path, buffer)
    return NextResponse.json({"message" : "file uploaded successfully"})
}