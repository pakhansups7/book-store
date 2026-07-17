import { sortOptions } from "../../constants/sortOptions";
import type { SortValue } from "../../types/sort";

type SortSelectProps = {
    sortValue: SortValue;
    onSetSortValue: (newValue: SortValue) => void;
};

export function SortSelect({ sortValue, onSetSortValue }: SortSelectProps) {
    return (
        <select
            value={sortValue}
            onChange={(event) => onSetSortValue(event.target.value as SortValue)}
        >
            {sortOptions.map((option) => (
                <option
                    key={option.value}
                    value={option.value}
                >
                    {option.label}
                </option>
            ))}
        </select>
    )
}