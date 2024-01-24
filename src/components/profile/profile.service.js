import axios from "axios";
import { JWT_KEY } from "../../helpers/common.constant.js";

export async function onUpdateProfile(userFullname, userBioProfile){
    try {
        const response = await axios.request({
            url: `/api/profile`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(JWT_KEY)}`
            },
            data: JSON.stringify({
                userFullname, userBioProfile
            })
        })
        return response.data
    } catch (error) {
        console.error(error);
        throw new Error(error)
    }
}

export async function onGetProfileMe(){
    try {
        const response = await axios.request({
            url: `/api/profile/me`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(JWT_KEY)}`
            }
        })
        return response.data.content
    } catch (error) {
        console.error(error);
        throw new Error(error)
    }
}

export async function onGetPostsMe(){
    try {
        const response = await axios.request({
            url: `/api/posts/me`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(JWT_KEY)}`
            }
        })
        return response.data.content
    } catch (error) {
        console.error(error);
        throw new Error(error)
    }
}

export async function onDeletePost(postId){
    try {
        const response = await axios.request({
            url: `/api/post?postId=${postId}`,
            method: 'DELETE',
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