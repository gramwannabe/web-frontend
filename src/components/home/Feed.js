import { USER_ID_KEY } from "@/helpers/common.constant";
import { streamHost } from "@/helpers/stream.config.js";
import { useEffect, useState } from "react";
import { onGetComments } from "./home.service";

const Feed = ({
    item,
    setFeed,
    setfeedOptionModal,
    setCommentModal,
    onLoadComments
}) => {

    const [updateLoved, setUpdateLoved] = useState(item.loved);

    useEffect(() => {
        
    },[])

    return (
        <div className="flex flex-col justify-center items-center w-full border shadow rounded-md p-2 space-y-3" >
            {/* feed header */}
            <div className="flex flex-row justify-between w-full" >
                {/* feed username */}
                <div className="flex flex-row space-x-2 items-center">
                    {
                        item.user_profile_picture !== null
                            ? <img src={`${streamHost}/image/${item.user_id}/${item.user_profile_picture}`} className="w-8 h-8 rounded-full border shadow" />
                            : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                    }
                    <a href={localStorage.getItem(USER_ID_KEY) === item.user_id ? '/profile' : `/user/profile?userId=${item.user_id}`} className="text-sm">{item.user_name}</a>
                </div>
                {/* feed option */}
                <div className="">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        onClick={e => {
                            setfeedOptionModal(true)
                            setFeed(item)
                        }} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
            </div >
            {/* feed content */}
            <div className="flex flex-row justify-center items-center w-full min-h-12" >
                {item.post_media_type === "video" && <video src={`${streamHost}/stream/${item.user_id}/${item.post_media[0]}`} controls className="rounded" />}
                {item.post_media_type === "image" && <img src={`${streamHost}/image/${item.user_id}/${item.post_media[0]}`} className="rounded" />}
            </div >
            {/* feed captions */}
            <div className="flex flex-row justify-start items-center w-full text-sm">
                <p>{item.post_description}</p>
            </div>
            {/* feed footer */}
            <div className="flex flex-row justify-start w-full space-x-5" >
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill={updateLoved ? 'red' : "none"} onClick={e => setUpdateLoved(!updateLoved)} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        onClick={e => {
                            setCommentModal(true)
                            setFeed(item)
                            onLoadComments(item.post_id)
                        }}
                        fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                    </svg>
                </div>
                <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer -rotate-45 absolute bottom-[2px]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                </div>
            </div >
        </div >
    )
}

export default Feed