import { redirect } from "@tanstack/react-router";
import { getCurrentUser } from "../api/user.api";
import { login } from "../store/slice/authslice.js";

export const checkAuth = async ({ context }) => {
    try {
        const { queryClient, store } = context;
        const user = await queryClient.ensureQueryData({
            queryKey: ["currentUser"],
            queryFn: getCurrentUser,
        });
        if(!user) return false;
        store.dispatch(login(user));
        const {isAuthenticated} = store.getState().auth;
        if(!isAuthenticated) return false;
        return true
    } catch (error) {
        console.log(error)
        return redirect({to: "/auth",})
        
       
    }
};