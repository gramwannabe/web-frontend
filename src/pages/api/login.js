import { backendHost } from "@/helpers/common.config"
import axios from "axios"

const post = async (req, res) => {
    try {
        const { email, password } = req.body
        const response = await axios.request({
            url: `${backendHost}/api/users/login`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ user_email: email, user_password: password })
        })
        res.status(response.status).json(response.data)
    } catch (error) {
        console.error(error)
        res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : 'Internal service error')
    }
}

const actionMap = {
    'POST': post
}
export default (req, res) => {
    actionMap[req.method](req, res)
}