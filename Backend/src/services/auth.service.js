import { createUser, findUserByEmail, findUserByEmailByPassword } from "../dao/user.dao.js"
import { ConflictError } from "../utils/errorHandler.js"
import {signToken} from "../utils/helper.js"

export const registerUser = async (name, email, password) => {
    const user = await findUserByEmail(email)
    if(user) throw new ConflictError("User already exists")
    const newUser = await createUser(name, email, password)
    const token = await signToken({id: newUser._id})
    return {token,user}
}

export const loginUser = async (email, password) => {
    const user = await findUserByEmailByPassword(email)
    if(!user) throw new Error("Invalid email or password")

    const isPasswordValid = await user.comparePassword(password)
    if(!isPasswordValid) throw new Error("Invalid email or password")
    const token = signToken({id: user._id})
    return {token,user}
}

export const guestLogin = async () => {
    // Generate a unique guest ID
    const guestId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const guestName = `Guest User`
    const guestEmail = `${guestId}@guest.local`
    
    // Create a temporary guest user (this will be stored in session/memory, not database)
    const guestUser = {
        _id: guestId,
        name: guestName,
        email: guestEmail,
        isGuest: true,
        createdAt: new Date()
    }
    
    // Generate a temporary token for guest user
    const token = signToken({id: guestId, isGuest: true})
    
    return {token, user: guestUser}
}