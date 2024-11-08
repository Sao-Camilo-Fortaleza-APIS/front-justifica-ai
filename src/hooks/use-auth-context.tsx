import { AuthContext } from "@/contexts/auth-provider"
import { useContext } from "react"

export const useAppContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAppContext must be used within an AuthProvider')
    }
    return context
}