import { Request, Response } from "express";
import Transaction from "../models/transaction";
export async function createTransaction(req: Request, res: Response) {
  console.log("Received request");
  
  const { amount, description, date} = req.body;
  const category = "Misc"
  const userId = "6421ad7b7b08f5d7fbf7a1b3"
  const transaction = new Transaction({
    userId,
    amount,
    description,
    category,
    date
  });
  console.log("Done..");
  
  const createdTransaction = await transaction.save();
  res.json(createdTransaction);
}
