import { Schema, model, Document } from 'mongoose';

interface IBook extends Document {
    title: string;
    author: string;
    genre: string;
    ratings: { userId: Schema.Types.ObjectId, rating: number }[];
    averageRating: number;
}

const bookSchema = new Schema<IBook>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    ratings: [
        {
            userId: { type: Schema.Types.ObjectId, ref: 'User' },
            rating: { type: Number, min: 1, max: 5 }
        }
    ],
    averageRating: { type: Number, default: 0 }
}, { timestamps: true });

bookSchema.methods.updateAverageRating = function () {
    if (this.ratings.length > 0) {
        const total = this.ratings.reduce((acc: number, curr: { rating: number }) => acc + curr.rating, 0);
        this.averageRating = total / this.ratings.length;
    } else {
        this.averageRating = 0;
    }
    return this.averageRating;
};

const Book = model<IBook>('Book', bookSchema);
export default Book;
