import Head from "next/head";
import StickyBanner from "./StickyBanner";
import { useEffect, useState } from "react";
import { onGetPostsMe, onGetProfileMe, onUpdateProfile } from "@/components/profile/profile.service";
import Modal from "../commons/Modal";
import axios from "axios";
import { JWT_KEY } from "@/helpers/common.constant";
import { streamHost } from "@/helpers/stream.config";
import { refreshToken } from "@/helpers/jwt.service";

const EditProfile = () => {
    const [userFullname, setUserFullname] = useState();
    const [userBioProfile, setUserBioProfile] = useState();
    const [userProfile, setUserProfile] = useState({});
    const [uploadProfilePictureModal, setUploadProfilePictureModal] = useState(false);
    const [progress, setProgress] = useState(0);
    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();

    async function onValidateToken(){
        try {
            const jwt = localStorage.getItem(JWT_KEY)
            const refreshTokenResponse = await refreshToken(jwt)    
            localStorage.setItem(JWT_KEY, refreshTokenResponse.token)
        } catch (error) {
            console.error(error);
            router.push("/logout")
        }        
    }
    
    async function onLoadProfileMe() {
        try {
            const { user, message } = await onGetProfileMe()
            setUserFullname(user.user_fullname)
            setUserBioProfile(user.user_bio_profile)
            setUserProfile(user)
            onValidateToken()
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        onLoadProfileMe()
    }, [])

    return (<div className="flex flex-row justify-center items-center">
        <div id="profileContainer" className="flex flex-col w-screen items-center h-screen md:w-3/5">
            <Head>
                <title>Edit Profile</title>
            </Head>
            <StickyBanner />
            <div className="flex flex-col justify-center items-center w-full mt-14 space-y-2 p-2">
                <img src={`${streamHost}/image/${userProfile.user_id}/${userProfile.user_profile_picture}`} className="h-36 w-36 border rounded-full shadow bg-gray-200" />
                <label htmlFor="file-upload">
                    <p className="text-sm text-blue-500 underline cursor-pointer">Edit Profile</p>
                </label>
                <input id="file-upload" type="file" className="hidden" onChange={async e => {
                    setUploadProfilePictureModal(true)
                    try {
                        const file = e.target.files[0]
                        const data = new FormData();
                        data.append('file', file);
                        const response = await axios.request({
                            method: 'post',
                            maxBodyLength: Infinity,
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization': `Bearer ${localStorage.getItem(JWT_KEY)}`
                            },
                            url: '/api/profilePicture/upload',
                            onUploadProgress: function (progressEvent) {
                                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                                setProgress(percentCompleted)
                            },
                            data: data
                        })
                        setSuccessMessage(response.data.message)
                        setUploadProfilePictureModal(false)
                        setUserProfile(response.data.content.user)
                    } catch (error) {
                        console.error(error)
                        setErrorMessage(error.response.data.message)
                    }
                }} />
                {errorMessage &&
                    <div className="flex flex-row items-center justify-center border border-red-800 bg-red-100 shadow rounded-md p-2 text-red-800 w-full">
                        {errorMessage}
                    </div>}
                {successMessage &&
                    <div className="flex flex-row items-center justify-center border border-green-800 bg-green-100 shadow rounded-md p-2 text-green-800 w-full ">
                        {successMessage}
                    </div>}
            </div>
            <div className="flex flex-col justify-center items-center w-full mt-14 space-y-5 p-2">
                <div className="w-full flex flex-col space-y-3">
                    <label htmlFor="fullname" className="text-sm">Full Name</label>
                    <input id="fullname" onChange={e => setUserFullname(e.target.value)} value={userFullname} type="text" placeholder="Full Name" className="border shadow rounded-md p-2" />
                </div>
                <div className="w-full flex flex-col space-y-3">
                    <label htmlFor="fullname" className="text-sm">Bio</label>
                    <textarea placeholder="Bio" onChange={e => setUserBioProfile(e.target.value)} value={userBioProfile} className="resize-none border shadow rounded-md p-2 h-36"></textarea>
                </div>
                <button
                    className="border shadow rounded-md bg-blue-500 w-full text-white p-2 transition active:translate-y-0.5"
                    onClick={async e => {
                        setErrorMessage(null)
                        setSuccessMessage(null)
                        try {
                            const { content, message } = await onUpdateProfile(userFullname, userBioProfile);
                            setSuccessMessage(message)
                        } catch (error) {
                            console.error(error)
                            setErrorMessage(error.response.data.message)
                        }
                    }}
                >
                    Update
                </button>
            </div>
            <Modal setShow={setUploadProfilePictureModal} show={uploadProfilePictureModal}>
                {progress > 0 && <div id="progress-container" className="mt-4 w-full">
                    <div id="progress-bar" className="bg-blue-300 text-xs font-bold text-center p-0.5 leading-none border border-blue-700 rounded-md text-blue-800" style={{ width: `${progress}%` }}>{progress}%</div>
                </div>}
            </Modal>
        </div>
    </div>);
}

export default EditProfile;