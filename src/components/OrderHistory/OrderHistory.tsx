import type { Order } from "../../types/order";

type OrderHistoryProps = {
    orders: Order[];
    onClearOrders: () => void;
};

export function OrderHistory({ orders, onClearOrders }: OrderHistoryProps) {
    return (
        <div>
            <h2>Order History</h2>
            {
                orders.length === 0 ? (
                    <p>Order history is empty</p>
                ) : (
                    orders.map((order) => {
                        return (
                            <div key={order.id}>
                                <p>Order ID: {order.id}</p>
                                <p>Total: {order.total}</p>
                                <p>
                                    Date order:{" "}
                                    {new Date(order.createdAt).toLocaleString()}
                                </p>

                                {order.items.map((item) => {
                                    return (
                                        <div key={item.bookId}>
                                            <p>Title: {item.title}</p>
                                            <p>Price: {item.price}</p>
                                            <p>Quantity: {item.quantity}</p>
                                            <p>Subtotal: {item.subtotal}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })
                )
            }

            {orders.length > 0 && (
                <button onClick={onClearOrders}>
                    Clear order history
                </button>
            )}
        </div>
    );
}