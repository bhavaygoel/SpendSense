import express, { Request, Response, json } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { register } from "./controllers/register";
import { login } from "./controllers/login";
import { profile } from "./controllers/profile";
import { logout } from "./controllers/logout";
import { createTransaction } from "./controllers/createTransaction";
import { getTransaction } from "./controllers/getTransaction";
import { deleteTransaction } from "./controllers/deleteTransaction";
import { updateTransaction } from "./controllers/updateTransaction";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your React app's URL
    credentials: true, // Allow cookies to be sent with requests
  })
);
app.use(json());
app.use(cookieParser());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.post("/auth/register", register);
app.post("/auth/login", login);
app.post("/auth/logout", logout);
app.get("/profile", profile);
app.post("/transaction", createTransaction);
app.get("/transaction", getTransaction);
app.delete("/transaction/:id", deleteTransaction);
app.patch("/transaction/:id", updateTransaction);

mongoose
  .connect(
    "mongodb+srv://goelbhavay:pCLPaobuVonyMqJn@cluster0.wmhjjxc.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("listening on port 5000");
    });
  });
