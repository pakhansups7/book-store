import type { Book } from "../../types/book";
import { BookCard } from "../BookCard/BookCard";

type BookListProps = {
    books: Book[]
    favoriteBookIds: number[]
    onAddToCart: (bookId: number) => void;
    onToggleFavorite: (bookId: number) => void
    onDecreaseCartItem: (bookId: number) => void;
    onRemoveFromCart: (bookId: number) => void;
}

export function BookList({ books, favoriteBookIds, onToggleFavorite, onAddToCart, onDecreaseCartItem, onRemoveFromCart }: BookListProps) {
    return (
        <ul>
            {books.map(book =>
                <BookCard
                    key={book.id}
                    book={book}
                    isFavorite={favoriteBookIds.includes(book.id)}
                    onToggleFavorite={() => onToggleFavorite(book.id)}
                    onDecreaseCartItem={() => onDecreaseCartItem(book.id)}
                    onAddToCart={() => onAddToCart(book.id)}
                    onRemoveFromCart={() => onRemoveFromCart(book.id)}
                />
            )}
        </ul>
    );
}