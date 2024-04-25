import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
import User from "../models/user";

export async function login(req: Request, res: Response) {
  console.log("Requeste recieved for login");

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const jwtSecret = process.env.JWT_SECRET as string;
  if (!jwtSecret) {
    return res.status(500).json({ message: 'JWT secret is not defined' });
  }
  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      console.log("Logged in", user);
      const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
      return res.json({ message: "Login successful", token });
    }
  }
  return res.status(401).json({
    message: "Invalid email or password",
  });
}
