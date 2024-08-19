import { Schema, model, Document } from 'mongoose';

interface IRecommendation extends Document {
    userId: Schema.Types.ObjectId;
    recommendedBooks: { bookId: Schema.Types.ObjectId }[];
}

const recommendationSchema = new Schema<IRecommendation>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recommendedBooks: [
        { bookId: { type: Schema.Types.ObjectId, ref: 'Book' } }
    ]
}, { timestamps: true });

const Recommendation = model<IRecommendation>('Recommendation', recommendationSchema);
export default Recommendation;
