import { backendHost } from "@/helpers/common.config"
import axios from "axios"

async function getProfile(jwt){
    try {
        const response = await axios.request({
            url: `${backendHost}/api/users/profile/me`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        })
        return response.data.content.user
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
}

const get = async (req, res) => {
    try {
        const jwt = req.headers.authorization.split(' ')[1]
        const user = await getProfile(jwt)
        res.status(200).send({
            statusCode: 200,
            message: 'User Profile has been retrieved',
            content: {
                user
            }
        })
    } catch (error) {
        console.log(error)
        res.status(error.response ? error.response.status : 500)
            .send({
                statusCode: error.response ? error.response.status : 500,
                message: error.response ? error.response.data.message : 'Internal error!'
            })
    }
}

const actionMap = {
    'GET': get,
}

export default (req, res) => {
    actionMap[req.method](req, res)
}