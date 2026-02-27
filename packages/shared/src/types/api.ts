export interface ApiResponse<T> { success: boolean; data: T; meta?: PaginationMeta; error?: string; }
export interface PaginationMeta { page: number; limit: number; total: number; totalPages: number; }
export type ApiError = { success: false; error: string; details?: Record<string, string[]> };