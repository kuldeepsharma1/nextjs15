import { Schema, model, models, Document } from "mongoose";


export interface BlogDocument extends Document {
    title: string;
    content: string;
    slug: string;
    image: string;
    author: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}

const blogSchema = new Schema<BlogDocument>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        author: { type: String, required: true },
        category: { type: String, required: true },
    }, {
    timestamps: true
}
);

const Blog = models.Blog || model<BlogDocument>('Blog', blogSchema);

export default Blog;