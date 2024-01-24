import { JWT_KEY, USER_ID_KEY } from "@/helpers/common.constant";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import Head from "next/head";

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();

    const router = useRouter()

    const onLogin = useGoogleLogin({
        onSuccess: async tokenResponse => {
            setSuccessMessage(null)
            setErrorMessage(null);
            try {
                console.log(tokenResponse)
                const response = await axios.request({
                    url: '/api/login/gmail',
                    headers: {
                        'Authorization': `Bearer ${tokenResponse.access_token}`
                    }
                })
                console.log(response.data.content)
                setSuccessMessage(response.data.message)
                localStorage.setItem(JWT_KEY, response.data.content.jwt)
                localStorage.setItem(USER_ID_KEY, response.data.content.user_id)
                router.push("/home")
            } catch (error) {
                console.error(error)
                setErrorMessage(error.response.data.message)
            }
        },
    });

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen p-2">
            <Head>
                <title>Login</title>
            </Head>
            <div id="formContainer" className="flex flex-col border shadow rounded-md w-full p-5 space-y-5">
                <div id="logoContainer" className="flex flex-row items-center justify-center font-bold">
                    Logo
                </div>
                <button
                    className="flex flex-row items-center justify-center bg-blue-500 rounded-md border shadow text-white p-2 transition active:translate-y-0.5 active:duration-100"
                    onClick={onLogin}
                >
                    Login with Gmail
                </button>
            </div>
        </div >);
}

const LoginGoogle = () => {
    return (<GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <Login />
    </GoogleOAuthProvider>);

    // return <Login />
}

export default LoginGoogle;