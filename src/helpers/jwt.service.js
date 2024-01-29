import axios from "axios"

export async function validateToken(token) {
    try {
        // const response = await fetch(`/api/jwt`, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}`
        //     },
        //     method: 'GET',
        // })

        // if (!response.ok) throw new Error(`Error JWT Token invalid: ${response.status}`)

        // return await response.json()
        const response = await axios.request({
            url: '/api/jwt',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            method: 'GET',
        })
        return response.data
    } catch (err) {
        console.error(err)
        throw new Error(err.message)
    }
}

export async function refreshToken(token) {
    try {
        // const response = await fetch(`/api/jwt`, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}`
        //     },
        //     method: 'PUT',
        // })

        // if (!response.ok) throw new Error(`Error JWT Token invalid: ${response.status}`)

        // return await response.json()
        const response = await axios.request({
            url: '/api/jwt',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            method: 'PUT',
        })
        return response.data
    } catch (err) {
        console.error(err)
        throw new Error(err.message)
    }
}