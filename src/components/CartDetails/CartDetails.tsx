import type { CartItem } from "../../types/cart";
import type { Book } from "../../types/book";

type CartDetailsProps = {
    cartItems: CartItem[];
    books: Book[];
}

export function CartDetails({ cartItems, books }: CartDetailsProps) {

    return (
        <div>
            <h2>Cart Details</h2>
            <ul>
                {cartItems.map((cartItem) => {
                    const book = books.find((book) => book.id === cartItem.bookId);

                    if (!book) {
                        return null;
                    }

                    const subtotal = book.price * cartItem.quantity;

                    return (
                        <li key={cartItem.bookId}>
                            {book.title}
                            <p>Quantity: {cartItem.quantity}</p>
                            <p>Price: {book.price}</p>
                            <p>Subtotal: {subtotal.toFixed(2)}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}