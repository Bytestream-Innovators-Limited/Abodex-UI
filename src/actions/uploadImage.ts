"use server"

import { uploadToCloudinary } from "@/lib/cloudinary"

export const uploadImage = async (img: string) => {
    const url = await uploadToCloudinary(img)

    return {
        status: true,
        image: url
    }
}