import { Message } from './message';

export interface User {
    id: number;
    name: string;
    image: string;
    status: string;
    messages: Message[];
    lastSeen: string;
}



export interface UserCred {

    phoneNumber: string,
    password: string,
}

export interface ValideOtp {
    UserName: string,
    otp: string
}
export interface ResendOtp {
    userName: string,
    phoneNumber: string
}
export interface UserLogin {
    userId: string;
    token: string;
    isSuccess: boolean;
    message: string;
    data: Data;
}

export interface Data {
    email: string;
    userName: string;
    phoneNumber: string;
    regSource: number;
    uuId: string;
    fullName: string;
}
export interface VendorDetails {
    vendorId: number
    id: number
    uuid: string
    businessName: string
    businessTypeId: number
    businessAddress: string
    phoneNumber: string
    city: string
    localGovArea: string
    regionOrState: string
    country: string
    status: number
    businessLogo: string
    cacCertificate: any
    openinghours: any
    cuisineType: any
    restaurantBio: any
    openDays: any
    displayPicture: any
    prepTime: any
    createdOn: any
    rating: number
    businessCategory: string
}
export enum RequestStatus {
    Pending = 'PENDING',
    PendingVerification = 'PENDING VER',
    PendingApproval = 'PENDING APP',
    Approved = 'APPROVED',
    Suspended = 'SUSPENDED',
    Rejected = 'REJECTED',
    Removed = 'REMOVED'
}

export interface VendorApprovalRequest {
    uuid: string
    businessName: string
}
// export interface VendorDetails {
//     CuisineType: string;
//     businessPhone: string;
//     RestaurantBio: string;
//     uuid:            string;
//     businessName:    string;
//     businessTypeId:  number;
//     businessAddress: string;
//     phoneNumber:     string;
//     city:            string;
//     localGovArea:    string;
//     regionOrState:   string;
//     country:         string;
//     businessLogo:    string;
//     cacCertificate:  string;
//     isActive:        boolean;
//     openingTime:     string;
//     closingTime:     string;
//     openDays:        string;
//     displayPicture:  string;
//     prepTime:        string;
//     rating:          number;
//     vendorId:         number;
// }

export interface CommonTypes {
    id: number;
    Name: string;
    isActive: boolean;
    description: string;
}

export interface Roles {
    id: string;
    roleName: string;
}
export type GetRole = Pick<Roles,'roleName'>

export interface AdminUser {
    id: string
    emailAddress: string
    userName: string
    phoneNumber: string
    regSource: number
    uuId: string
    fullName: string
    activeStatus: any
    createdOn: string
    roles: string[]
}

export type RegisterUser = Pick<AdminUser,'activeStatus' | 'createdOn'|'uuId' >
export type GetAdminUsers = Partial<AdminUser>
export type UpdateAdminUsers = Partial<AdminUser >

