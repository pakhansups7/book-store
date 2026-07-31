import { useState, useEffect } from "react";
import { books } from "./data/books";
import { BookList } from "./components/BookList/BookList";
import { BookControls } from "./components/BookControls/BookControls";
import { sortBooks } from "./utils/sortBooks";
import { filterBooks } from "./utils/filterBooks";
import { CartDetails } from "./components/CartDetails/CartDetails";
import type { SortValue } from "./types/sort";
import type { CartItem } from "./types/cart";
import { CartSummary } from "./components/CartSummary/CartSummary";
import { getCartItemsFromStorage, saveCartItemsToStorage } from "./utils/cartStorage";
import { getFavoriteBookIdsFromStorage, saveFavoriteBookIdsToStorage } from "./utils/favoriteStorage";
import { getCartItemsCount, getCartTotal } from "./utils/cart";

function App() {
    const [searchValue, setSearchValue] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("All");
    const [sortValue, setSortValue] = useState<SortValue>("default");
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        return getCartItemsFromStorage();
    });
    const [favoriteBookIds, setFavoriteBookIds] = useState<number[]>(() => {
        return getFavoriteBookIdsFromStorage();
    });

    useEffect(() => {
        saveFavoriteBookIdsToStorage(favoriteBookIds);
    }, [favoriteBookIds]);

    useEffect(() => {
        saveCartItemsToStorage(cartItems);
    }, [cartItems]);

    const filteredBooks = filterBooks(
        books,
        searchValue,
        selectedGenre,
        showFavoritesOnly,
        favoriteBookIds
    );

    const genres = ["All", ...new Set(books.map(book => book.genre))];

    const sortedBooks = sortBooks(filteredBooks, sortValue);

    const cartItemsCount = getCartItemsCount(cartItems);

    const cartTotal = getCartTotal(cartItems, books);

    const hasActiveFilters =
        searchValue !== "" ||
        selectedGenre !== "All" ||
        sortValue !== "default" ||
        showFavoritesOnly;

    function toggleFavorite(bookId: number) {
        setFavoriteBookIds((prevFavoriteBookIds) => {
            const isFavorite = prevFavoriteBookIds.includes(bookId);

            if (isFavorite) {
                return prevFavoriteBookIds.filter((id) => id !== bookId);
            }

            return [...prevFavoriteBookIds, bookId];
        });
    }

    function handleAddToCart(bookId: number) {
        setCartItems((prevCartItems) => {
            const existingCartBook = prevCartItems.find((item) => item.bookId === bookId);

            if (existingCartBook) {
                return prevCartItems.map((item) => {
                    if (item.bookId === bookId) {
                        return {
                            ...item,
                            quantity: item.quantity + 1,
                        };
                    }

                    return item;
                });
            }
            return [
                ...prevCartItems,
                {bookId: bookId, quantity: 1},
            ];
        });
    }

    function handleDecreaseCartItem(bookId: number) {
        setCartItems((prevCartItems) => {
            const currentItem = prevCartItems.find((item) => {
                return item.bookId === bookId;
            });

            if (!currentItem) {
                return prevCartItems;
            }

            if (currentItem.quantity === 1) {
                return prevCartItems.filter((item) => {
                    return item.bookId !== bookId;
                });
            }

            return prevCartItems.map((item) => {
                if (item.bookId === bookId) {
                    return {
                        ...item,
                        quantity: item.quantity - 1,
                    };
                }
                return item;
            });
        });
    }

    function handleRemoveFromCart(bookId: number) {
        setCartItems((prevCartItems) => {
            return prevCartItems.filter((item) => bookId !== item.bookId);
        });
    }

    function handleClearCart() {
        setCartItems([]);
    }

    function handleResetFilters() {
        setSearchValue("");
        setSelectedGenre("All");
        setSortValue("default");
        setShowFavoritesOnly(false);
    }

    return (
        <>
            <CartSummary
                cartItemsCount={cartItemsCount}
                cartTotal={cartTotal}
                onClearCart={handleClearCart}
            />

            {cartItemsCount > 0 && (
                <CartDetails
                    cartItems={cartItems}
                    books={books}
                />
            )}

            <BookControls
                favoriteCount={favoriteBookIds.length}
                showFavoritesOnly={showFavoritesOnly}
                onToggleShowFavoritesOnly={() => setShowFavoritesOnly((prev) => !prev)}
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

            {sortedBooks.length === 0 ? (
                <p>No books found</p>
            ) : (
                <BookList
                    books={sortedBooks}
                    cartItems={cartItems}
                    favoriteBookIds={favoriteBookIds}
                    onToggleFavorite={toggleFavorite}
                    onAddToCart={handleAddToCart}
                    onDecreaseCartItem={handleDecreaseCartItem}
                    onRemoveFromCart={handleRemoveFromCart}
                />
            )}

        </>
    );
}

export default App;