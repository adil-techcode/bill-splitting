import UserModel from "../../models/usersmodel.js";
import ExpenseModel from "../../models/expensemodal.js";
import GroupModel from "../../models/groupmodel.js";

class LastMonthStatistics {
  static LastMonthUsersInWeeks = async (req, res) => {
    try {
      const today = new Date();

      let count = [];
      for (let i = 0; i < 25; i += 7) {
        const startday = new Date(today);
        startday.setDate(today.getDate() - (i + 7));
        const endday = new Date(today);
        endday.setDate(today.getDate() - i);

        const documentCount = await UserModel.countDocuments({
          createdAt: {
            $gte: startday.toISOString(),
            $lte: endday.toISOString(),
          },
        });

        console.log(startday)
        console.log(endday)
        count.push(documentCount);
      }
      return count.reverse();
    } catch (error) {
      res
        .status(500)
        .send({ status: "failed", message: "Database  Error", reason: error });
    }
  };

  static LastMonthGroupsInWeeks = async (req, res) => {
    try {
      const today = new Date();

      let count = [];
      for (let i = 0; i < 25;  i += 7) {
        const startday = new Date(today);
        startday.setDate(today.getDate() - (i + 7));
        const endday = new Date(today);
        endday.setDate(today.getDate() - i);

        const documentCount = await GroupModel.countDocuments({
          createdAt: {
            $gte: startday.toISOString(),
            $lte: endday.toISOString(),
          },
        });
        count.push(documentCount);
      }
      return count.reverse();
    } catch (error) {
      res
        .status(500)
        .send({ status: "failed", message: "Database Error", reason: error });
    }
  };


  static LastMonthExpensesInWeeks = async (req, res) => {
    try {
      const today = new Date();

      let count = [];
      for (let i = 0; i < 25;  i += 7) {
        const startday = new Date(today);
        startday.setDate(today.getDate() - (i + 7));
        const endday = new Date(today);
        endday.setDate(today.getDate() - i);

        const documentCount = await ExpenseModel.countDocuments({
          createdAt: {
            $gte: startday.toISOString(),
            $lte: endday.toISOString(),
          },
        });
        count.push(documentCount);
      }
      return count.reverse();
    } catch (error) {
      res
        .status(500)
        .send({ status: "failed", message: "Database Error", reason: error });
    }
  };

  static LastMonthExpensesInDays = async (req, res) => {
    try {
      // Calculate the date range for the last month
      const today = new Date();

      let count = [];
      for (let i = 0; i < 30; i++) {
        const startday = new Date(today);
        startday.setDate(today.getDate() - (i + 1));
        const endday = new Date(today);
        endday.setDate(today.getDate() - i);

        const documentCount = await ExpenseModel.countDocuments({
          createdAt: {
            $gte: startday.toISOString(),
            $lte: endday.toISOString(),
          },
        });

        count.push(documentCount);
      }

      return count.reverse();;
    } catch (error) {
      res
        .status(500)
        .send({ status: "failed", message: "Database Error", reason: error });
    }
  };
}

export default LastMonthStatistics;
