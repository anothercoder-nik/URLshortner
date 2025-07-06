import User from "../models/user.model.js";

export const findUserByEmail = async (email) => {
  try {
    return await User.findOne({ email: email.toLowerCase() });
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  }
};
export const createUser = async (name, email, password) => {
    const user = new User({name, email, password});
    return await user.save();
}
export const findUserById = async (id) => {
    return await User.findById(id);
}