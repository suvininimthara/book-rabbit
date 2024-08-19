import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import UserModel from "./models/user";
import BookModel from "./models/book"; // Assuming you have this model
import RecommendationModel from "./models/recommendation"; // Assuming you have this model

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Simple logger middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Error-handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

// Route: Get all users
app.get("/users", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserModel.find().exec();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
});

// Route: Get all books
app.get("/books", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const books = await BookModel.find().exec();
        res.status(200).json(books);
    } catch (err) {
        next(err);
    }
});

// Route: Get recommendations for a user
app.get("/recommendations/:userId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const recommendations = await RecommendationModel.findOne({ userId }).exec();
        if (!recommendations) {
            return res.status(404).json({ message: "No recommendations found for this user." });
        }
        res.status(200).json(recommendations);
    } catch (err) {
        next(err);
    }
});

// Fallback route for 404
app.use((req: Request, res: Response) => {
    res.status(404).json({ message: "Route not found" });
});

export default app;
