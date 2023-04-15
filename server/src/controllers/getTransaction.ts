import { Request, Response } from "express";
import Transaction from "../models/transaction";

export async function getTransaction(req: Request, res: Response) {
  const { userId } = req.body;
  const transactions = await Transaction.find({ userId: userId });
  res.json(transactions);
}
