import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import UserModel from "./models/user";
import bookRoutes from "./routes/bookRoutes";


const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);

// Route: Get all users
app.get("/users", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserModel.find().exec();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
});
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


// Fallback route for 404
app.use((req: Request, res: Response) => {
    res.status(404).json({ message: "Route not found" });
});

export default app;
