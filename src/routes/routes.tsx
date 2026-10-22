import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../pages/homePage";
import RoomDetailsPage from "../pages/roomDetailsPage";
import LoginPage from "../pages/loginPage";
import RegisterPage from "../pages/registerPage";
import BookingFormPage from "../pages/bookingFormPage";
import MyBookingsPage from "../pages/myBookingsPage";
import AdminBookingsPage from "../pages/adminBookingsPage";
import AdminRoomsPage from "../pages/adminRoomsPage";
import RoomFormPage from "../pages/roomFormPage";
import UnauthorizedPage from "../pages/unauthorizedPage";
import NotFoundPage from "../pages/notFoundPage";

const routes=createBrowserRouter(
    [
        {
            path:"",
            element:<App/>,
            children:[
                {
                    path:"/",
                    element:<HomePage />

                },
                {
                    path:"/rooms/:roomId",
                    element:<RoomDetailsPage />

                },
                {
                    path:"/login",
                    element:<LoginPage />

                },
                {
                    path:"/register",
                    element:<RegisterPage />
                },
                {
                    path:"/rooms/:roomId/book",
                    element:<BookingFormPage />

                },
                {
                    path:"/my-bookings",
                    element:<MyBookingsPage />
                },
                {
                    path:"/admin/bookings",
                    element:<AdminBookingsPage />
                },
                {
                    path:"/admin/rooms",
                    element:<AdminRoomsPage />

                },
                {
                    path:"/admin/rooms/new",
                    element:<RoomFormPage />
                },
                {
                    path:"/admin/rooms/:roomId/edit",
                    element:<RoomFormPage />

                },
                {
                    path:"/unauthorized",
                    element:<UnauthorizedPage />
                },
                {
                    path:"*",
                    element:<NotFoundPage />
                }


            ]
        }
    ]
)

export default routes;