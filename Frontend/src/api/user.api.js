
import axiosInstance from "../utils/axios.js";

export const loginUser = async (email, password) => {
    const {data} = await axiosInstance.post("/api/auth/login",{email,password})
    return data
}

export const registerUser = async (name, password, email) => {
    console.log(name,email,password);
    const {data} = await axiosInstance.post("/api/auth/register",{name,email,password})
    return data
}
export const logoutUser = async () => {
    const {data} = await axiosInstance.post("/api/auth/logout")
    return data
}


export const getCurrentUser = async () => {
    const {data} = await axiosInstance.get("/api/auth/me")
    return data
}

export const getAllUserUrls = async () =>{
    const {data} = await axiosInstance.post("/api/user/urls")
    return data
}
