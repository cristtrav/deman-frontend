export interface ApiResponseDTO<T = any> {
    success: boolean
    timestamp: string
    message?: string
    data?: T
    error?: ErrorData
    pagination?: PaginationData
}

export interface ErrorData {
    code: string
    statusCode: number
    detail?: any
}

export interface PaginationData {
    total: number,
    page: number,
    pageSize: number,
    totalPages: number
}