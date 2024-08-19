import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    password: string; // It's recommended to hash passwords
    favoriteGenres: string[];
    ratedBooks: { bookId: Schema.Types.ObjectId, rating: number }[];
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favoriteGenres: { type: [String], default: [] }, // Array of genres the user prefers
    ratedBooks: [
        {
            bookId: { type: Schema.Types.ObjectId, ref: 'Book' },
            rating: { type: Number, min: 1, max: 5 }
        }
    ]
}, { timestamps: true });

const User = model<IUser>('User', userSchema);
export default User;
