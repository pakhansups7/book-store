import { useState, useEffect } from "react";
import type { CartItem } from "../types/cart";
import type { Book } from "../types/book";
import { getCartItemsFromStorage, saveCartItemsToStorage } from "../utils/cartStorage";
import { getCartItemsCount, getCartTotal, sanitizeCartItems } from "../utils/cart";

export function useCart(books: Book[]) {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const dataStorage = getCartItemsFromStorage();
        return sanitizeCartItems(dataStorage, books);
    });

    useEffect(() => {
        saveCartItemsToStorage(cartItems);
    }, [cartItems]);

    const cartItemsCount = getCartItemsCount(cartItems);
    const cartTotal = getCartTotal(cartItems, books);

    function handleAddToCart(bookId: number) {
        setCartItems((prevCartItems) => {

            const currentBook = books.find((book) => book.id === bookId);

            if (!currentBook) {
                return prevCartItems;
            }

            if (currentBook.stock <= 0) {
                return prevCartItems;
            }

            const existingCartBook = prevCartItems.find((item) => item.bookId === bookId);

            if (existingCartBook) {
                if (existingCartBook.quantity >= currentBook.stock) {
                    return prevCartItems;
                }
                return prevCartItems.map((item) => {
                    if (item.bookId === bookId) {
                        return {
                            ...item,
                            quantity: item.quantity + 1,
                        };
                    }

                    return item;
                });
            }

            return [
                ...prevCartItems,
                {bookId: bookId, quantity: 1},
            ];
        });
    }

    function handleDecreaseCartItem(bookId: number) {
        setCartItems((prevCartItems) => {
            const currentItem = prevCartItems.find((item) => {
                return item.bookId === bookId;
            });

            if (!currentItem) {
                return prevCartItems;
            }

            if (currentItem.quantity === 1) {
                return prevCartItems.filter((item) => {
                    return item.bookId !== bookId;
                });
            }

            return prevCartItems.map((item) => {
                if (item.bookId === bookId) {
                    return {
                        ...item,
                        quantity: item.quantity - 1,
                    };
                }
                return item;
            });
        });
    }

    function handleRemoveFromCart(bookId: number) {
        setCartItems((prevCartItems) => {
            return prevCartItems.filter((item) => bookId !== item.bookId);
        });
    }

    function handleClearCart() {
        setCartItems([]);
    }

    return {
        cartItems,
        cartItemsCount,
        cartTotal,
        handleAddToCart,
        handleDecreaseCartItem,
        handleRemoveFromCart,
        handleClearCart
    };
}