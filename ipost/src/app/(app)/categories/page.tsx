"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

// Define TypeScript types
interface Category {
    _id: string;
    name: string;
    description: string;
    author: string;
}

export default function Category(){
    const [categories, setCategories] = useState<Category[]>([]);
    const [form, setForm] = useState({ name: "", description: "", author: "" });
    const [editingId, setEditingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch categories
    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.get("/api/categories");
            setCategories(data);
        } catch (err) {
            console.error("Error fetching categories:", err);
            setError("Failed to load categories. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            if (editingId) {
                await axios.put("/api/categories", { ...form, id: editingId });
            } else {
                await axios.post("/api/categories", form);
            }
            setForm({ name: "", description: "", author: "" });
            setEditingId(null);
            fetchCategories();
        } catch (err) {
            console.error("Error saving category:", err);
            setError("Failed to save category. Please try again.");
        }
    };

    // Handle delete
    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;

        setError(null);
        try {
            await axios.delete("/api/categories", { data: { id } });
            fetchCategories();
        } catch (err) {
            console.error("Error deleting category:", err);
            setError("Failed to delete category. Please try again.");
        }
    };

    // Handle edit
    const handleEdit = (category: Category) => {
        setEditingId(category._id);
        setForm({ name: category.name, description: category.description, author: category.author });
    };

    return (
        <div className="container mx-auto p-4 pt-10">
            <h1 className="text-2xl font-bold mb-4">Category Management</h1>

            {/* Error Message */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    placeholder="Category Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="border p-2 w-full mb-2"
                />
                <textarea
                    placeholder="Description (Optional)"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="border p-2 w-full mb-2"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    disabled={loading}
                >
                    {editingId ? "Update Category" : "Add Category"}
                </button>
            </form>

            {/* Loading State */}
            {loading && <p className="text-blue-500">Loading...</p>}

            {/* Category List */}
            {!loading && categories.length === 0 && (
                <p className="text-gray-500">No categories available.</p>
            )}

            <ul>
                {categories.map((category) => (
                    <li key={category._id} className="border p-2 mb-2">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-bold">{category.name}</h2>
                                <p>{category.description}</p>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleEdit(category)}
                                    className="text-blue-500 mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(category._id)}
                                    className="text-red-500"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};


