import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
}, { timestamps: true });

// Remove any pre-save hooks that might be causing loops
// userSchema.pre('save', async function(next) {
//    // Remove any code here that might be causing loops
//    next();
// });

const User = mongoose.model("User", userSchema);

export default User;
