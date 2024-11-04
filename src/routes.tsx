import { createBrowserRouter } from "react-router-dom"
import { App } from "./app"
import TimeJustificationForm from "./routes/create-justification"
import { Approve } from "./routes/manager"
import { Order } from "./routes/orders"
import { SignIn } from "./routes/sign-in"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <SignIn />
            }, {
                path: "/create-justification",
                element: <TimeJustificationForm />
            },
            {
                path: '/manager',
                element: <Approve />,
            },
            {
                path: '/order',
                element: <Order />,
            }
        ]
    }
])