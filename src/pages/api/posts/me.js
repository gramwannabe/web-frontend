import { backendHost } from "@/helpers/common.config"
import axios from "axios"

async function getPostsMe(jwt, page) {
    try {
        const response = await axios.request({
            url: `${backendHost}/api/posts/me`,
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
        return response.data.content.posts
    } catch (error) {
        throw new Error(error)
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
                posts: await getPostsMe(authorization.split(' ')[1], page)
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

const actionMap = {
    'GET': get
}

export default (req, res) => {
    actionMap[req.method](req, res)
}