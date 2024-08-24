export interface User {
    _id: string;
    username: string;
    email: string;
    favoriteGenres: string[];
    ratedBooks: { bookId: string, rating: number }[];
}

