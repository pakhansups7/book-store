
export type OrderItem = {
    bookId: number;
    title: string;
    price: number;
    quantity: number;
    subtotal: number;
};

export type Order = {
    id: number;
    items: OrderItem[];
    total: number;
    createdAt: string;
};