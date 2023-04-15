import { Request, Response } from "express";
import Transaction from "../models/transaction";
export async function createTransaction(req: Request, res: Response) {
  const { userId, amount, description, category } = req.body;
  const date = new Date();
  const transaction = new Transaction({
    userId,
    amount,
    description,
    category,
    date
  });

  const createdTransaction = await transaction.save();
  res.json(createdTransaction);
}
