import { Schema, model, models, Document, Types } from "mongoose";

export interface CategoryDocument extends Document {
    name: string;
    description: string;
    author: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    isArchived: boolean; 
    slug?: string; 
}

const categorySchema = new Schema<CategoryDocument>(
    {
        name: {
            type: String,
            unique: true,
            required: [true, "Name is required"],
            trim: true,
            maxlength: [100, "Name cannot exceed 100 characters"],
            index: true,
            validate: {
                validator: (value: string) => /^[\w\s-]+$/.test(value),
                message: "Name can only contain letters, numbers, spaces, and dashes",
            },
        },
        description: {
            type: String,
            trim: true,
            default: "",
            maxlength: [500, "Description cannot exceed 500 characters"],
        },
        author: {
            type: Schema.Types.ObjectId,
            required: [true, "Author is required"],
            ref: "User",
        },
        isArchived: {
            type: Boolean,
            default: false,
        },
        slug: {
            type: String,
            unique: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Category = models.Category || model<CategoryDocument>("Category", categorySchema);

export default Category;
