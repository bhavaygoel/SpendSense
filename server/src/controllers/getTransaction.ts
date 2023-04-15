import { Request, Response } from "express";
import Transaction from "../models/transaction";

export async function getTransaction(req: Request, res: Response) {
  try{
    const { userId } = req.body;
    const transactions = await Transaction.find({ userId: userId });
    console.log(transactions);
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);

    const [monthResult, todayResult] = await Promise.all([
      Transaction.aggregate([
        {
          $match: {
            date: { $gte: startOfMonth, $lte: endOfMonth }
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" }
          }
        }
      ]),
      Transaction.aggregate([
        {
          $match: {
            date: { $gte: startOfDay, $lt: endOfDay }
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" }
          }
        }
      ])
    ]);
    const monthSum = monthResult.length > 0 ? monthResult[0].total : 0;
    const todaySum = todayResult.length > 0 ? todayResult[0].total : 0;
    res.json({transactions,monthSum,todaySum});

  }catch (error) {
    console.error('Error while getting transaction:', error);
    res.status(500).json({ error: "Internal server error" });
  }
}
