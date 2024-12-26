import { useAppContext } from "@/hooks/use-auth-context";
import Cookies from "js-cookie";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export function Hero() {
    const navigate = useNavigate()
    const { logout } = useAppContext()
    const [user, setUser] = useState<string>('')
    const userLogged = Cookies.get('j.ai.user')
    const token = Cookies.get('j.ai.token')

    function handleSignOut() {
        Cookies.remove('j.ai.user')
        Cookies.remove('j.ai.token')
        logout()
        setUser('')
    }

    useEffect(() => {
        if (userLogged && token) {
            setUser(userLogged)
        }
    }, [])

    useEffect(() => {
        if (userLogged) {
            setUser(userLogged)
        } else {
            setUser('')
            navigate("/manager/login")
        }
    }, [user, userLogged, navigate])
    return (
        <div className="flex items-center justify-end">
            <span className="text-sm hidden sm:block">{user && user}</span>
            <Button
                onClick={() => handleSignOut()}
                variant="link"
                className="leading-none text-right text-zinc-500"
            >
                <LogOut className="h-6 w-6 mr-2" />
                Sair
            </Button>

        </div>
    )
}