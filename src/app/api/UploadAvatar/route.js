import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dmzr4omwv',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


export async function POST(request) {

    try {
        const data = await request.formData()
        const file = data.get('file')
        const buffer = await file.arrayBuffer()
        const result = await cloudinary.uploader.upload(`data:${file.type};base64,${Buffer.from(buffer).toString('base64')}`)
        const imageUrl = result.secure_url

        return NextResponse.json({ url: imageUrl })

    } catch (error) {
        // Handle the error here
        console.error(error)
    }


}
