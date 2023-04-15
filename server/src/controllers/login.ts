import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      console.log("Logged in", user);
      res.cookie(
        "user",
        {
          userId: user.id,
        },
        { httpOnly: true }
      ); // set httpOnly option to true
      return res.json({ message: "Login successful" }); // send response to client
    }
  }
  return res.status(401).json({
    message: "Invalid email or password",
  });
}
