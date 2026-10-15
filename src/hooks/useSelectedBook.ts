import { useState, useEffect } from "react";
import type { Book } from "../types/book";

export function useSelectedBook(books: Book[]) {
    const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

    const selectedBook = books.find((book) => book.id === selectedBookId);

    function handleSelectBook(bookId: number) {
        setSelectedBookId(bookId);
    }

    function handleCloseBookDetails() {
        setSelectedBookId(null);
    }

    useEffect(() => {
        if (!selectedBook) {
            return;
        }

        const originalOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [selectedBook]);

    useEffect(() => {
        if (!selectedBook) {
            return;
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setSelectedBookId(null);
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedBook]);

    return {
        selectedBook,
        handleSelectBook,
        handleCloseBookDetails,
    };
}