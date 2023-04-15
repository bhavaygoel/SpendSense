import { Request, Response } from "express";
import User from "../models/user";

export async function profile(req: Request, res: Response) {
  try {
    const userId = req.cookies.user;
    const user = await User.findById(userId.userId);
    res.json(user);
  } catch (err) {
    console.error(err);
  }
}
