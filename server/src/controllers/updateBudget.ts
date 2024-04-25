import { Request, Response } from "express";
import UserModel from "../models/user";

export async function updateBudget(req: Request, res: Response) {
  try {
    const { newBudget, userId } = req.body;
    console.log("Request recieved for updating budget");
    console.log(newBudget);
    
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.budget = newBudget;
    await user.save();
    console.log("Budget updated successfully");
    
    return res.json({ message: "Budget updated successfully" });
  } catch (error) {
    console.error("Error changing budget:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
