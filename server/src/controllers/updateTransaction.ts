import { Request, Response } from "express";
import Transaction from "../models/transaction";

export async function updateTransaction(req: Request, res: Response) {
  const { id } = req.params;
  const updateFields = req.body;

  try {
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: id },
      updateFields,
      { new: true }
    );
    res.json(updatedTransaction);
  } catch (err) {
    console.error(err);
  }
}
