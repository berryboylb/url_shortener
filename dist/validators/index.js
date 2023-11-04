"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryDtoSchema = exports.UpdateDto = exports.linkDto = void 0;
const zod_1 = require("zod");
function isValidUrl(url) {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    return urlRegex.test(url);
}
exports.linkDto = zod_1.z.object({
    body: zod_1.z.object({
        originalUrl: zod_1.z
            .string()
            .min(3, { message: "Original URL must have at least three characters" })
            .refine((url) => isValidUrl(url), {
            message: "Original URL is not a valid URL",
        }),
        slug: zod_1.z.string().min(3).optional(),
    }),
});
exports.UpdateDto = zod_1.z.object({
    body: zod_1.z.object({
        originalUrl: zod_1.z
            .string()
            .min(3, { message: "Original URL must have at least three characters" })
            .refine((url) => isValidUrl(url), {
            message: "Original URL is not a valid URL",
        }),
    }),
});
exports.queryDtoSchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.number().int().optional(),
        perPage: zod_1.z.number().int().optional(),
        from: zod_1.z.string().optional(),
        to: zod_1.z.string().optional(),
    }),
});
