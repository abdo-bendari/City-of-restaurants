import { AppError } from './../utils/Error';
import multer, { FileFilterCallback } from "multer";
import { v4 as uuidv4 } from "uuid";
import { Request } from "express";


// TypeScript types for folderName, fieldName, and arrayOfFields parameters
type FolderName = string;
type FieldName = string;
type ArrayOfFields = { name: string; maxCount?: number }[];

// File upload function with custom storage and filter options
export const fileUpload = (folderName: FolderName) => {
  const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
      cb(null, `uploads/${folderName}`);
    },
    filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
      cb(null, uuidv4() + '-' + file.originalname);
    }
  });

  const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("invalid format", 400));
    }
  };

  const upload = multer({ storage, fileFilter });
  return upload;
};

// Single file upload handler (for fields like imageUrl or logoUrl)
export const uploadSingleFile = (fieldName: FieldName, folderName: FolderName) =>
  fileUpload(folderName).single(fieldName);

// Multiple files upload handler (for fields like imagesUrl)
export const uploadMixFiles = (arrayOfFields: ArrayOfFields, folderName: FolderName) =>
  fileUpload(folderName).fields(arrayOfFields);

