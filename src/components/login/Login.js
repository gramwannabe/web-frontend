import { JWT_KEY, USER_ID_KEY } from "@/helpers/common.constant";
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();

    const router = useRouter()

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen p-2 bg-white">
            <Head>
                <title>Login</title>
            </Head>
            <div id="formContainer" className="flex flex-col border shadow rounded-md w-full md:w-[850px] p-5 space-y-5">
                <div id="logoContainer" className="flex flex-row items-center justify-center font-bold text-black">
                    Logo
                </div>
                <div className="flex flex-col space-y-2">
                    {errorMessage &&
                        <div className="border border-red-800 bg-red-100 shadow rounded-md p-2 text-red-800">
                            {errorMessage}
                        </div>}
                    {successMessage &&
                        <div className="border border-green-800 bg-green-100 shadow rounded-md p-2 text-green-800">
                            {successMessage}
                        </div>}
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="text-black">Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                        className="border shadow rounded p-2"
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="text-black">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                        className="border shadow rounded p-2"
                    />
                </div>
                <button
                    className="flex flex-row items-center justify-center bg-blue-500 rounded-md border shadow text-white p-2 transition active:translate-y-0.5 active:duration-100"
                    onClick={async e => {
                        setSuccessMessage(null)
                        setErrorMessage(null);
                        try {
                            const response = await axios.request({
                                url: '/api/login',
                                headers: {
                                    'Content-Type': "application/json"
                                },
                                method: 'POST',
                                data: JSON.stringify({
                                    email, password
                                })
                            })
                            setSuccessMessage(response.data.message)
                            localStorage.setItem(JWT_KEY, response.data.content.jwt)
                            localStorage.setItem(USER_ID_KEY, response.data.content.user_id)
                            router.push("/home")
                        } catch (error) {
                            console.error(error)
                            setErrorMessage(error.response.data.message)
                        }
                    }}
                >
                    Login
                </button>
                <a className="flex flex-row justify-center items-center underline text-blue-500 text-sm" href="/register">Don't have an account ?</a>
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