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
import UserProtected, { AdminProtected } from "../components/protected";

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
                    element:<UserProtected><BookingFormPage /></UserProtected>

                },
                {
                    path:"/my-bookings",
                    element:<UserProtected><MyBookingsPage /></UserProtected>
                },
                {
                    path:"/admin/bookings",
                    element:<AdminProtected><AdminBookingsPage /></AdminProtected>
                },
                {
                    path:"/admin/rooms",
                    element:<AdminProtected><AdminRoomsPage /></AdminProtected>

                },
                {
                    path:"/admin/rooms/new",
                    element:<AdminProtected><RoomFormPage /></AdminProtected>
                },
                {
                    path:"/admin/rooms/:roomId/edit",
                    element:<AdminProtected><RoomFormPage /></AdminProtected>

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