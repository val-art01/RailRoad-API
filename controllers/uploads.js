import multer from 'multer';
import sharp from 'sharp';

const upload = multer({ storage: multer.memoryStorage() });

export const handleFileUpload = async (file) => {
    try {
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        const fileExtension = file.originalname.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            throw new Error('Invalid image file extension. Supported extensions are jpg, jpeg, and png.');
        }

        const maxSizeInBytes = 200 * 1024 * 1024;
        if (file.size > maxSizeInBytes) {
            const resizedImageBuffer = await sharp(file.buffer)
                .resize(200, 200)
                .toBuffer();
            return resizedImageBuffer;
        }
        return file.buffer;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}

export const uploadImg = upload.single('image');