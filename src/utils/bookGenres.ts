import type { Book } from "../types/book";

export function getBookGenres(books: Book[]): string[] {
    return ["All", ...new Set(books.map(book => book.genre))];
}