import { useState } from "react";
import type { SortValue } from "../types/sort";
import type { Book } from "../types/book";
import { filterBooks } from "../utils/filterBooks";
import { sortBooks } from "../utils/sortBooks";

export function useBookFilters(books: Book[], favoriteBookIds: number[]) {
    const [searchValue, setSearchValue] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("All");
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [sortValue, setSortValue] = useState<SortValue>("default");

    const hasActiveFilters =
        searchValue !== "" ||
        selectedGenre !== "All" ||
        sortValue !== "default" ||
        showFavoritesOnly;

    const filteredBooks = filterBooks(
        books,
        searchValue,
        selectedGenre,
        showFavoritesOnly,
        favoriteBookIds
    );

    const visibleBooks = sortBooks(filteredBooks, sortValue);

    function handleResetFilters() {
        setSearchValue("");
        setSelectedGenre("All");
        setSortValue("default");
        setShowFavoritesOnly(false);
    }

    function handleToggleShowFavoritesOnly() {
        setShowFavoritesOnly((prev) => !prev);
    }

    return {
        searchValue,
        setSearchValue,

        selectedGenre,
        setSelectedGenre,

        sortValue,
        setSortValue,

        showFavoritesOnly,
        setShowFavoritesOnly,

        hasActiveFilters,
        handleResetFilters,
        handleToggleShowFavoritesOnly,

        visibleBooks,
    };
}