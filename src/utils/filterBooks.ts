import type { Book } from "../types/book";

export function filterBooks(
    books: Book[],
    searchValue: string,
    selectedGenre: string,
    showFavoritesOnly: boolean,
    favoriteBookIds: number[]
): Book[] {
    const normalizedSearchValue = searchValue.toLowerCase();
    return books.filter((book) => {
        const matchedTitle = book.title.toLowerCase().includes(normalizedSearchValue);
        const matchedGenre = selectedGenre === "All" || book.genre === selectedGenre;
        const matchedFavorite = !showFavoritesOnly || favoriteBookIds.includes(book.id);
        return matchedGenre && matchedTitle && matchedFavorite;
    });
}