import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const Schema = mongoose.Schema;
const TransactionSchema = new Schema({
  userId: {
    type: ObjectId,
    required: true,
  },
  date: Date,
  amount: {
    type: Number,
    required: true,
  },
  description: String,
  category: String,
});

const TransactionModel = mongoose.model("Transaction", TransactionSchema);
export default TransactionModel;
