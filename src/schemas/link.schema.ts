import { Schema, model, Document } from "mongoose";

export interface ILinkSchema extends Document {
  originalUrl: string;
  shortUrl: string;
  slug: string;
  created_at?: Date;
  updated_at?: Date;
}

const LinkSchema = new Schema<ILinkSchema>({
  originalUrl: {
    type: String,
    required: true,
    lowercase: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true, // Ensure that slugs are unique
    lowercase: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Link = model<ILinkSchema>("Link", LinkSchema);

export default Link;
