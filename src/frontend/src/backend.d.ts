import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: bigint;
    inStock: boolean;
    name: string;
    description: string;
    category: string;
    price: bigint;
}
export interface backendInterface {
    getAllProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    getStoreInfo(): Promise<{
        name: string;
        address: string;
        timings: string;
    }>;
}
