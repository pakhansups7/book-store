import type { CartItem } from "../types/cart";
import type { Book } from "../types/book";

export function getCartItemsCount(cartItems: CartItem[]): number {
    return cartItems.reduce((acc, item) => {
        return acc + item.quantity;
    }, 0);
}

export function getCartTotal(cartItems: CartItem[], books: Book[]): number {
    return cartItems.reduce((acc, cartItem) => {
        const currentBook = books.find((book) => book.id === cartItem.bookId);
        if (currentBook) {
            return acc + currentBook.price * cartItem.quantity;
        }
        return acc;
    }, 0);
}