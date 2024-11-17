export const createResponse = (
    status: string, statusCode: number, message: string, data: object | null = null, error: object | null = null
) => {
    return {
        status,
        statusCode,
        message,
        ...(data && { data }),
        ...(error && { error })
    }
}