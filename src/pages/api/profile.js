import { backendHost } from "@/helpers/common.config"
import axios from "axios"

async function updateProfile(jwt, user_fullname, user_bio_profile){
    try {
        const response = await axios.request({
            url: `${backendHost}/api/users/profile`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            data: JSON.stringify({
                user_fullname,
                user_bio_profile
            })
        })
        return response.data.content.user
    } catch (error) {
        throw new Error(error)
    }
}
const update = async (req, res) => {
    try {
        const { userFullname, userBioProfile } = req.body
        const jwt = req.headers.authorization.split(' ')[1]
        const user = await updateProfile(jwt, userFullname, userBioProfile)
        res.status(200).send({
            statusCode: 200,
            message: 'User Profile has been updated',
            content: {
                user
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
    'PUT': update,
}

export default (req, res) => {
    actionMap[req.method](req, res)
}