import { findUserById } from "../dao/user.dao.js"
import { verifyToken } from "../utils/helper.js"

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.accessToken
    if(!token) return res.status(401).json({message:"Unauthorized"})
    try {
        const decoded = verifyToken(token)
        
        // Check if this is a guest token
        if (decoded.isGuest) {
            // Create a temporary guest user object
            const guestUser = {
                _id: decoded.id,
                name: 'Guest User',
                email: `${decoded.id}@guest.local`,
                isGuest: true,
                createdAt: new Date()
            }
            req.user = guestUser
            next()
        } else {
            // Regular user authentication
            const user = await findUserById(decoded.id)
            if(!user) return res.status(401).json({message:"Unauthorized"})
            req.user = user
            next()
        }
    } catch (error) {
        return res.status(401).json({message:"Unauthorized",error})
    }
}