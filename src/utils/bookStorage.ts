import type { Book } from '../types/book';

const BOOKS_STORAGE_KEY = 'books';

export function getBooksFromStorage(): Book[] {
    const booksFromStorage = localStorage.getItem(BOOKS_STORAGE_KEY);

    if (!booksFromStorage) {
        return [];
    }

    try {
        const parsedBooks = JSON.parse(booksFromStorage);

        if (Array.isArray(parsedBooks)) {
            return parsedBooks;
        }
        return [];
    } catch {
        return [];
    }
}

export function saveBooksToStorage(books: Book[]): void {
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));
}