
const FAVORITE_BOOK_IDS_STORAGE_KEY = "favoriteBookIds";

export function getFavoriteBookIdsFromStorage(): number[] {
    const savedFavoriteBookIds = localStorage.getItem(FAVORITE_BOOK_IDS_STORAGE_KEY);

    if (!savedFavoriteBookIds) {
        return [];
    }

    try {
        const parsedFavoriteBookIds = JSON.parse(savedFavoriteBookIds);

        if (Array.isArray(parsedFavoriteBookIds)) {
            return parsedFavoriteBookIds;
        }

        return [];
    } catch {
        return [];
    }
}

export function saveFavoriteBookIdsToStorage(favoriteBookIds: number[]): void {
    localStorage.setItem(
        FAVORITE_BOOK_IDS_STORAGE_KEY,
        JSON.stringify(favoriteBookIds)
    );
}