import type { Book } from "../../types/book";
import { CartActions } from "../CartActions/CartActions";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";
import { StockStatus } from "../StockStatus/StockStatus";

type BookCardProps = {
    book: Book;
    isFavorite: boolean;
    quantityInCart: number;
    onSelectBook: (bookId: number) => void;
    onAddToCart: () => void;
    onDecreaseCartItem: () => void;
    onRemoveFromCart: () => void;
    onToggleFavorite: () => void;
};



export function BookCard({ book, quantityInCart, onSelectBook, isFavorite, onAddToCart, onDecreaseCartItem, onRemoveFromCart, onToggleFavorite }: BookCardProps) {
    const stock = book.stock;
    const isMaxQuantityReached = quantityInCart >= stock;

    return (
        <li>
            {book.title}
            <p>{book.author}</p>
            <p>{book.genre}</p>
            <p>{book.price}</p>
            <StockStatus
                stock={stock}
            />
            <p>{book.rating}</p>
            <p>{book.description}</p>

            <button onClick={() => onSelectBook(book.id)}>
                Details
            </button>

            <FavoriteButton
                isFavorite={isFavorite}
                onToggleFavorite={onToggleFavorite}
            />

            <CartActions
                quantityInCart={quantityInCart}
                onAddToCart={onAddToCart}
                isMaxQuantityReached={isMaxQuantityReached}
                onDecreaseCartItem={onDecreaseCartItem}
                onRemoveFromCart={onRemoveFromCart}
            />
        </li>
    );
}