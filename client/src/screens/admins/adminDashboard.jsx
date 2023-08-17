
import React from "react";
import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart  as ChartJS } from 'chart.js/auto'




import getExchangesRates from "../../utils/currencyUtils";

import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

import { FaUsers, FaUser, FaChartBar } from "react-icons/fa";

import SideBar from "../../components/sidebar";
import NewNavbar from "../../components/newNavbar";
import Footer from "../../components/Footer";

import Statistics from "../../services/admin/Statistics";


function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // toggle tate
  

  const [totalUsers, setTotalUsers] = useState({});
  const [totalGroups, setTotalGroups] = useState({});
  const [totalExpenses, setTotalExpenses] = useState({});

  const [usersData, setUsersData] = useState({});
  const [expensesData, setExpensesData] = useState({});
  const [groupData, setGroupData] = useState({});

  useEffect(() => {
    document.title = "Admin Dashboard";
     fetchStatistics();
  }, []);

  
 const fetchStatistics = async () =>{
  const res = await Statistics.getStatistics();
 
  console.log(res.data)
  setTotalUsers(res.data.totalStatistics.users);
  setTotalGroups(res.data.totalStatistics.groups);
  setTotalExpenses(res.data.totalStatistics.expenses);


 lastMonthUsers(res.data.lastMonthStatistics.users)
 lastMonthGroups(res.data.lastMonthStatistics.groups)
 lastMonthExpenses(res.data.lastMonthStatistics.expenses)

}

 const lastMonthUsers = (userRegistrationsData) =>{
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    // Create the chart data object
    const data = {
      labels: weeks, // Use weeks array as labels (categories)
      datasets: [
        {
          data: userRegistrationsData,
          backgroundColor: '#fff',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 0.1,
        },
      ],
    };

    setUsersData(data);

 } 

 const lastMonthGroups = (groupsRegistrationsData) =>{

  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  // Create the chart data object
  const data = {
    labels: weeks, // Use weeks array as labels (categories)
    datasets: [
      {
        data: groupsRegistrationsData,
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderWidth: 1.9,
      },
    ],
  };

  setGroupData(data);
  
 } 
 const lastMonthExpenses = (expensesRegistrationsData) =>{
  
  const currentDate = new Date();
  const dateLabels = Array.from({ length: 30 }, (_, index) => {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - index);
    return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
  }).reverse();


  const expdata = {
    labels: dateLabels, // Use dateLabels array as labels (categories)
    datasets: [
      {
        data: expensesRegistrationsData,
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderWidth: 1,
     
      },
    ],
  };


  setExpensesData(expdata)
  
 } 


  //Default Currency
  const baseCurrency = useSelector((state) => state.app.baseCurrency);

  //Method for SideBar Toggle
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

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
          <NewNavbar toggleSidebar={toggleSidebar} pageName={"Admin Dashboard"} />

          <div className="m-5"  >
            <div className="row gy-4">
              <div className="col-xs-12  col-md-6 col-lg-4  ">
                <Card
                  sx={{
                    padding: "10px",
                    backgroundColor: "white",
                    overflow: "visible !important",
                  }}
                >
                  <div className="d-flex justify-content-between">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
                        marginTop: "-25px",
                        height: "4rem",
                        width: "4rem",
                        borderRadius: "0.75rem",
                        boxShadow:
                          "0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14), 0rem 0.4375rem 0.625rem -0.3125rem rgba(0, 187, 212, 0.4)",
                      }}
                    >
                      <FaUser color="white" size={25} />
                    </div>
                    <div>
                      <span className="text-muted"> Total User</span>
                      <h4> {totalUsers.count} </h4>
                    </div>
                  </div>
                  <Divider variant="middle" />
                  <div className="my-2">
                    <p>
                      {" "}
                      <small className=" text-muted fw-bold">
                        {" "}
                        <span className="text-success ">  {totalUsers.lastweekPercentage}% </span> than last
                        week
                      </small>{" "}
                    </p>
                  </div>
                </Card>
              </div>
              <div className="col-xs-12   col-md-6  col-lg-4  ">
                <Card
                  sx={{
                    padding: "10px",
                    backgroundColor: "white",
                    overflow: "visible !important",
                  }}
                >
                  <div className="d-flex justify-content-between">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "linear-gradient(195deg, #66BB6A, #43A047)",
                        marginTop: "-25px",
                        height: "4rem",
                        width: "4rem",
                        borderRadius: "0.75rem",
                        boxShadow: "0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14), 0rem 0.4375rem 0.625rem -0.3125rem rgba(76, 175, 79, 0.4)",
                      }}
                    >
                      <FaUsers color="white" size={25} />
                    </div>
                    <div>
                      <span className="text-muted"> Total Groups</span>
                      <h4> {totalGroups.count}</h4>
                    </div>
                  </div>
                  <Divider variant="middle" />
                  <div className="my-2">
                    <p>
                      {" "}
                      <small className=" text-muted fw-bold">
                        {" "}
                        <span className="text-success "> {totalGroups.lastweekPercentage}%</span> than last
                        week
                      </small>{" "}
                    </p>
                  </div>
                </Card>
              </div>
              <div className="col-xs-12   col-md-6  col-lg-4  ">
                <Card
                  sx={{
                    padding: "10px",
                    backgroundColor: "white",
                    overflow: "visible !important",
                  }}
                >
                  <div className="d-flex justify-content-between">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "linear-gradient(195deg, #EC407A, #D81B60)",
                        marginTop: "-25px",
                        height: "4rem",
                        width: "4rem",
                        borderRadius: "0.75rem",
                        boxShadow:
                          "0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14), 0rem 0.4375rem 0.625rem -0.3125rem rgba(233, 30, 98, 0.4)",
                      }}
                    >
                      <FaChartBar color="white" size={25} />
                    </div>
                    <div>
                      <span className="text-muted"> Total Expenses</span>
                      <h4> {totalExpenses.count}</h4>
                    </div>
                  </div>
                  <Divider variant="middle" />
                  <div className="my-2">
                    <p>
                      {" "}
                      <small className=" text-muted fw-bold">
                        {" "}
                        <span className="text-success "> {totalExpenses.lastweekPercentage}% </span> than last
                        week
                      </small>{" "}
                    </p>
                  </div>
                </Card>
              </div>
            </div>

        <div className="row">
          <div className="col-12 col-md-6">
          <Card className="pb-3 px-3" sx={{marginTop:"50px", overflow: "visible !important"}} > 
            <div  className="mt-3 p-3 rounded text-white" style={{background:"linear-gradient(195deg, #66BB6A, #43A047)", position: "relative",  top: "-20px",       boxShadow: "0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14), 0rem 0.4375rem 0.625rem -0.3125rem rgba(76, 175, 79, 0.4)",}} >
            {usersData && usersData.labels && usersData.datasets ? (
        <Bar
        data={usersData}
        options={{
          scales: {
            x: {
              type: 'category', // Explicitly define X-axis as a category scale
              color: 'rgb(60, 149, 238)', 
              ticks: { 
                padding: 10,
                font: {
                  size: 14,
                  weight: 300,
                  family: "Roboto",
                  style: "normal",
                  lineHeight: 2,
                },
                color: "#fff",
              },// Set X-axis labels color to white
            },
            y: {
              beginAtZero: true, // Ensure Y-axis starts from 0
              ticks: { 
                
                font: {
                  size: 14,
                  weight: 300,
                  family: "Roboto",
                  style: "normal",
                  lineHeight: 2,
                },
                color: "#fff",
              }, // Set Y-axis labels color to white
            },
          },
          plugins: {
            legend: {
              display: false, // Set display to false to hide the legend
            },
          },
          indexAxis: 'x', // Display bars horizontally
          barThickness: 10, // Adjust bar width
        }}
      />              
          ) : (
            <p>Loading chart data...</p>
          )}
            </div> 
            <div className="my-2">
              <h6>User Registration</h6>
              <span className="text-muted"> Last Month  </span>
            </div>

            </Card>

          </div>
          <div className="col-12 col-md-6">
          <Card className="pb-3 px-3" sx={{marginTop:"50px", overflow: "visible !important"}} > 
            <div  className="mt-3 p-3 rounded text-white" style={{background:"linear-gradient(195deg, #49a3f1, #1A73E8)", position: "relative",  top: "-20px",  boxShadow :  "0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14), 0rem 0.4375rem 0.625rem -0.3125rem rgba(0, 187, 212, 0.4)"}} >
            {groupData && groupData.labels && groupData.datasets ? (
        <Line
        data={groupData}
        options={{
          scales: {
            x: {
              type: 'category', // Explicitly define X-axis as a category scale
              color: 'rgb(60, 149, 238)', 
              ticks: { 
                padding: 10,
                font: {
                  size: 14,
                  weight: 300,
                  family: "Roboto",
                  style: "normal",
                  lineHeight: 2,
                },
                color: "#fff",
              },// Set X-axis labels color to white
            },
            y: {
              beginAtZero: true, // Ensure Y-axis starts from 0
              ticks: { 
                
                font: {
                  size: 14,
                  weight: 300,
                  family: "Roboto",
                  style: "normal",
                  lineHeight: 2,
                },
                color: "#fff",
              }, // Set Y-axis labels color to white
            },
          },
          plugins: {
            legend: {
              display: false, // Set display to false to hide the legend
            },
          },
          indexAxis: 'x', // Display bars horizontally
          barThickness: 10, // Adjust bar width
        }}
      />              
          ) : (
            <p>Loading chart data...</p>
          )}
            </div> 
            <div className="my-2">
              <h6> Group Registered</h6>
              <span className="text-muted"> Last Month  </span>
            </div>

            </Card>

          </div>
        </div>

        <div className="row ">
          <div className="col-12 ">
          <Card className="pb-3 px-3  mx-auto" sx={{marginTop:"50px", width:"98%", overflow: "visible !important"}} > 
            <div  className="mt-3 p-3 rounded text-white" style={{background:"linear-gradient(195deg, #FACD5E, #A8432E)", position: "relative",  top: "-20px",       boxShadow: "0 4px 6px rgba(168, 67, 46, 0.1), 0 5px 15px rgba(168, 67, 46, 0.2)",}} >
            {expensesData && expensesData.labels && expensesData.datasets ? (
        <Bar
        data={expensesData}
        options={{
          scales: {
            x: {
              type: 'category', // Explicitly define X-axis as a category scale
              color: 'rgb(60, 149, 238)', 
              ticks: { 
                padding: 10,
                font: {
                  size: 14,
                  weight: 300,
                  family: "Roboto",
                  style: "normal",
                  lineHeight: 2,
                },
                color: "#fff",
              },// Set X-axis labels color to white
            },
            y: {
              beginAtZero: true, // Ensure Y-axis starts from 0
              ticks: { 
                
                font: {
                  size: 14,
                  weight: 300,
                  family: "Roboto",
                  style: "normal",
                  lineHeight: 2,
                },
                color: "#fff",
              }, // Set Y-axis labels color to white
            },
          },
          plugins: {
            legend: {
              display: false, // Set display to false to hide the legend
            },
          },
          indexAxis: 'x', // Display bars horizontally
          barThickness: 1, // Adjust bar width
        }}
      />              
          ) : (
            <p>Loading chart data...</p>
          )}
            </div> 
            <div className="my-2">
              <h4>Expenses</h4>
              <span className="text-muted"> Last Month  </span>
            </div>

            </Card>
          </div>
        </div>

          
          </div>
        </div>
      </div>

      <Footer />

      {/* Show loader while loading data
     {loading && <Loader />} */}
    </>
  );
}

export default AdminDashboard;
