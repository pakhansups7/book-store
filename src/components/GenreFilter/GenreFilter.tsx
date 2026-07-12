

type GenreFilterProps = {
    genres: string[];
    selectedGenre: string;
    onSetSelectedGenre: (newGenre: string) => void;
};

export function GenreFilter({ genres, selectedGenre, onSetSelectedGenre }: GenreFilterProps) {
    return (
        <select
            value={selectedGenre}
            onChange={(event) => onSetSelectedGenre(event.target.value)}
        >
            {genres.map((genre) => (
                <option key={genre} value={genre}>
                    {genre}
                </option>
            ))}
        </select>
    );
}