import express, { Request, Response, json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import { register } from "./controllers/register";
import { login } from "./controllers/login";
import { profile } from "./controllers/profile";
import { logout } from "./controllers/logout";
import { createTransaction } from "./controllers/createTransaction";
import { getTransaction } from "./controllers/getTransaction";
import { deleteTransaction } from "./controllers/deleteTransaction";
import { updateTransaction } from "./controllers/updateTransaction";

dotenv.config()

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your React app's URL
    credentials: true, // Allow cookies to be sent with requests
  })
);
app.use(json());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.post("/auth/register", register);
app.post("/auth/login", login);
app.post("/auth/logout", logout);
app.get("/profile", profile);
app.post("/createtransaction", createTransaction);
app.post("/gettransaction", getTransaction);
app.delete("/transaction/:id", deleteTransaction);
app.patch("/transaction/:id", updateTransaction);
mongoose
  .connect(
    `${process.env.MONGODB_URI}`
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("listening on port 5000");
    });
  });
