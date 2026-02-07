import { Pagination } from "./response";

export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    name?: string;
    image?: string;
}

export interface Customer {
    id?: number;
    name?: string;
    country?: Country;
    company?: string;
    date?: string;
    status?: string;
    activity?: number;
    representative?: Representative;
}

export interface MobileUsers {
    uuId: string
    phoneNumber: string
    fullName: string
    email: string
    address: string
    userName: string
    createdOn: string
    orderDate: string
    orderCount: number
    isActive: boolean
}

export interface MobileUserData extends Pagination {
    data: MobileUsers[]
}


