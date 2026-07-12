
type SearchInputProps = {
    searchValue: string;
    onSetSearchValue: (newText: string) => void;
}

export function SearchInput({ searchValue, onSetSearchValue }: SearchInputProps) {
    return (
        <div>
            <input
                type="text"
                value={searchValue}
                onChange={(event) => onSetSearchValue(event.target.value)}
            />
        </div>
    );
}