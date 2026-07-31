
type CartSummaryProp = {
    cartItemsCount: number;
    cartTotal: number;
    onClearCart: () => void;
};

export function CartSummary({ cartItemsCount, cartTotal, onClearCart }: CartSummaryProp) {
    return (
        <div>
            <p>Cart: {cartItemsCount}</p>
            <p>Total: {cartTotal.toFixed(2)}</p>
            {cartItemsCount > 0 && (
                <button onClick={onClearCart}>Clear Cart</button>
            )}
        </div>
    );
}