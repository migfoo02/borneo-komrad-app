import express, {Request, Response} from 'express';
import cors from 'cors';
// loads environment variables from a .env file into process.env
import "dotenv/config";
// helps connect to database
import mongoose, { connection } from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';
import path from 'path';

// mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string, {
        });
        console.log("Connected to database: ", process.env.MONGODB_CONNECTION_STRING);
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1); // Stop the server if MongoDB connection fails
    }
};

// Connect to DB before starting server
connectDB();

const app = express();
app.use(cookieParser());
// helps convert body of API request to JSON
app.use(express.json());
// helps parse URL
app.use(express.urlencoded({ extended: true }));
// blocks certain requests
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(8080, () => {
    console.log(`Server running on http://localhost:8080`);
});
