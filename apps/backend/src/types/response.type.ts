export interface Response {
    success: boolean;
    message?: string;
    data?: object;
    error?: {
        code: string;
        details: string;
    }
}