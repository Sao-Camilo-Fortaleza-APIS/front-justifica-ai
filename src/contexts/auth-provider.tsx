import Cookies from "js-cookie"
import { createContext, ReactNode, useEffect, useState } from "react"

type User = {
    token: string
    user: string
}

type AuthContextType = {
    user: User | null
    isAuthenticated: boolean
    login: (userData: User) => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderProps = {
    children: ReactNode
}
export function AuthContextProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null) //dados do usuário
    const isAuthenticated = !!user // verificando se está autenticado se o usuário for retornado

    useEffect(() => {
        const token = Cookies.get("j.ai.token")
        const user = Cookies.get("j.ai.user")

        if (token && user) {
            setUser({ token, user })
        }
    }, [])

    const login = (userData: User) => {
        setUser(userData)
    }

    const logout = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
