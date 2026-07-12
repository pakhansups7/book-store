import type { Book } from "../../types/book";

type BookCardProps = {
    book: Book;
    isFavorite: boolean;
    onToggleFavorite: () => void;
};

export function BookCard({ book, isFavorite, onToggleFavorite }: BookCardProps) {
    return (
        <li>
            {book.title}
            <p>{book.author}</p>
            <p>{book.genre}</p>
            <p>{book.price}</p>
            <p>{book.rating}</p>
            <p>{book.description}</p>
            <button onClick={onToggleFavorite}>{isFavorite ? "Удалить из избранного" : "Добавить в избранное"}</button>
        </li>
    );
}