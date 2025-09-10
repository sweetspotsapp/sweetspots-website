export interface PaginationCore {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginationResult<T> {
    data: T[];
    pagination: PaginationCore;
}

export interface ApiPluralResponse<T> {
    success: boolean;
    data?: PaginationResult<T>;
    message?: string;
    statusCode?: number;
    timestamp: string;
    path?: string;
    method?: string;
}
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    statusCode?: number;
    timestamp: string;
    path?: string;
    method?: string;
}