import type { Book } from "../../types/book";
import { CartActions } from "../CartActions/CartActions";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";

type BookCardProps = {
    book: Book;
    isFavorite: boolean;
    quantityInCart: number;
    onAddToCart: () => void;
    onDecreaseCartItem: () => void;
    onRemoveFromCart: () => void;
    onToggleFavorite: () => void;
};

export function BookCard({ book, quantityInCart, isFavorite, onAddToCart, onDecreaseCartItem, onRemoveFromCart, onToggleFavorite }: BookCardProps) {
    return (
        <li>
            {book.title}
            <p>{book.author}</p>
            <p>{book.genre}</p>
            <p>{book.price}</p>
            <p>{book.rating}</p>
            <p>{book.description}</p>

            <FavoriteButton
                isFavorite={isFavorite}
                onToggleFavorite={onToggleFavorite}
            />

            <CartActions
                quantityInCart={quantityInCart}
                onAddToCart={onAddToCart}
                onDecreaseCartItem={onDecreaseCartItem}
                onRemoveFromCart={onRemoveFromCart}
            />
        </li>
    );
}