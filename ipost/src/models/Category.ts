import { Schema, model, models, Document, Types } from "mongoose";

export interface CategoryDocument extends Document {
    name: string;
    description: string;
    author: Types.ObjectId; 
    createdAt: Date;
    updatedAt: Date;
}

const categorySchema = new Schema<CategoryDocument>(
    {
        name: {
            type: String,
            unique: true,
            required: [true, "Name is required"],
            trim: true,
            maxlength: [100, "Name cannot exceed 100 characters"],
        },
        description: {
            type: String,
            trim: true,
            default: "", 
        },
      
        author: {
            type: Schema.Types.ObjectId,
            required: [true, "Author is required"],
            ref: "User", 
        },
    },
    {
        timestamps: true, 
    }
);

const Category = models.Category || model<CategoryDocument>("Category", categorySchema);

export default Category;
