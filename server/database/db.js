import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

export function connection() {
    const MONGODB_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@e-commerce-dashboard.w93hm3s.mongodb.net/?retryWrites=true&w=majority`
    mongoose.connect(MONGODB_URL, { useNewUrlParser: true })
        .then(() => {
            console.log("Database connected successfully");
        }).catch((err) => {
            console.log("Error while connecting with the database", err.message)
        })
}













