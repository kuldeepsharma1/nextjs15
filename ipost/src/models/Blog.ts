import { Schema, model, models, Document } from "mongoose";
import User from './User'
import Category from './Category'

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
            trim: true, 
        },
        slug: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"],
        },
        image: {
            type: String,
            required: [true, "Image is required"],
            trim: true,
        },        
        author: {
            type: Schema.Types.ObjectId,
            ref: User,
            required: [true, "Author is required"],
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: Category,
            default: null,
        },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
        toJSON: { virtuals: true }, // Include virtuals in JSON responses
        toObject: { virtuals: true }, // Include virtuals in objects
    }
);

// Pre-save hook to automatically generate a slug if not provided
blogSchema.pre('save', async function(next) {
    if (this.isModified('title')) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[\s\-]+/g, '-')
            .replace(/[^\w\-]+/g, '');
        
        const existingSlug = await Blog.findOne({ slug: this.slug }).exec();
        if (existingSlug && existingSlug._id !== this._id) {
            this.slug = `${this.slug}-${Date.now()}`;
        }
    }
    next();
  });
  

// Virtual field for formatted createdAt date
blogSchema.virtual("formattedDate").get(function () {
    return new Date(this.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
});

// Indexing for optimized queries (e.g., find by slug or category)
blogSchema.index({ slug: 1 });
blogSchema.index({ category: 1 });

const Blog = models.Blog || model<BlogDocument>("Blog", blogSchema);

export default Blog;
