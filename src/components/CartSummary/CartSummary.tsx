
type CartSummaryProp = {
    cartItemsCount: number;
    cartTotal: number;
};

export function CartSummary({ cartItemsCount, cartTotal }: CartSummaryProp) {
    return (
        <div>
            <p>Cart: {cartItemsCount}</p>
            <p>Total: {cartTotal.toFixed(2)}</p>
        </div>
    );
}