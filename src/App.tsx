import { useCart } from "./hooks/useCart";
import { useFavorites } from "./hooks/useFavorites";
import { useBookFilters } from "./hooks/useBookFilters";
import { books } from "./data/books";
import { BookList } from "./components/BookList/BookList";
import { BookControls } from "./components/BookControls/BookControls";
import { CartDetails } from "./components/CartDetails/CartDetails";
import { CartSummary } from "./components/CartSummary/CartSummary";
import { getBookGenres } from "./utils/bookGenres";
import { BookDetails } from "./components/BookDetails/BookDetails";
import { useSelectedBook } from "./hooks/useSelectedBook";
import { useEffect, useState } from "react";
import { AddBookForm } from "./components/AddBookForm/AddBookForm";
import type { Book } from "./types/book";
import { getBooksFromStorage, saveBooksToStorage} from "./utils/bookStorage";
import { OrderHistory } from "./components/OrderHistory/OrderHistory";
import { useOrders } from "./hooks/useOrders";

function App() {
    const [bookList, setBookList] = useState<Book[]>(() => {
        const booksFromStorage = getBooksFromStorage();

        if (booksFromStorage.length === 0) {
            return books;
        }

        return booksFromStorage;
    });

    const {
        lastOrder,
        orders,
        handleAddOrder,
        handleClearOrders,
    } = useOrders();

    const {
        favoriteBookIds,
        toggleFavorite,
    } = useFavorites();

    const {
        searchValue,
        setSearchValue,

        selectedGenre,
        setSelectedGenre,

        sortValue,
        setSortValue,

        showFavoritesOnly,

        hasActiveFilters,
        handleResetFilters,
        handleToggleShowFavoritesOnly,

        visibleBooks,
    } = useBookFilters(bookList, favoriteBookIds);

    const {
        cartItems,
        cartItemsCount,
        cartTotal,
        handleAddToCart,
        handleDecreaseCartItem,
        handleRemoveFromCart,
        handleClearCart
    } = useCart(bookList);

    const {
        selectedBook,
        handleSelectBook,
        handleCloseBookDetails,
    } = useSelectedBook(bookList);

    const genres = getBookGenres(bookList);

    const isSelectedBookFavorite = selectedBook ? favoriteBookIds.includes(selectedBook.id) : false;

    const isBookListEmpty = visibleBooks.length === 0;

    const isFavoritesEmpty = showFavoritesOnly && favoriteBookIds.length === 0;

    const selectedBookCartItem = selectedBook ? cartItems.find((item) => item.bookId === selectedBook.id) : undefined;

    const selectedBookQuantityInCart = selectedBookCartItem ? selectedBookCartItem.quantity : 0;

    const isMaxQuantityReached = selectedBook ? selectedBookQuantityInCart >= selectedBook.stock : false;

    function handleAddBook(newBook: Book) {
        setBookList((prevBooks) => {
            return [...prevBooks, newBook];
        });
    }

    useEffect(() => {
        saveBooksToStorage(bookList);
    }, [bookList]);

    function handleCheckout() {
        if (cartItems.length === 0) {
            return;
        }

        const orderItems = cartItems.map((cartItem) => {
            const currentBook = bookList.find(
                (book) => book.id === cartItem.bookId
            );

            if (!currentBook) {
                return null;
            }

            return {
                bookId: cartItem.bookId,
                title: currentBook.title,
                price: currentBook.price,
                quantity: cartItem.quantity,
                subtotal: currentBook.price * cartItem.quantity,
            };
        }).filter((orderItem) => orderItem !== null);

        const total = orderItems.reduce((acc, item) => {
            return acc + item.subtotal;
        }, 0);

        const order = {
            id: Date.now(),
            items: orderItems,
            total: total,
            createdAt: new Date().toISOString(),
        };

        setBookList((prevBooks) => {
            return prevBooks.map((book) => {
                const cartItem = cartItems.find(
                    (item) => item.bookId === book.id
                );

                if (!cartItem) {
                    return book;
                }

                return {
                    ...book,
                    stock: book.stock - cartItem.quantity,
                };
            });
        });

        handleAddOrder(order);
        handleClearCart();
    }

    return (
        <>
            <CartSummary
                cartItemsCount={cartItemsCount}
                cartTotal={cartTotal}
                onClearCart={handleClearCart}
                onCheckout={handleCheckout}
            />

            {lastOrder && (
                <div>
                    <p>Order placed successfully!</p>
                    <p>Order ID : {lastOrder.id}</p>
                    <p>Total: {lastOrder.total.toFixed(2)}</p>
                </div>
            )}

            <OrderHistory
                orders={orders}
                onClearOrders={handleClearOrders}
            />

            <CartDetails
                cartItems={cartItems}
                books={bookList}
                onAddToCart={handleAddToCart}
                onDecreaseCartItem={handleDecreaseCartItem}
                onRemoveFromCart={handleRemoveFromCart}
            />

            <AddBookForm
                onAddBook={handleAddBook}
            />

            <BookControls
                favoriteCount={favoriteBookIds.length}
                showFavoritesOnly={showFavoritesOnly}
                onToggleShowFavoritesOnly={handleToggleShowFavoritesOnly}
                searchValue={searchValue}
                onSetSearchValue={setSearchValue}
                genres={genres}
                selectedGenre={selectedGenre}
                onSetSelectedGenre={setSelectedGenre}
                sortValue={sortValue}
                onSetSortValue={setSortValue}
                onResetFilters={handleResetFilters}
                hasActiveFilters={hasActiveFilters}
            />

            {(isBookListEmpty && isFavoritesEmpty) ? <p>No favorite books yet</p>: ( isBookListEmpty ?
                <p>No books found</p> : (
                <BookList
                    books={visibleBooks}
                    cartItems={cartItems}
                    onSelectBook={handleSelectBook}
                    favoriteBookIds={favoriteBookIds}
                    onToggleFavorite={toggleFavorite}
                    onAddToCart={handleAddToCart}
                    onDecreaseCartItem={handleDecreaseCartItem}
                    onRemoveFromCart={handleRemoveFromCart}
                />
            ))}

            {selectedBook && (
                <BookDetails
                    book={selectedBook}
                    onClose={handleCloseBookDetails}
                    isMaxQuantityReached={isMaxQuantityReached}
                    isFavorite={isSelectedBookFavorite}
                    quantityInCart={selectedBookQuantityInCart}
                    onAddToCart={() => handleAddToCart(selectedBook.id)}
                    onDecreaseCartItem={() => handleDecreaseCartItem(selectedBook.id)}
                    onRemoveFromCart={() => handleRemoveFromCart(selectedBook.id)}
                    onToggleFavorite={() => toggleFavorite(selectedBook.id)}
                />
            )}
        </>
    );
}

export default App;