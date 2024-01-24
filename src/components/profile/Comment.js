import { USER_ID_KEY } from "@/helpers/common.constant";
import { streamHost } from "@/helpers/stream.config";
import { useState } from "react";
import { onDeleteComment } from "./profile.service";

const Comment = ({ item, onLoadComments }) => {
    console.log(item)
    return (
        <div id="commentContainer" className="flex flex-row w-full">
            <div id="comment" className="flex flex-col w-full space-y-3">
                <div id="comentUser" className="flex flex-row space-x-3">
                    {
                        item.user_profile_picture !== null
                            ? <img src={`${streamHost}/image/${item.user_id}/${item.user_profile_picture}`} className="w-8 h-8 rounded-full border shadow" />
                            : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                    }
                    <p className="text-sm">{item.user_name}</p>
                </div>
                <div id="commentContent" className="text-sm">
                    {item.comment}
                </div>
                {item.user_id === localStorage.getItem(USER_ID_KEY) && <div id="deleteComment" className="flex flex-row justify-end items-center w-full">
                    <button 
                        onClick={e => {
                            onDeleteComment(item.comment_id)
                            onLoadComments(item.post_id)
                        }}
                        className="bg-red-500 text-white rounded border shadow p-1 text-sm px-4"
                    >Delete</button>
                </div>}
            </div>
        </div>
    )
}

export default Comment