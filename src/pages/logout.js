import { JWT_KEY } from "@/helpers/common.constant.js";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Logout = () => {
    const router = useRouter()
    useEffect(() => {
        localStorage.removeItem(JWT_KEY)
        router.push("/")
    }, [])
    return ( <p>Loading..</p> );
}
 
export default Logout;