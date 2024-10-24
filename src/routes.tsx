import { createBrowserRouter } from "react-router-dom"
import { App } from "./app"
import { Approve } from "./routes/approve"
import TimeJustificationForm from "./routes/create-justification"
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
                path: '/approve',
                element: <Approve />,
            }
        ]
    }
])