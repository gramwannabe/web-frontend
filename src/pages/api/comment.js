import { backendHost } from "@/helpers/common.config.js"
import axios from "axios"

const post = async (req, res) => {
    try {
        const jwt = req.headers.authorization.split(' ')[1]
        const { comment } = req.body
        const { postId } = req.query
        const response = await axios.request({
            url: `${backendHost}/api/comments/${postId}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            data: JSON.stringify({ comment })
        })
        res.status(response.status).json(response.data)
    } catch (error) {
        console.error(error)
        res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : 'Internal service error')
    }
}

const get = async (req, res) => {
    try {
        const { postId } = req.query
        const response = await axios.request({
            url: `${backendHost}/api/comments/${postId}`,
            method: 'GET',
        })
        res.status(response.status).json(response.data)
    } catch (error) {
        console.error(error)
        res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : 'Internal service error')
    }
}

const remove = async (req, res) => {
    try {
        const { commentId } = req.query
        const response = await axios.request({
            url: `${backendHost}/api/comments/${commentId}`,
            method: 'DELETE',
        })
        res.status(response.status).json(response.data)
    } catch (error) {
        console.error(error)
        res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : 'Internal service error')
    }
}

const actionMap = {
    'GET': get,
    'DELETE': remove,
    'POST': post
}

export default (req, res) => {
    actionMap[req.method](req, res)
}