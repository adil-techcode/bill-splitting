// Importing necessary libraries and components
import React from "react";

import { useEffect, useState } from "react";
import Expense from "../../services/expense/Expense";
import Loader from "../../components/loader";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import SideBar from "../../components/sidebar";
import NewNavbar from "../../components/newNavbar";
import { useSelector } from "react-redux";
import getExchangesRates from "../../utils/currencyUtils";
import CurrencyLabel from "../../components/symbols";
import moment from "moment";

function ExpenseDetail() {
  // Getting the 'groupId' and 'expenseId' parameters from the URL
  const { groupId, expenseId } = useParams();
  const [expense, setExpense] = useState();
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // toggle tate

  //Default Currency
  const baseCurrency = useSelector((state) => state.app.baseCurrency);

  // Fetch expense details when the component mounts
  useEffect(() => {
    document.title = "Expenses Detail";
    fetchExpense();
  }, []);

  // Function to fetch the expense details using the Expense service
  const fetchExpense = async () => {
    setLoading(true);
    const res = await Expense.getExpense(expenseId);
    if(res && res.status === "success"){
      console.log(res);
      setExpense(res.data);
  
      // Simulating a delay to demonstrate the loader
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  //Method for SideBar Toggle
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
          <NewNavbar toggleSidebar={toggleSidebar}  pageName = {"Expense"}  />
          {expense && (
            <div className="d-flex  m-5    ">
              <main className="container-fluid">
                <div className="card card-flush pt-3 mx-2 mb-5 mb-lg-10  shadow-sm ">
                  <div className="card-header  bg-white  mb-3 ">
                    <div>
                      <h5 className="fw-bold"> Expense Detail </h5>
                    </div>
                  </div>

                  <div className="card-body pt-0  ">
                    <div className="row my-3">
                      <div className=" col-12 col-md-3   py-1 fs-6 fw-normal ">
                        {" "}
                        Date{" "}
                      </div>
                      <div
                        className=" col-12 col-md-8  rounded py-1 px-3 "
                        style={{ backgroundColor: "#F9F9F9", color: "#4B5675" }}
                      >
                        {" "}
                        {moment(expense.createdAt).format("MMM D, YYYY")}
                      </div>
                    </div>

                    <div className="row my-3">
                      <div className=" col-12 col-md-3   py-1 fs-6 fw-normal ">
                        {" "}
                        Title
                      </div>
                      <div
                        className=" col-12 col-md-8  rounded py-1 px-3 "
                        style={{ backgroundColor: "#F9F9F9", color: "#4B5675" }}
                      >
                        {" "}
                        {capitalizeFirstLetter(expense.title)}
                      </div>
                    </div>

                    <div className="row my-3" style={{ minHeight: "100px" }}>
                      <div className="  col-12 col-md-3  py-1 fs-6 fw-normal ">
                        {" "}
                        Description{" "}
                      </div>
                      <div
                        className="col-12   col-md-8 rounded py-1 px-3 "
                        style={{ backgroundColor: "#F9F9F9", color: "#4B5675" }}
                      >
                        {" "}
                        {expense.description}{" "}
                      </div>
                    </div>

                    <div className="row my-3">
                      <div className="  col-12 col-md-3  py-1 fs-6 fw-normal ">
                        {" "}
                        Paid By{" "}
                      </div>
                      <div
                        className="col-12   col-md-8 rounded py-1 px-3 "
                        style={{ backgroundColor: "#F9F9F9", color: "#4B5675" }}
                      >
                        {" "}
                        {expense.paidBy}{" "}
                      </div>
                    </div>

                    <div className="row my-3">
                      <div className="  col-12 col-md-3  py-1 fs-6 fw-normal ">
                        {" "}
                        Partcipants{" "}
                      </div>
                      <div
                        className="col-12   col-md-8 rounded py-1 px-3 "
                        style={{ backgroundColor: "#F9F9F9", color: "#4B5675" }}
                      >
                        <ul style={{ listStyleType: "none" }}>
                          {expense.participants &&
                            expense.participants.map((part) => (
                              <li id={part._id} key={part._id}>
                                {" "}
                                <a
                                  href={`http://localhost:3000/participantsummary/${groupId}/${part._id}`}
                                  className="text-decoration-none"
                                >
                                  {" "}
                                  {part.name}{" "}
                                </a>{" "}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>

                    <div className="row my-3">
                      <div className="  col-12 col-md-3  py-1 fs-6 fw-normal ">
                        {" "}
                        Total Amount{" "}
                      </div>
                      <div
                        className="col-12   col-md-8 rounded py-1 px-3 "
                        style={{ backgroundColor: "#F9F9F9", color: "#4B5675" }}
                      >
                        <span>
                          {convertAmount(expense.currency, expense.totalAmount)}{" "}
                        </span>
                        <CurrencyLabel currencyCode={baseCurrency} />
                      </div>
                    </div>

                    <div className="row my-3">
                      <div className="  col-12 col-md-3  py-1 fs-6 fw-normal ">
                        {" "}
                        Per Head{" "}
                      </div>
                      <div
                        className="col-12   col-md-8 rounded py-1 px-3 "
                        style={{ backgroundColor: "#F9F9F9", color: "#4B5675" }}
                      >
                        <span>
                          {convertAmount(expense.currency, expense.perHead)}{" "}
                        </span>
                        <CurrencyLabel currencyCode={baseCurrency} />
                      </div>
                    </div>
                  </div>
                </div>
              </main>
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

export default ExpenseDetail;
