import { diskStorage } from "multer";
import { extname, basename } from "path";

export const multerConfig = {
    storage: diskStorage({
        destination: './public/images',
        filename: (req, file, cb) => {
            const originalName = basename(file.originalname);
            return cb(null, originalName);
        }
    })
}
