import type { Book } from "../../types/book";
import { BookCard } from "../BookCard/BookCard";
import type { CartItem } from "../../types/cart";

type BookListProps = {
    books: Book[];
    cartItems: CartItem[];
    favoriteBookIds: number[];
    onSelectBook: (bookId: number) => void;
    onAddToCart: (bookId: number) => void;
    onToggleFavorite: (bookId: number) => void
    onDecreaseCartItem: (bookId: number) => void;
    onRemoveFromCart: (bookId: number) => void;
}

export function BookList({ books, cartItems, favoriteBookIds, onSelectBook, onToggleFavorite, onAddToCart, onDecreaseCartItem, onRemoveFromCart }: BookListProps) {
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
                        onSelectBook={onSelectBook}
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