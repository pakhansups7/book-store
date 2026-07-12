import type { Book } from "../types/book";

export function sortBooks(books: Book[], sortValue: string) {
    const sortedBooks = [...books];

    if (sortValue === "price-asc") {
        return sortedBooks.sort((a, b) => a.price - b.price);
    }

    if (sortValue === "price-desc") {
        return sortedBooks.sort((a, b) => b.price - a.price);
    }

    if (sortValue === "rating-desc") {
        return sortedBooks.sort((a, b) => b.rating - a.rating);
    }

    return sortedBooks;
}