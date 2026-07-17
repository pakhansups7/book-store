import { useState, useEffect } from "react";
import { books } from "./data/books";
import { BookList } from "./components/BookList/BookList";
import { BookControls } from "./components/BookControls/BookControls";
import { sortBooks } from "./utils/sortBooks";
import { filterBooks } from "./utils/filterBooks";
import type { SortValue } from "./types/sort";
import type { CartItem } from "./types/cart";
import { CartSummary } from "./components/CartSummary/CartSummary";

function App() {
    const [searchValue, setSearchValue] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("All");
    const [sortValue, setSortValue] = useState<SortValue>("default");
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [favoriteBookIds, setFavoriteBookIds] = useState<number[]>(() => {
        const savedFavoriteBookIds = localStorage.getItem("favoriteBookIds");

        if (savedFavoriteBookIds) {
            return JSON.parse(savedFavoriteBookIds);
        }

        return [];
    });

    useEffect(() => {
        localStorage.setItem("favoriteBookIds", JSON.stringify(favoriteBookIds));
    }, [favoriteBookIds]);

    const filteredBooks = filterBooks(
        books,
        searchValue,
        selectedGenre,
        showFavoritesOnly,
        favoriteBookIds
    );

    const genres = ["All", ...new Set(books.map(book => book.genre))];

    const sortedBooks = sortBooks(filteredBooks, sortValue);

    const cartItemsCount = cartItems.reduce((acc, item) => {
        return acc + item.quantity;
    }, 0);

    const cartTotal = cartItems.reduce((acc, item) => {
        const currentBook = books.find((book) => book.id === item.bookId);
        if (currentBook) {
            return acc + currentBook.price * item.quantity;
        }
        return acc;
    }, 0);

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

    return (
        <>
            <CartSummary
                cartItemsCount={cartItemsCount}
                cartTotal={cartTotal}
            />

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
            />

            {sortedBooks.length === 0 ? (
                <p>No books found</p>
            ) : (
                <BookList
                    books={sortedBooks}
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