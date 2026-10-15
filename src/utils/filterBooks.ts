import type { Book } from "../types/book";

export function filterBooks(
    books: Book[],
    searchValue: string,
    selectedGenre: string,
    showFavoritesOnly: boolean,
    favoriteBookIds: number[]
): Book[] {
    const normalizedSearchValue = searchValue.toLowerCase().trim();
    return books.filter((book) => {
        const matchedTitle = book.title.toLowerCase().includes(normalizedSearchValue);
        const matchedAuthor = book.author.toLowerCase().includes(normalizedSearchValue);
        const matchedSearch = matchedAuthor || matchedTitle;
        const matchedGenre = selectedGenre === "All" || book.genre === selectedGenre;
        const matchedFavorite = !showFavoritesOnly || favoriteBookIds.includes(book.id);
        return matchedGenre && matchedSearch && matchedFavorite;
    });
}