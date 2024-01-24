import { backendHost } from "@/helpers/common.config"
import axios from "axios"

const get = async (req, res) => {
    try {
        const response = await axios.request({
            url: `${backendHost}/api/users/login/gmail`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${req.headers.authorization.split(' ')[1]}`
            }
        })
        res.status(response.status).json(response.data)
    } catch (error) {
        console.error(error)
        res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : 'Internal service error')
    }
}

const actionMap = {
    'GET': get
}
export default (req, res) => {
    actionMap[req.method](req, res)
}