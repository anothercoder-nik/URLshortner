import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routetree.js"
import Home from "../pages/Home.jsx"

export const homePageRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Home,
  })