import type { Book } from "../../types/book";

type BookCardProps = {
    book: Book;
    isFavorite: boolean;
    onAddToCart: () => void;
    onToggleFavorite: () => void;
    onDecreaseCartItem: () => void;
    onRemoveFromCart: () => void;
};

export function BookCard({ book, isFavorite, onToggleFavorite, onAddToCart, onDecreaseCartItem, onRemoveFromCart }: BookCardProps) {
    return (
        <li>
            {book.title}
            <p>{book.author}</p>
            <p>{book.genre}</p>
            <p>{book.price}</p>
            <p>{book.rating}</p>
            <p>{book.description}</p>
            <button onClick={onToggleFavorite}>{isFavorite ? "Удалить из избранного" : "Добавить в избранное"}</button>
            <button onClick={onAddToCart}>Добавить в корзину</button>
            <button onClick={onDecreaseCartItem}>-</button>
            <button onClick={onRemoveFromCart}>Удалить из корзины</button>
        </li>
    );
}