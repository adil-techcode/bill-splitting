import SideBar from "../../components/sidebar";
import NewNavbar from "../../components/newNavbar";
import "./participantSummary.css";
import Tooltip from "@mui/material/Tooltip";
import { FaInfo } from "react-icons/fa";
import React from "react";
import { useEffect, useState } from "react";
import Expense from "../../services/expense/Expense";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Loader from "../../components/loader";
import getExchangesRates from "../../utils/currencyUtils";
import CurrencyLabel from "../../components/symbols";
import { useSelector } from "react-redux";

function PartcipantSummary() {
  // Get the groupId and participantId from the URL params
  const { groupId, participantId } = useParams();

  //get defualt Currency
  const baseCurrency = useSelector((state) => state.app.baseCurrency);

  // open or close sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // State variables
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState();
  const [balanceSummary, setBalanceSummary] = useState();

  // Fetch participant's expense logs from the server
  const fetchparticipantLogs = async () => {
    setLoading(true);

    const res = await Expense.getParticipantExpense(groupId, participantId);
    if(res && res.status ==="success"){
      setExpenses(res.data);
      
      // Calculate participant's balance summary
      let participantBalance = 0;
      for (let i = 0; i < res.data.length; i++) {
        console.log(res.data[i])
        let perHead = parseFloat(getExchangesRates(res.data[i]._doc.currency,res.data[i].participants[0].perHead));
        participantBalance += perHead;
      }
      participantBalance = Math.round(participantBalance).toLocaleString();
      setBalanceSummary(participantBalance);
  
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
 
  };

  // Fetch participant's logs when the component mounts or when groupId/participantId changes
  useEffect(() => {
    document.title = "Participant Detail";
    fetchparticipantLogs();
  }, [groupId, participantId]);


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
          <NewNavbar toggleSidebar={toggleSidebar}  pageName = {"Participant Summary"}  />
          {/* Check if there are expenses to display */}
          {expenses && expenses.length > 0 ? (
            <div className="d-flex row m-5">
              <main className="col-12 col-md-12 col-lg-9 ">
                <div className="card card-flush pt-3 mx-2 mb-5 mb-lg-10  shadow-sm ">
                  <div className="card-header  bg-white ">
                    <div>
                      <h5 className="fw-bold"> Expenses Log </h5>
                    </div>
                  </div>

                  <div className="card-body pt-2  ">
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
                              Title
                            </th>
                            <th
                              className=" sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                            >
                              Paid By
                            </th>
                            <th
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                            >
                              Total Amount
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
                        <tbody className="">
                          {expenses.map((expense) => (
                            <tr key={expense._doc._id}>
                              <td>{expense._doc.title} </td>
                              <td> {expense._doc.paidBy}</td>
                              <td>
                                <span >
                                  {convertAmount(
                                    expense._doc.currency,
                                    expense._doc.totalAmount
                                  )}{" "}
                                </span>
                                <CurrencyLabel currencyCode={baseCurrency} />
                              </td>
                              <td>
                                <span >
                                  {convertAmount(
                                    expense._doc.currency,
                                    expense.participants[0].perHead
                                  )}{" "}
                                </span>
                                <CurrencyLabel currencyCode={baseCurrency} />
                              </td>
                              <td className="text-end">
                                <a
                                  href={`http://localhost:3000/group/${groupId}/${expense._doc._id}`}
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
                      <h5>Participant Summary</h5>
                    </div>
                  </div>
                  <div className="card-body participant-summary p-0  fs-6">
                    <div className="my-3">
                      <h6 className="fw-bolder">Participant Detail</h6>
                      <p>
                        {" "}
                        {capitalizeFirstLetter(
                          expenses[0].participants[0].name
                        )}{" "}
                      </p>
                      <p className="text-muted p-0 ">
                        {" "}
                        {expenses[0].participants[0].email}{" "}
                      </p>
                    </div>
                    <div>
                      <h6 className="fw-bolder">Expense Detail</h6>
                      <p>Total Amount: {balanceSummary} <CurrencyLabel currencyCode={baseCurrency} /> </p>
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
              className="bg-white  container  text-center display-3 d-flex align-items-center justify-content-center "
              style={{ minHeight: "80vh" }}
            >
              
              {loading ? null: <div>No Logs Found</div>}
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

export default PartcipantSummary;
