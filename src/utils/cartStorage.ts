import type { CartItem } from "../types/cart";

const CART_ITEMS_STORAGE_KEY = "cartItems";

export function getCartItemsFromStorage(): CartItem[] {
    const cartItemsFromStorage = localStorage.getItem(CART_ITEMS_STORAGE_KEY);

    if (!cartItemsFromStorage) {
        return [];
    }

    try {
        const parsedCartItems = JSON.parse(cartItemsFromStorage);

        if (Array.isArray(parsedCartItems)) {
            return parsedCartItems;
        }
        return [];
    } catch {
        return [];
    }
}

export function saveCartItemsToStorage(cartItems: CartItem[]): void {
    localStorage.setItem(CART_ITEMS_STORAGE_KEY, JSON.stringify(cartItems));
}