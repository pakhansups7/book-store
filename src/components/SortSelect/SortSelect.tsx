import { sortOptions } from "../../constants/sortOptions"

type SortSelectProps = {
    sortValue: string;
    onSetSortValue: (newValue: string) => void;
}

export function SortSelect({ sortValue, onSetSortValue }: SortSelectProps) {
    return (
        <select
            value={sortValue}
            onChange={(event) => onSetSortValue(event.target.value)}
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