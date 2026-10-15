import { useState, useEffect } from "react";
import { getFavoriteBookIdsFromStorage, saveFavoriteBookIdsToStorage } from "../utils/favoriteStorage";

export function useFavorites() {
    const [favoriteBookIds, setFavoriteBookIds] = useState<number[]>(() => {
        return getFavoriteBookIdsFromStorage();
    });

    useEffect(() => {
        saveFavoriteBookIdsToStorage(favoriteBookIds);
    }, [favoriteBookIds]);

    function toggleFavorite(bookId: number) {
        setFavoriteBookIds((prevFavoriteBookIds) => {
            const isFavorite = prevFavoriteBookIds.includes(bookId);

            if (isFavorite) {
                return prevFavoriteBookIds.filter((id) => id !== bookId);
            }

            return [...prevFavoriteBookIds, bookId];
        });
    }

    return {
        favoriteBookIds,
        toggleFavorite,
    }
}