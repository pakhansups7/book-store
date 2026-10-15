import type { CartItem } from "../../types/cart";
import type { Book } from "../../types/book";
import { CartActions } from "../CartActions/CartActions";
import { StockStatus } from "../StockStatus/StockStatus";

type CartDetailsProps = {
    cartItems: CartItem[];
    books: Book[];
    onAddToCart: (bookId: number) => void;
    onDecreaseCartItem: (bookId: number) => void;
    onRemoveFromCart: (bookId: number) => void;
};

export function CartDetails({ cartItems, books, onAddToCart, onDecreaseCartItem, onRemoveFromCart }: CartDetailsProps) {

    return (
        <div>
            <h2>Cart Details</h2>
            {cartItems.length === 0 ? <p>Cart is empty</p> :
                <ul>
                    {cartItems.map((cartItem) => {
                        const book = books.find((book) => book.id === cartItem.bookId);
                        if (!book) {
                            return null;
                        }

                        const stock = book.stock;
                        const subtotal = book.price * cartItem.quantity;
                        const isMaxQuantityReached = cartItem.quantity >= book.stock;

                        return (
                            <li key={cartItem.bookId}>
                                {book.title}
                                <p>Price: {book.price}</p>
                                <p>Subtotal: {subtotal.toFixed(2)}</p>

                                <StockStatus
                                    stock={stock}
                                />

                                <CartActions
                                    quantityInCart={cartItem.quantity}
                                    isMaxQuantityReached={isMaxQuantityReached}
                                    onAddToCart={() => onAddToCart(cartItem.bookId)}
                                    onDecreaseCartItem={() => onDecreaseCartItem(cartItem.bookId)}
                                    onRemoveFromCart={() => onRemoveFromCart(cartItem.bookId)}
                                />
                            </li>
                        );
                    })}
                </ul>
            }
        </div>
    );
}