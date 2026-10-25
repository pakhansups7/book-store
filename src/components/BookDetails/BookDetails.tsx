import { useEffect } from "react";
import type { Book } from "../../types/book";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";
import { CartActions } from "../CartActions/CartActions";
import "./BookDetails.css";
import { StockStatus } from "../StockStatus/StockStatus";

type BookDetailsProps = {
    book: Book;
    isFavorite: boolean;
    isMaxQuantityReached: boolean;
    quantityInCart: number;
    onAddToCart: () => void;
    onDecreaseCartItem: () => void;
    onRemoveFromCart: () => void;
    onToggleFavorite: () => void;
    onClose: () => void;
};

export function BookDetails({book, isFavorite, isMaxQuantityReached, quantityInCart, onAddToCart, onDecreaseCartItem, onToggleFavorite, onRemoveFromCart, onClose, }: BookDetailsProps) {

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className="book-details-overlay" onClick={onClose}>
            <section
                className="book-details"
                onClick={(event) => event.stopPropagation()}
            >
                <h2>{book.title}</h2>
                <p>{book.author}</p>
                <p>{book.genre}</p>
                <p>{book.price}</p>
                <p>{book.rating}</p>
                <p>{book.description}</p>

                <StockStatus stock={book.stock} />

                <button onClick={onClose}>Close</button>

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
            </section>
        </div>
    );
}