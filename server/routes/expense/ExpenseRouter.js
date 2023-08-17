import express from "express";
var expenseRouter = express.Router();

import Expense from "../../controllers/expense/expense.js";

expenseRouter.post("/create-expense", Expense.addExpenses);
expenseRouter.get("/get-expense/:id", Expense.getExpense);
expenseRouter.get(
  "/get-participant-expenses/:groupId/:participantId",
  Expense.getParticipantsExpenses
);

export default expenseRouter;
