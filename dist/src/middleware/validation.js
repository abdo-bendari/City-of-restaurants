"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation = (schema) => {
    return (req, res, next) => {
        let inputData = {
            ...req.body,
            ...req.params,
            ...req.query,
        };
        if (req.file) {
            const fileField = req.file.fieldname;
            if (["imageUrl", "logoUrl", "profilePic", "imagesUrl"].includes(fileField)) {
                inputData[fileField] = req.file;
            }
        }
        if (req.files) {
            if (Array.isArray(req.files)) {
                // التعامل مع الملفات كمصفوفة
                inputData.files = req.files;
            }
            else {
                // التعامل مع الملفات ككائن يحتوي على مصفوفات ملفات
                Object.entries(req.files).forEach(([field, files]) => {
                    inputData[field] = files;
                });
            }
        }
        const { error } = schema.validate(inputData, { abortEarly: false });
        if (error) {
            res.status(400).json({ message: "Validation error", error });
            return; // تأكيد نوع void
        }
        next(); // تأكيد التوافق مع RequestHandler
    };
};
exports.default = validation;
