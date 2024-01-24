import { jwtHost } from "@/helpers/common.config"
import axios from "axios"

const get = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const response = await axios.request({
            url: `${jwtHost}/validate`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ token })
        })
        res.status(response.status).json(response.data)
    } catch (error) {
        res.status(error.response.status).json(error.response.data)
    }
}

const update = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const response = await axios.request({
            url: `${jwtHost}/refresh`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ token })
        })
        res.status(response.status).json(response.data)
    } catch (error) {
        console.error(error)
        res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : 'Internal service error')
    }
}

const actionMap = {
    'GET': get,
    'PUT': update,
}

export default (req, res) => {
    actionMap[req.method](req, res)
}