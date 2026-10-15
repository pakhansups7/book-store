import { type ChangeEvent, type FormEvent, useState } from "react";
import type { Book } from "../../types/book";

type AddBookFormData = {
    title: string;
    author: string;
    genre: string;
    price: string;
    rating: string;
    cover: string;
    description: string;
    stock: string;
};

type AddBookFormErrors = {
    title?: string;
    author?: string;
    genre?: string;
    price?: string;
    rating?: string;
    stock?: string;
};

type AddBookFormProps = {
    onAddBook: (book: Book) => void;
};

export function AddBookForm({ onAddBook }: AddBookFormProps) {
    const [formData, setFormData] = useState<AddBookFormData>({
        title: "",
        author: "",
        genre: "",
        price: "",
        rating: "",
        cover: "",
        description: "",
        stock: "",
    });

    const [errors, setErrors] = useState<AddBookFormErrors>({});

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const nextErrors: AddBookFormErrors = {};

        const price = Number(formData.price);
        const rating = Number(formData.rating);
        const stock = Number(formData.stock);

        if (formData.title.trim() === "") {
            nextErrors.title = "Title is required";
        }

        if (formData.author.trim() === "") {
            nextErrors.author = "Author is required";
        }

        if (formData.genre.trim() === "") {
            nextErrors.genre = "Genre is required";
        }

        if (formData.price.trim() === "" || Number.isNaN(price) || price <= 0) {
            nextErrors.price = "Price must be greater than 0";
        }

        if (formData.rating.trim() === "" || Number.isNaN(rating) || rating < 0 || rating > 5) {
            nextErrors.rating = "Rating must be between 0 and 5";
        }

        if (
            formData.stock.trim() === "" ||
            Number.isNaN(stock) ||
            stock < 0 ||
            !Number.isInteger(stock)
        ) {
            nextErrors.stock = "Stock must be a whole number 0 or greater";
        }

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }

        const newBook = {
            id: Date.now(),
            title: formData.title.trim(),
            author: formData.author.trim(),
            genre: formData.genre.trim(),
            price,
            rating,
            cover: formData.cover.trim(),
            description: formData.description.trim(),
            stock,
        };

        onAddBook(newBook);
        setErrors({});

        setFormData({
            title: "",
            author: "",
            genre: "",
            price: "",
            rating: "",
            cover: "",
            description: "",
            stock: "",
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                placeholder="заголовок"
                value={formData.title}
                onChange={handleChange}
            />
            {errors.title && <p>{errors.title}</p>}

            <input
                type="text"
                name="author"
                placeholder="автор"
                value={formData.author}
                onChange={handleChange}
            />
            {errors.author && <p>{errors.author}</p>}

            <input
                type="text"
                name="genre"
                placeholder="жанр"
                value={formData.genre}
                onChange={handleChange}
            />
            {errors.genre && <p>{errors.genre}</p>}

            <input
                type="text"
                name="price"
                placeholder="цена"
                value={formData.price}
                onChange={handleChange}
            />
            {errors.price && <p>{errors.price}</p>}

            <input
                type="text"
                name="rating"
                placeholder="рейтинг"
                value={formData.rating}
                onChange={handleChange}
            />
            {errors.rating && <p>{errors.rating}</p>}

            <input
                type="text"
                name="cover"
                placeholder=""
                value={formData.cover}
                onChange={handleChange}
            />

            <input
                type="text"
                name="description"
                placeholder="описание"
                value={formData.description}
                onChange={handleChange}
            />

            <input
                type="text"
                name="stock"
                placeholder="количество на складе"
                value={formData.stock}
                onChange={handleChange}
            />
            {errors.stock && <p>{errors.stock}</p>}

            <button type="submit">
                Добавь свою книгу
            </button>
        </form>
    );
}