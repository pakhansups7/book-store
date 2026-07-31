import type { Book } from "../../types/book";
import { BookCard } from "../BookCard/BookCard";
import type { CartItem } from "../../types/cart";

type BookListProps = {
    books: Book[]
    cartItems: CartItem[]
    favoriteBookIds: number[]
    onAddToCart: (bookId: number) => void;
    onToggleFavorite: (bookId: number) => void
    onDecreaseCartItem: (bookId: number) => void;
    onRemoveFromCart: (bookId: number) => void;
}

export function BookList({ books, cartItems, favoriteBookIds, onToggleFavorite, onAddToCart, onDecreaseCartItem, onRemoveFromCart }: BookListProps) {
    return (
        <ul>
            {books.map((book) => {
                const cartItem = cartItems.find((item) => item.bookId === book.id);

                return (
                    <BookCard
                        key={book.id}
                        book={book}
                        quantityInCart={cartItem ? cartItem.quantity : 0}
                        isFavorite={favoriteBookIds.includes(book.id)}
                        onToggleFavorite={() => onToggleFavorite(book.id)}
                        onDecreaseCartItem={() => onDecreaseCartItem(book.id)}
                        onAddToCart={() => onAddToCart(book.id)}
                        onRemoveFromCart={() => onRemoveFromCart(book.id)}
                    />
                );
            })}
        </ul>
    );
}