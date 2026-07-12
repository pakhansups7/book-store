import { useState, useEffect } from "react";
import { books } from "./data/books";
import { BookList } from "./components/BookList/BookList";
import { BookControls } from "./components/BookControls/BookControls";
import { sortBooks } from "./utils/sortBooks";
import { filterBooks } from "./utils/filterBooks";

function App() {
    const [searchValue, setSearchValue] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("All");
    const [sortValue, setSortValue] = useState("default");
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
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

    function toggleFavorite(bookId: number) {
        setFavoriteBookIds((prevFavoriteBookIds) => {
            const isFavorite = prevFavoriteBookIds.includes(bookId);

            if (isFavorite) {
                return prevFavoriteBookIds.filter((id) => id !== bookId);
            }

            return [...prevFavoriteBookIds, bookId];
        });
    }

    return (
        <>
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
                />
            )}

        </>
    );
}

export default App;