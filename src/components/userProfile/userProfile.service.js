import { JWT_KEY } from "@/helpers/common.constant";
import axios from "axios";

export async function onGetUserProfile(userId){
    if(userId === undefined) return 
    try {
        const response = await axios.request({
            url: `/api/profile/user?userId=${userId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return response.data.content
    } catch (error) {
        console.error(error);
        throw new Error(error)
    }
}

export async function onGetPosts(userId){
    if(userId === undefined) return 
    try {
        const response = await axios.request({
            url: `/api/posts/user?userId=${userId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return response.data.content
    } catch (error) {
        console.error(error);
        throw new Error(error)
    }
}

export async function onGetComments(postId){
    try {
        const response = await axios.request({
            url: `/api/comment?postId=${postId}`,
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET'
        })
        return response.data.content
    } catch (error) {
        console.error(error);
    }
}

export async function onCreateComment(postId, comment){
    try {
        const response = await axios.request({
            url: `/api/comment?postId=${postId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(JWT_KEY)}`
            },
            method: 'POST',
            data: JSON.stringify({ comment })
        })
        return response.data
    } catch (error) {
        console.error(error);
    }
}

export async function onDeleteComment(commentId){
    try {
        const response = await axios.request({
            url: `/api/comment?commentId=${commentId}`,
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        })
        return response.data
    } catch (error) {
        console.error(error);
    }
}