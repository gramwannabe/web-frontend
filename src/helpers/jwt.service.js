export async function validateToken(token) {
    try {
        const response = await fetch(`/api/jwt`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            method: 'GET',
        })

        if (!response.ok) throw new Error(`Error JWT Token invalid: ${response.status}`)

        return await response.json()

    } catch (err) {
        console.error(err)
        throw new Error(err.message)
    }
}

export async function refreshToken(token) {
    try {
        const response = await fetch(`/api/jwt`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            method: 'PUT',
        })

        if (!response.ok) throw new Error(`Error JWT Token invalid: ${response.status}`)

        return await response.json()

    } catch (err) {
        console.error(err)
        throw new Error(err.message)
    }
}