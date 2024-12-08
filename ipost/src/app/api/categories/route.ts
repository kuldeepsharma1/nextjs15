import { NextRequest, NextResponse } from "next/server";
import Category from "@/models/Category";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";

// Utility for generating slug
const generateSlug = (name: string): string =>
    name.toLowerCase().replace(/[\s\-]+/g, "-").replace(/[^\w\-]+/g, "");

export async function GET() {
    try {
        await connect();
        const categories = await Category.find();
        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json(
            { error: "Failed to fetch categories" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await connect();

        // Parse request body
        const body = await req.json();
        const { name, description } = body;

        // Authenticate user
        const userId = getDataFromToken(req);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Validate required fields
        if (!name || name.trim() === "") {
            return NextResponse.json({ error: "Category name is required" }, { status: 400 });
        }

        // Check if the category name already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return NextResponse.json({ error: "Category name already exists" }, { status: 409 });
        }

        // Generate a slug
        const slug = generateSlug(name);

        // Create the new category
        const newCategory = await Category.create({
            name,
            description: description || "",
            author: userId,
            slug,
        });

        // Return success response
        return NextResponse.json(newCategory, { status: 201 });
    } catch (error: unknown) {
        console.error("Error creating category:", error);
        return NextResponse.json(
            { error: "Failed to create category", details: (error as Error).message },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest) {
    try {
        await connect();
        const { id, name, description } = await req.json();

        if (!id || !name) {
            return NextResponse.json(
                { error: "Category ID and name are required" },
                { status: 400 }
            );
        }

        // Update category
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { name, description },
            { new: true } // Return the updated document
        );

        if (!updatedCategory) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        return NextResponse.json(updatedCategory, { status: 200 });
    } catch (error) {
        console.error("Error updating category:", error);
        return NextResponse.json(
            { error: "Failed to update category", details: (error as Error).message },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await connect();
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
        }

        // Delete category
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting category:", error);
        return NextResponse.json(
            { error: "Failed to delete category", details: (error as Error).message },
            { status: 500 }
        );
    }
}
