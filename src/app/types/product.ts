interface InventoryStatus {
    label: string;
    value: string;
}
// export interface Product {
//     id?: string;
//     code?: string;
//     name?: string;
//     description?: string;
//     price?: number;
//     quantity?: number;
//     inventoryStatus?: InventoryStatus;
//     category?: string;
//     image?: string;
//     rating?: number;
// }

export interface Product {
    productId: number
    vendorId: string
    productName: string
    categoryId: number
    description: string
    productCode: any
    typeId: number
    suk: any
    price: number
    instock: boolean
    isActive: boolean
    imgUrl: string
    categoryName: string
    menuTypeName: string
    isSelected: boolean
}

export interface CategoryResponse {
    data: Categories[]
    responsCode: number
    description: string
}

export interface Categories {
    id: number
    categoryName: string
    description: string
    imageUrl: string
    isActive: boolean
}

export interface Tag {
    id: number
    tagName: string
    isActive: boolean
}

export interface OtherProducts {
    menuType: string
    products: OtherProduct[]
}

export interface OtherProduct {
    id: number
    imgUrl: string
    productName: string
    price: number
    description: string
    selected: boolean
    assProductId: number
}

export interface DocumentTypes {
    documentName: string
    discription: string
    isActive: boolean
}


export interface AssociateProduct {
    associatProducts: AssociatedProduct[]
}
export interface AssociatedProduct {
    productId: number;
    MainProductId: number;
}

export interface MenuType {
    id: number;
    typeName: string;
    imgLink: string;
    isMain: boolean;
    categoryName: null;
    categoryId: number;
}
