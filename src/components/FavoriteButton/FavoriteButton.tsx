
type FavoriteButtonProps = {
    isFavorite: boolean;
    onToggleFavorite: () => void;
};

export function FavoriteButton({ isFavorite, onToggleFavorite }: FavoriteButtonProps) {
    return (
        <button onClick={onToggleFavorite}>
            {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
        </button>
    );
}