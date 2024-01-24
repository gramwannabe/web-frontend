import axios from "axios";
import Head from "next/head";
import { useState } from "react";

const Register = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();

    async function onRegister(e) {
        e.preventDefault();
        setSuccessMessage(null)
        setErrorMessage(null);
        try {
            const response = await axios.request({
                url: '/api/register',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    email, password, confirmPassword
                })
            })

            setSuccessMessage(response.data.message)

        } catch (error) {
            setErrorMessage(error.response.data.message)
        }
    }

    return (<>
        <div className="flex flex-col items-center justify-center h-screen w-screen p-2">
            <Head>
                <title>Register</title>
            </Head>
            <div id="formContainer" className="flex flex-col border shadow rounded-md w-full p-5 space-y-5">
                <div id="logoContainer" className="flex flex-row items-center justify-center font-bold">
                    Logo
                </div>
                <div className="flex flex-col space-y-2">
                    <p className="font-normal">Email: </p>
                    <input type="text" className="border shadow rounded-md p-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="flex flex-col space-y-2">
                    <p className="font-normal">Password: </p>
                    <input type="password" className="border shadow rounded-md p-2" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="flex flex-col space-y-2">
                    <p className="font-normal">Confirm Password: </p>
                    <input type="password" className="border shadow rounded-md p-2" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
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
                    <button
                        className="flex flex-row items-center justify-center bg-blue-500 rounded-md border shadow text-white p-2 transition active:translate-y-0.5 active:duration-100"
                        onClick={onRegister}
                    >
                        Register
                    </button>
                    <div className="flex flex-row items-center justify-center ">
                        <a href="/" className="text-blue-500 underline">Already have an account ?</a>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Register;