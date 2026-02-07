import { Pagination } from "./response"

export interface Order {
    id: number
    orderCode: number
    vendorId: number
    customerId: number
    isActive: boolean
    totalAmount: number
    status: number
    paymentType: number
    items: OrderItem[]
}



export interface OrderItem {
    productId: number
    totalPrice: number
    quantity: number
    unitPrice: number
}


export interface OrderItems {
    itemName: string;
    quantity: number;
    price: number;
    businessName: string;
    businessAddress: string;
    prepTime: string;
}

export interface Orders {
    orderId: string;
    orderTime: string;
    customerName: string;
    riderName: string;
    item: OrderItem;
    status: string;
    totalAmount?: number;
    paymentStatus?: string;
}

export interface CustomerOrder {
    id: number
    orderCode: number
    vendorId: number
    customerId: number
    vendor: any
    customer: any
    isActive: boolean
    createdOn: string
    updatedOn: string
    totalCount: number
    totalAmount: number
    status: number
    paymentType: number
    items: Item[]
}

export interface Item {
    id: number
    orderId: number
    orderCode: number
    productId: number
    totalPrice: number
    quantity: number
    unitPrice: number
    productName: any
}

export interface OrderSummary {
    id: number
    orderCode: string
    vendorId: number
    customerId: number
    vendor: string
    customer: string
    isActive: boolean
    createdOn: string
    updatedOn: string
    totalCount: number
    totalAmount: number
    status: number
    paymentType: number
}

export interface OrderData extends Pagination {
    orderList: OrderSummary[]
}

export enum OrderStatus {
    Pending,
    Receviced,
    Dispatch,
    Delivered
}
