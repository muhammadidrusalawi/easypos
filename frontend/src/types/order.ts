
export interface OrderItem {
    menu_id: string;
    menu: {
        id: string;
        name: string;
        price: number;
    }
    quantity: number;
}

export interface Order {
    id: string;
    customer_name: string;
    OrderItem: OrderItem[];
    created_at?: string;
    total?: number;
}

export type OrdersResponse = Order[];