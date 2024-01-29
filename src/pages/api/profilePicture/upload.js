import * as Minio from "minio"
import { backendHost, jwtHost, minioAccessKey, minioHost, minioPort, minioSecretKey, minioUseSsl } from '@/helpers/common.config';
import formidable from 'formidable';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

export const config = {
    api: {
        bodyParser: false, // Disables the default Next.js body parser
    },
};

const minioClient = new Minio.Client({
    endPoint: minioHost,
    port: minioPort,
    useSSL: minioUseSsl,
    accessKey: minioAccessKey,
    secretKey: minioSecretKey,
})

async function validateToken(token) {
    try {
        const response = await axios.request({
            url: `${jwtHost}/validate`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ token })
        })
        return response.data
    } catch (error) {
        throw new Error(error);
    }
}

async function uploadToMinioObject(bucket, originalFilename, filepath, metadata) {
    try {
        const exists = await minioClient.bucketExists(bucket)
        if (exists) {
            console.log('Bucket ' + bucket + ' exists.')
        } else {
            await minioClient.makeBucket(bucket)
            console.log('Bucket ' + bucket + ' has been created.')
        }
        await minioClient.fPutObject(bucket, originalFilename, filepath, metadata)
    } catch (error) {
        throw new Error(error)
    }
}

async function updateProfilePicture(jwt, filename) {
    try {
        const response = await axios.request({
            url: `${backendHost}/api/users/profile/picture`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            method: 'PUT',
            data: JSON.stringify({
                user_profile_picture: filename
            })
        })
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}

const post = async (req, res) => {
    try {
        const uuid = uuidv4()
        const form = formidable({
            maxFileSize: 500 * 1024 * 1024, // 500 MB
            maxTotalFileSize: 1024 * 1024 * 1024 // 1 GB
        });
        const data = await form.parse(req);
        const { filepath, originalFilename, mimetype } = data[1].file[0]
        const filename = `${uuid}-${originalFilename}`
        const token = req.headers.authorization.split(' ')[1]
        console.log(`filepath: ${filepath} original filename: ${originalFilename}`)
        const tokenValidateResponse = await validateToken(token)
        await uploadToMinioObject(tokenValidateResponse.data.user_id, filename, filepath, { 'Content-Type': mimetype })
        const { content } = await updateProfilePicture(token, filename)
        res.status(200).send({
            statusCode: 200,
            message: 'Profile Picture has been updated successfully',
            content: {
                user: content.user
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
    'POST': post
}

export default (req, res) => {
    actionMap[req.method](req, res)
}