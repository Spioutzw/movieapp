import multer from 'multer'
import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import stream from 'stream/promises'



export async function POST(request) {
    const data = await request.formData()
    const file = data.get('file')
    const fileName = uuidv4() + '.png'
    const destination = fs.createWriteStream('public/assets/' + fileName)
    await stream.pipeline(file.stream(), destination)
    const imageUrl = `/assets/${fileName}`

    return NextResponse.json({ url: imageUrl })
  
}
