import { useAppContext } from "@/hooks/use-auth-context";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export function Hero() {
    const navigate = useNavigate()
    const { logout } = useAppContext()
    const [user, setUser] = useState<string>('')
    const userLogged = Cookies.get('user')

    function handleSignOut() {
        Cookies.remove('user')
        logout()
        setUser('')
    }

    useEffect(() => {
        if (userLogged) {
            setUser(userLogged)
        }
    }, [])

    useEffect(() => {
        if (userLogged) {
            setUser(userLogged)
        } else {
            setUser('')
            navigate("/")
        }
    }, [user, userLogged, navigate])
    return (
        <div className="flex items-center justify-center gap-2">
            <span className="text-xs">{user && user}</span>
            <Button
                onClick={() => handleSignOut()}
                variant="link" size="sm"
                className="leading-tight flex items-center justify-center gap-1 text-zinc-500"
            >
                Sair
            </Button>

        </div>
    )
}