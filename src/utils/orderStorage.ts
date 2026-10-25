import type { Order } from "../types/order";

export function getOrdersFromStorage(): Order[] {
    const ordersFromStorage = localStorage.getItem('orders');

    if (!ordersFromStorage) {
        return [];
    }

    try {
        const orders = JSON.parse(ordersFromStorage);

        if (Array.isArray(orders)) {
            return orders;
        }
        return [];
    } catch {
        return [];
    }
}

export function saveOrdersToStorage(orders: Order[]) {
    localStorage.setItem("orders", JSON.stringify(orders));
}