import { get_token } from "@/capacitor/auth"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"

export function GuestLayout() {
    const navigate=useNavigate()
    useEffect(() => {
        const handle=async()=>{
            const token=await get_token()
           if(token){
            navigate("/")
           }
        }
        handle()
    }, [navigate])
    return <Outlet/>; // Render children when not redirected

}