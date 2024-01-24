import axios from "axios";
import { JWT_KEY } from "../../helpers/common.constant.js";

export async function onLoadFeeds(setFeeds, page, setIsMoreData){
    try {
        const response = await axios.request({
            url: `/api/post?page=${page}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(JWT_KEY)}`
            }
        })
        setFeeds(previousData => [...previousData, ...response.data.content.posts])
        setIsMoreData(response.data.content.posts.length > 0)
    } catch (error) {
        console.error(error);
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