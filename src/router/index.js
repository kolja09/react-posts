import Posts from "../pages/Post";
import PostIdPage from "../pages/PostIdPage";
import Login from "../pages/Login";

export const privateRoutes =[
    {path: '/posts', component: Posts, exact: true},
    {path: '/posts/:id', component: PostIdPage, exact: true},
]

export const publicRoutes = [
    {path: '/login', component: Login, exact: true},
]