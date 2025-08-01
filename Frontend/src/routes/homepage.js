import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routetree.js"
import Home from "../pages/Home.jsx"
import { checkAuth } from "../utils/helper.js"

export const homePageRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Home,
    beforeLoad: checkAuth
  })