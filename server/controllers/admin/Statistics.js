import totalStatistics from "./TotalStatistics.js";
import LastMonthStatistics from "./LastMonthStatistics.js";
import weekPercentage from "../../utils/CalculatePercentage.js";

class Statistics {
  static getCount = async (req, res) => {
    try {
      const promises = [
        totalStatistics.totalUsers(),
        totalStatistics.totalGroups(),
        totalStatistics.totalExpenses(),
        LastMonthStatistics.LastMonthUsersInWeeks(),
        LastMonthStatistics.LastMonthGroupsInWeeks(),
        LastMonthStatistics.LastMonthExpensesInDays(),
        LastMonthStatistics.LastMonthExpensesInWeeks(),
      ];

      const [
        totalUser,
        totalGroup,
        totalExpense,
        lastMonthUserInWeeks,
        lastMonthGroupsInWeeks,
        lastMonthExpenseInDays,
        lastMonthExpenseInWeeks,
      ] = await Promise.all(promises);

      let lastWeekUsersPercentage = weekPercentage(
        lastMonthUserInWeeks[lastMonthUserInWeeks.length - 1],
        lastMonthUserInWeeks[lastMonthUserInWeeks.length - 2]
      );
      let lastWeekGroupsPercentage = weekPercentage(
        lastMonthGroupsInWeeks[lastMonthGroupsInWeeks.length - 1],
        lastMonthGroupsInWeeks[lastMonthGroupsInWeeks.length - 2]
      );
      let lastWeekExpensesPercentage = weekPercentage(
        lastMonthExpenseInWeeks[lastMonthExpenseInWeeks.length - 1],
        lastMonthExpenseInWeeks[lastMonthExpenseInWeeks.length - 2]
      );


      const statistics = {
        totalStatistics: {
          users: {
            count: totalUser,
            lastweekPercentage: lastWeekUsersPercentage,
          },
          groups: {
            count: totalGroup,
            lastweekPercentage: lastWeekGroupsPercentage,
          },

          expenses: {
            count: totalExpense,
            lastweekPercentage: lastWeekExpensesPercentage,
          },
        },
        lastMonthStatistics: {
          users: lastMonthUserInWeeks,
          groups: lastMonthGroupsInWeeks,
          expenses: lastMonthExpenseInDays,
        },
      };

      res.status(200).send({
        status: "success",
        message: "Data retrieved successfully",
        data: statistics,
      });
    } catch (error) {
      res
        .status(500)
        .send({
          status: "failed",
          message: "Database  njError",
          reason: error,
        });
    }
  };
}

export default Statistics;
