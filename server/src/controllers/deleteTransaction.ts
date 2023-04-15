import { Request, Response } from "express";
import Transaction from "../models/transaction";

export async function deleteTransaction(req: Request, res: Response) {
  const { id } = req.params;
  await Transaction.deleteOne({ _id: id });
  res.send("successfully deleted");
}
