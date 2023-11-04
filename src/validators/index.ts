import { z } from "zod";

function isValidUrl(url: string): boolean {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  return urlRegex.test(url);
}

export const linkDto = z.object({
  body: z.object({
    originalUrl: z
      .string()
      .min(3, { message: "Original URL must have at least three characters" })
      .refine((url) => isValidUrl(url), {
        message: "Original URL is not a valid URL",
      }),
    slug: z.string().min(3).optional(),
  }),
});

export const UpdateDto = z.object({
  body: z.object({
    originalUrl: z
      .string()
      .min(3, { message: "Original URL must have at least three characters" })
      .refine((url) => isValidUrl(url), {
        message: "Original URL is not a valid URL",
      }),
  }),
});

export const queryDtoSchema = z.object({
  query: z.object({
    page: z.number().int().optional(),
    perPage: z.number().int().optional(),
    from: z.string().optional(),
    to: z.string().optional(),
  }),
});
