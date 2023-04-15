import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import User from "../models/user";
export async function register(req: Request, res: Response) {
  const { firstName, lastName, password, email } = req.body;
  const exist = await User.findOne({ email });
  if (exist) {
    return res.json({ message: "User Already exists" });
  }
  const hashedPass = await bcrypt.hash(password, 10);
  const user = new User({
    firstName,
    lastName,
    password: hashedPass,
    email,
  });

  const createdUser = await user.save();
  res.json(createdUser);
}
