export enum ApiResponseType {
    Error = 'error',
    Success = 'success',
}

export default interface ApiResponse<T, E> {
    status: number;
    data?: T;
    error?: E;
    type: ApiResponseType;
}
