import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import UserRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";
import recommendationRoutes from "./routes/recommendationRoutes";
import mongoose from "mongoose";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/users', UserRoutes);
app.use('/recommendations', recommendationRoutes);

// Simple logger middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    next();
});

// Error-handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_CONNECTION_STRING as string)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });
    
// Fallback route for 404
app.use((req: Request, res: Response) => {
    res.status(404).json({ message: "Route not found" });
});

export default app;
