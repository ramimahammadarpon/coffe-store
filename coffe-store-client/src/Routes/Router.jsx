import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Components/Home";
import AddCoffe from "../Components/AddCoffe";
import CoffeDetails from "../Components/CoffeDetails";
import UpdateCoffe from "../Components/UpdateCoffe";
import SignUp from "../Components/SignUp";
import Login from "../Components/Login";
import Users from "../Components/Users";

export const router = createBrowserRouter([
    {
        path:'/',
        Component: MainLayout,
        children: [
            {
                index:true,
                Component: Home,
                loader: ()=>fetch('http://localhost:3000/coffes')
            },
            {
                path: 'addCoffe',
                Component: AddCoffe
            },
            {
                path: 'coffe/:id',
                Component: CoffeDetails,
                loader: ({params})=>fetch(`http://localhost:3000/coffes/${params.id}`)
            },
             {
                path:'updateCoffe/:id',
                Component: UpdateCoffe,
                loader:({params})=>fetch(`http://localhost:3000/coffes/${params.id}`)
            },
            {
                path: 'signUp',
                Component:SignUp
            },
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'users',
                Component: Users,
                loader: ()=>fetch('http://localhost:3000/users')
            }
        ]
    }
])