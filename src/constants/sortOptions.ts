import type { SortValue } from "../types/sort";

export type SortOption = {
    value: SortValue;
    label: string;
};

export const sortOptions: SortOption[] = [
    {
        value: 'default',
        label: "Default",
    },
    {
        value: "price-asc",
        label: "Price: low to high",
    },
    {
        value: "price-desc",
        label: "Price: high to low",
    },
    {
        value: "rating-desc",
        label: "Rating: high to low",
    }
];