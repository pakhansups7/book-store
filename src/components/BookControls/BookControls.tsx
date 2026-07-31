import { SearchInput } from "../SearchInput/SearchInput";
import { GenreFilter } from "../GenreFilter/GenreFilter";
import { SortSelect } from "../SortSelect/SortSelect";
import type { SortValue } from "../../types/sort";

type BookControlsProps = {
    favoriteCount: number;
    showFavoritesOnly: boolean;
    onToggleShowFavoritesOnly: () => void;
    searchValue: string;
    onSetSearchValue: (newText: string) => void;
    genres: string[];
    selectedGenre: string;
    onSetSelectedGenre: (newGenre: string) => void;
    sortValue: SortValue;
    onSetSortValue: (newValue: SortValue) => void;
    onResetFilters: () => void;
    hasActiveFilters: boolean;
};

export function BookControls({
                                 favoriteCount,
                                 showFavoritesOnly,
                                 onToggleShowFavoritesOnly,
                                 searchValue,
                                 onSetSearchValue,
                                 genres,
                                 selectedGenre,
                                 onSetSelectedGenre,
                                 sortValue,
                                 onSetSortValue,
                                 onResetFilters,
                                 hasActiveFilters,
                             }: BookControlsProps) {
    return (
        <div>
            <p>Favorites: {favoriteCount}</p>
            <button onClick={onToggleShowFavoritesOnly}>
                {showFavoritesOnly ? "Show all books" : "Show favorites only"}
            </button>

            {hasActiveFilters && (
                <button onClick={onResetFilters}>Reset filters</button>
            )}

            <SearchInput
                searchValue={searchValue}
                onSetSearchValue={onSetSearchValue}
            />

            <GenreFilter
                genres={genres}
                selectedGenre={selectedGenre}
                onSetSelectedGenre={onSetSelectedGenre}
            />

            <SortSelect
                sortValue={sortValue}
                onSetSortValue={onSetSortValue}
            />
        </div>
    );
}