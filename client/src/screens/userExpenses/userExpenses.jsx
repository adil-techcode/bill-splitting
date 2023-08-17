import React from "react";
import { useState, useEffect } from "react";
import SideBar from "../../components/sidebar";
import NewNavbar from "../../components/newNavbar";
import "./userExpenses.css";
import GetGroups from "../../services/group/GetGroups";
import Loader from "../../components/loader";
import Footer from "../../components/Footer";
import Tooltip from "@mui/material/Tooltip";
import { FaInfo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import getExchangesRates from "../../utils/currencyUtils";
import CurrencyLabel from "../../components/symbols";

function UserExpense() {
  const user = useSelector((state) => state.app.user);
  const baseCurrency = useSelector((state) => state.app.baseCurrency);

  const [expenses, setexpenses] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [balance, setBalance] = useState(true);

  // Initialize hooks and state variables
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch groups data using the GetGroups service
  const fetchData = async () => {

    setLoading(true);
    console.log(user);
    const res = await GetGroups.userGroups(user._id);

    if ( res && res.status === "success") {
      // Simulating a delay to demonstrate the loader
      setTimeout(() => {
        fetchUserLogs(res.data);
        setLoading(false);
      }, 2000);
    } 
  };

  const fetchUserLogs = (data) => {
    let UserExpenses = [];

    // Fetching User Logs in All Group
    for (let group = 0; group < data.length; group++) {
      let expenses = data[group].expenses;
      for (let expense = 0; expense < expenses.length; expense++) {
        let partcipants = expenses[expense].participants;
        for (
          let participant = 0;
          participant < partcipants.length;
          participant++
        ) {
          if (partcipants[participant]._id == user._id) {
            const expenseu = {
              ...partcipants[participant],
              groupName: data[group].name,
              groupId: data[group]._id,
              expenseId: expenses[expense]._id,
              title: expenses[expense].title,
              paidBy: expenses[expense].paidBy,
              currency: expenses[expense].currency,
            };
            UserExpenses.push(expenseu);
          }
        }
      }
    }

    setexpenses(UserExpenses);

    // Calculating Total Amount
    let participantBalance = 0;
    for (let i = 0; i < UserExpenses.length; i++) {
      let perHead = parseFloat(
        getExchangesRates(UserExpenses[i].currency, UserExpenses[i].perHead)
      );
      participantBalance += perHead;
    }
    setBalance(participantBalance.toLocaleString());
  };


    // method for sidebar toggle
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

    //Method for capitalise String
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

    //Methods to Convert Currency
  const convertAmount = (currency, amount) => {
    const value = getExchangesRates(currency, amount);
    return value.toLocaleString();
  };

  return (
    <>
      <div
        className="d-flex"
        style={{ backgroundColor: "#eef3fd", minHeight: "100vh" }}
      >
        <SideBar isOpen={isSidebarOpen} />
        <div style={{ width: "100%" }}>
          <NewNavbar toggleSidebar={toggleSidebar}  pageName = {"User Expenses"}  />
          {expenses && expenses.length > 0 ? (
            <div className="d-flex row m-5">
              <main className="col-12 col-md-12 col-lg-9 ">
                <div className="card card-flush pt-3 mx-2 mb-5 mb-lg-10  shadow-sm ">
                  <div className="card-header  bg-white  mb-3 ">
                    <div>
                      <h5 className="fw-bold"> User Expenses Log </h5>
                    </div>
                  </div>

                  <div className="card-body pt-0  ">
                    <div className="table-responsive">
                      <table
                        className="table align-middle table-row-dashed fs-6 fw-semibold gy-4 dataTable no-footer"
                        id="kt_subscription_products_table"
                      >
                        <thead>
                          <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                            <th
                              className=" sorting_disabled "
                              rowSpan={1}
                              colSpan={1}
                            >
                              Group Name
                            </th>
                            <th
                              className=" sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                            >
                              Title
                            </th>
                            <th
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                            >
                              PaidBy
                            </th>
                            <th
                              className=" sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                            >
                              Per Head
                            </th>

                            <th
                              className=" text-end sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {expenses.map((expense) => (
                            <tr>
                              <td> {expense.groupName} </td>
                              <td> {expense.title} </td>
                              <td> {expense.paidBy} </td>
                              <td>
                                {" "}
                                {expense.perHead}
                                <span>
                                  {convertAmount(
                                    expense.currency,
                                    expense.perHead
                                  )}{" "}
                                </span>
                                <CurrencyLabel currencyCode={baseCurrency} />
                              </td>
                              <td className="text-end">
                                <a
                                  href={`http://localhost:3000/group/${expense.groupId}/${expense.expenseId}`}
                                  className="btn "
                                >
                                  <Tooltip title="View More">
                                    <span className="icon text-muted">
                                      <FaInfo />
                                    </span>
                                  </Tooltip>
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </main>
              <aside className="col-12 col-md-12 col-lg-3 ">
                <div className="card card-flush pt-1    mb-0">
                  <div className="card-header mt-1 bg-white  d-flex justify-content-between ">
                    <div className="card-title">
                      <h5> User Summary</h5>
                    </div>
                  </div>
                  <div className="card-body participant-summary p-0  fs-6">
                    <div className="my-3">
                      <h6 className="fw-bolder"> User Detail</h6>
                      <p> {capitalizeFirstLetter(user.name)} </p>
                      <p className="text-muted p-0 "> {user.email} </p>
                    </div>
                    <div>
                      <h6 className="fw-bolder">Expense Detail</h6>
                      <p>
                        Total Paid Amount : {balance}{" "}
                        <CurrencyLabel currencyCode={baseCurrency} />{" "}
                      </p>
                      <p className="text-muted">
                        Total Expenses: {expenses.length}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          ) : (
            // Display a message if no logs found
            <div
              className="bg-white  container m-3 display-3 d-flex align-items-center justify-content-center "
              style={{ minHeight: "80vh" ,width:"95%" }}
            >
              {loading ? null : <div>No Logs Found</div>}
            </div>
          )}
        </div>
      </div>
      <Footer />

      {/* Show loader while loading data */}
      {loading && <Loader />}
    </>
  );
}

export default UserExpense;
