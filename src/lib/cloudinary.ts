/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from "@/config";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
    cloud_name: config.CLOUDINARY_NAME,
    api_key: config.CLOUDINARY_API,
    api_secret: config.CLOUDINARY_SECRET,
    secure: config.NODE_ENV === "production"
});

interface UploadOptions {
    use_filename?: boolean;
    unique_filename?: boolean;
    overwrite?: boolean;
    folder?: string;
    [key: string]: any; // Allow additional Cloudinary options
}

/**
 * Uploads a file to Cloudinary
 * @param file The file to upload
 * @param options Additional Cloudinary upload options
 * @returns Promise that resolves with the secure URL of the uploaded file
 * @throws {Error} If the upload fails
 */
export async function uploadToCloudinary(
    file: string,
    options: UploadOptions = {}
): Promise<string> {
    const defaultOptions: UploadOptions = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };

    const mergedOptions = { ...defaultOptions, ...options };

    const result = await cloudinary.uploader.upload(
        file,
        mergedOptions
    );

    if (!result.secure_url) {
        throw new Error("Cloudinary upload succeeded but no URL returned");
    }

    return result.secure_url
}

/**
 * Deletes a file from Cloudinary
 * @param publicId The public ID of the file to delete
 * @returns Promise that resolves when deletion is complete
 * @throws {Error} If the deletion fails
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to delete from Cloudinary: ${error.message}`);
        }
        throw new Error("Unknown error occurred during Cloudinary deletion");
    }
}

// Optional: Export Cloudinary instance if needed elsewhere
export { cloudinary };