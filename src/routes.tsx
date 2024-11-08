import { createBrowserRouter } from "react-router-dom"
import { App } from "./app"
import { RequireAuth } from "./components/require-auth"
import TimeJustificationForm from "./routes/create-justification"
import { Approve } from "./routes/manager"
import { Order } from "./routes/orders"
import { SignInCollaborator } from "./routes/sign-in-collaborator"
import { SignInManager } from "./routes/sign-in-manager"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <SignInCollaborator />
            },
            {
                path: "/create-justification",
                element: <TimeJustificationForm />
            },
            {
                path: "/manager/login",
                element: <SignInManager />
            },
            {
                path: '/manager',
                element: (
                    <RequireAuth>
                        <Approve />
                    </RequireAuth>
                ),
            },
            {
                path: '/manager/order',
                element: (
                    <RequireAuth>
                        <Order />
                    </RequireAuth>
                ),
            }
        ]
    }
])