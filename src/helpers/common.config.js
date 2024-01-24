export const backendHost = process.env.BACKEND_HOST
export const jwtHost = process.env.JWT_HOST
export const minioHost = process.env.MINIO_HOST
export const minioPort = parseInt(process.env.MINIO_PORT)
export const minioAccessKey = process.env.MINIO_ACCESS_KEY
export const minioSecretKey = process.env.MINIO_SECRET_KEY
export const minioUseSsl = process.env.MINIO_USE_SSL.toUpperCase() === 'true' ? true : false