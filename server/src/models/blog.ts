import { Schema, model, Document } from 'mongoose';

export interface Blog extends Document {
    title: string;
    content: string;
    username: string;
    date: Date;
}

const blogSchema = new Schema<Blog>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    username: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const Blog = model<Blog>('Blog', blogSchema);
export default Blog;
