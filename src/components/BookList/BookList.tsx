import type { Book } from "../../types/book";
import { BookCard } from "../BookCard/BookCard";

type BookListProps = {
    books: Book[]
    favoriteBookIds: number[]
    onToggleFavorite: (bookId: number) => void
}

export function BookList({ books, favoriteBookIds, onToggleFavorite }: BookListProps) {
    return (
        <ul>
            {books.map(book =>
                <BookCard
                    key={book.id}
                    book={book}
                    isFavorite={favoriteBookIds.includes(book.id)}
                    onToggleFavorite={() => onToggleFavorite(book.id)}
                />
            )}
        </ul>
    );
}