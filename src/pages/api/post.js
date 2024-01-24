import { backendHost } from "@/helpers/common.config"
import axios from "axios"

async function updatePostDescription(jwt, postId, postDescription) {
    try {
        const response = await axios.request({
            url: `${backendHost}/api/posts/${postId}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            method: 'PUT',
            data: JSON.stringify({
                post_description: postDescription
            })
        })
        return response.data.content.post
    } catch (error) {
        throw new Error(error)
    }
}

async function getPosts(jwt, page) {
    try {
        const response = await axios.request({
            url: `${backendHost}/api/posts?page=${page}`,
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
        return response.data.content.posts
    } catch (error) {
        throw new Error(error)
    }
}

async function deletePost(postId){
    try {
        const response = await axios.request({
            url: `${backendHost}/api/posts/${postId}`,
            method: 'DELETE'
        })
        return response.data.content
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (req, res) => {
    try {
        const { postDescription } = req.body
        const jwt = req.headers.authorization.split(' ')[1]
        const { postId } = req.query
        const post = await updatePostDescription(jwt, postId, postDescription)
        res.status(200).send({
            statusCode: 200,
            message: 'Post has been updated',
            content: {
                post
            }
        })
    } catch (error) {
        console.error(error)
        res.status(error.response ? error.response.status : 500)
            .send({
                statusCode: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.message : 'Internal error!'
            })
    }
}

const get = async (req, res) => {
    const { authorization } = req.headers
    const { page } = req.query
    try {
        res.status(200).send({
            statusCode: 200,
            message: 'Posts has been retrieved successfully',
            content: {
                posts: await getPosts(authorization.split(' ')[1], page)
            }
        })
    } catch (error) {
        console.error(error)
        res.status(error.response ? error.response.status : 500)
            .send({
                statusCode: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.message : 'Internal error!'
            })
    }
}

const remove = async (req, res) => {
    const { postId } = req.query
    try {
        await deletePost(postId)
        res.status(200).send({
            statusCode: 200,
            message: 'Posts has been retrieved successfully'
        })
    } catch (error) {
        console.error(error)
        res.status(error.response ? error.response.status : 500)
            .send({
                statusCode: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.message : 'Internal error!'
            })
    }
}

const actionMap = {
    'PUT': update,
    'GET': get,
    'DELETE': remove
}

export default (req, res) => {
    actionMap[req.method](req, res)
}