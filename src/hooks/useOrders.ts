import { useEffect, useState } from "react";
import type { Order } from "../types/order";
import {
    getOrdersFromStorage,
    saveOrdersToStorage,
} from "../utils/orderStorage";

export function useOrders() {
    const [lastOrder, setLastOrder] = useState<Order | null>(null);

    const [orders, setOrders] = useState<Order[]>(() => {
        return getOrdersFromStorage();
    });

    useEffect(() => {
        saveOrdersToStorage(orders);
    }, [orders]);

    function handleAddOrder(order: Order) {
        setLastOrder(order);

        setOrders((prevOrders) => {
            return [order, ...prevOrders];
        });
    }

    function handleClearOrders() {
        setOrders([]);
        setLastOrder(null);
    }

    return {
        lastOrder,
        orders,
        handleAddOrder,
        handleClearOrders,
    };
}