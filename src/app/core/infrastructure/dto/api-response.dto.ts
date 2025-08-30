export interface ApiResponseDTO<T = any> {
    success: boolean
    timestamp: string
    message?: string
    data?: T
    error?: ErrorData
}

export interface ErrorData {
    code: string
    statusCode: number
    detail?: any
}