
type StockStatusProps = {
    stock: number;
};

export function StockStatus({ stock }: StockStatusProps) {
    const isOutOfStock = stock === 0;
    const isLowStock = stock > 0 && stock < 3;

    return (
        isOutOfStock ? <p>Out of stock</p> :(isLowStock ? <p>Low stock: {stock}</p> : <p>In stock: {stock}</p>)
    )
}