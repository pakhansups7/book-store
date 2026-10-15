
type CartSummaryProp = {
    cartItemsCount: number;
    cartTotal: number;
    onClearCart: () => void;
    onCheckout: () => void;
};

export function CartSummary({ cartItemsCount, cartTotal, onClearCart, onCheckout }: CartSummaryProp) {
    return (
        <div>
            <p>Cart: {cartItemsCount}</p>
            <p>Total: {cartTotal.toFixed(2)}</p>
            {cartItemsCount > 0 && (
                <>
                    <button onClick={onClearCart}>Clear Cart</button>
                    <button onClick={onCheckout}>Сделать заказ</button>
                </>
            )}
        </div>
    );
}