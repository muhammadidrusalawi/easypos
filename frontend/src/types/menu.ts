import type {Category} from "@/types/category.ts";

export interface Menu {
    id: string;
    name: string;
    price: number;
    image: string;
    category_id: number;
    category?: Category;
}

export type MenusResponse = Menu[];