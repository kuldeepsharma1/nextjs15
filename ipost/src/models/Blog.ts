import { Schema, model, models, Document } from "mongoose";

export interface BlogDocument extends Document {
    title: string;
    content: string;
    slug: string;
    image: string;
    author: Schema.Types.ObjectId;  
    category: Schema.Types.ObjectId | null; 
    createdAt: Date;
    updatedAt: Date;
}

const blogSchema = new Schema<BlogDocument>(
    {
        title: {
            type: String,
            required: [true, "Blog title is required"],
            trim: true,
            maxlength: [150, "Title cannot exceed 150 characters"],
        },
        content: {
            type: String,
            required: [true, "Content is required"],
        },
        slug: {
            type: String,
            required: [true, "Slug is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"],
        },
        image: {
            type: String,
            required: [true, "Image is required"],
            trim: true,
            validate: {
                validator: (url: string) =>
                    /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)$/.test(url),
                message: "Invalid image URL",
            },
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User", 
            required: [true, "Author is required"],
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            default: null,
        },
    },
    {
        timestamps: true, 
    }
);

const Blog = models.Blog || model<BlogDocument>("Blog", blogSchema);

export default Blog;
