import { diskStorage } from 'multer';

export const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});
// import { diskStorage } from 'multer';
// import * as path from 'path';

// export const storage = diskStorage({
//   destination: (req, file, cb) => {
//     // Set the destination directory for uploaded files
//     cb(null, './uploads');
//   },
//   filename: (req, file, cb) => {
//     // Generate a unique filename for the uploaded file
//     const fileExtension = path.extname(file.originalname);
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     const filename = `${uniqueSuffix}${fileExtension}`;
//     cb(null, filename);
//   },
// });
