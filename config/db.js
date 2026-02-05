import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "CourseApp",
        });
        console.log("MongoDB connected");
    } catch (err) {
        console.error("Failed to Connect MongoDB", err);
        process.exit(1);
    }
}

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            min: 2,
            max: 50,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
        password: {
            type: String,
            required: true,
            min: 6,
            select: false,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        status: {
            type: String,
            enum: ["active", "blocked"],
            default: "active",
        },
    },
    { timestamps: true, versionKey: false },
);

const courseSchema = new Schema(
    {
        creator: {
            type: ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 100,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 1000,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        level: {
            type: String,
            enum: ["beginner", "intermediate", "advanced"],
            required: true,
        },

        language: {
            type: String,
            required: true,
        },

        duration: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            required: true,
            match: /^https?:\/\/[^\s]+$/,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
            max: 1000000,
        },
    },
    { timestamps: true, versionKey: false },
);

const purchaseSchema = new Schema(
    {
        user: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        course: {
            type: ObjectId,
            ref: "Course",
            required: true,
        },
        creator: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        priceAtPurchase: {
            type: Number,
            required: true,
            min: 0,
            max: 1000000,
        },
        status: {
            type: String,
            enum: ["pending", "completed", "cancelled"],
            default: "pending",
        },
    },
    { timestamps: true, versionKey: false },
);

purchaseSchema.index({ user: 1, course: 1 }, { unique: true }); // prevents buying the same course more than 1 time
courseSchema.index({ creator: 1 }); // fast lookups for the user bought courses

export const User = mongoose.model("User", userSchema);
export const Course = mongoose.model("Course", courseSchema);
export const Purchase = mongoose.model("Purchase", purchaseSchema);
