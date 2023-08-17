// Import necessary models
import GroupModel from "../../models/groupmodel.js";
import ExpenseModel from "../../models/expensemodal.js";
import UserModel from "../../models/usersmodel.js";

// Expense class with static methods to manage expenses

class Expense {
  // Method to add new expenses
  static addExpenses = async (req, res) => {
    const {
      title,
      description,
      currency,
      paidBy,
      participants,
      totalAmount,
      perHead,
      groupId,
    } = req.body;

    // Check if all required fields are provided
    if (
      !title ||
      !description ||
      !currency ||
      !paidBy ||
      !participants ||
      !totalAmount ||
      !perHead ||
      !groupId 
    ) {
      return res
        .status(400)
        .send({ status: "failed", message: "All Fields Required" });
    }

    try {
      // Create an object to save data to the database
      const expense = new ExpenseModel({
        title: title,
        description: description,
        paidBy: paidBy,
        groupId: groupId,
        totalAmount: totalAmount,
        perHead: perHead,
        currency: currency,
        participants: participants,
      });

      // Save the expense to the database
      const createdExpense = await expense.save();

      console.log(createdExpense._id);
      // Update the GroupModel with the newly created expense ID
      await GroupModel.updateOne(
        { _id: groupId },
        { $push: { expenses: createdExpense._id } }
      );

      res
        .status(201)
        .send({ status: "success", message: "Expense added successfully" });
    } catch (error) {
      res.status(500).send({
        status: "failed",
        message: "Failed to add expense",
        reason: error,
      });
    }
  };

  // Method to get an expense by ID
  static getExpense = async (req, res) => {
    const expenseId = req.params.id;

    try {
      // Find the expense by ID
      const expense = await ExpenseModel.findById(expenseId);
      res.status(200).send({
        status: "success",
        message: "Expense retrieved successfully",
        data: expense,
      });
    } catch (error) {
      res
        .status(500)
        .send({ status: "failed", message: "Database Error", reason: error });
    }
  };

  // Method to get expenses of a participant in a group
  static getParticipantsExpenses = async (req, res) => {
    const groupId = req.params.groupId;
    const participantId = req.params.participantId;

    try {
      // Find the group by ID and populate the expenses associated with it
      const group = await GroupModel.findById(groupId).populate({
        path: "expenses",
        match: {
          "participants._id": participantId,
        },
      });

      // Filter the expenses to show only the participant's data
      const filteredExpenses = group.expenses.map((expense) => {
        const filteredParticipants = expense.participants.filter(
          (participant) => String(participant._id) === String(participantId)
        );
        return { ...expense, participants: filteredParticipants };
      });

      res.status(200).send({
        status: "success",
        message: "Expenses retrieved successfully",
        data: filteredExpenses,
      });
    } catch (error) {
      res
        .status(500)
        .send({ status: "failed", message: "Database Error", reason: error });
    }
  };
}

export default Expense;
