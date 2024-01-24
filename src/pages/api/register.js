import { backendHost } from "@/helpers/common.config"
import axios from "axios"

const post = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body
        const response = await axios.request({
            url: `${backendHost}/api/users/register`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ user_email: email, user_password: password, user_confirm_password: confirmPassword })
        })
        res.status(response.status).json(response.data)
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : 'Internal service error')
    }
}

const actionMap = {
    'POST': post
}
export default (req, res) => {
    actionMap[req.method](req, res)
}