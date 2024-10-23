import { createBrowserRouter } from "react-router-dom"
import { App } from "./app"
import { Approve } from "./routes/approve"
import TimeJustificationForm from "./routes/create-justification"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <TimeJustificationForm />
            },
            {
                path: '/approve',
                element: <Approve />,
            }
        ]
    }
])