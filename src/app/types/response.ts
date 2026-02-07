// export interface ApiResponse {
//     Description : string;
//     responsCode : number
// }

export interface ApiResponse<T>  {
    description: string;
    responseCode: number;
    data: T;
}

export interface Pagination {
    pageNumber: number
    pageSize: number
    totalRecords: number
    totalPages: number
}
