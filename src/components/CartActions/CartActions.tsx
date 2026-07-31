
type CartActionsProps = {
    quantityInCart: number;
    onAddToCart: () => void;
    onDecreaseCartItem: () => void;
    onRemoveFromCart: () => void;
};

export function CartActions({ quantityInCart, onAddToCart, onDecreaseCartItem, onRemoveFromCart }: CartActionsProps) {
    return (
        <>
            <button onClick={onAddToCart}>Добавить в корзину</button>

            {quantityInCart > 0 && (
                <p>In cart: {quantityInCart}</p>
            )}

            {quantityInCart > 0 && (
                <>
                    <button onClick={onDecreaseCartItem}>-</button>
                    <button onClick={onRemoveFromCart}>Удалить из корзины</button>
                </>
            )}
        </>
    );
}