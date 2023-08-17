import React from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/sidebar";
import NewNavbar from "../../components/newNavbar";
import Loader from "../../components/loader";
import { useState, useEffect } from "react";
import moment from "moment";
import GetGroups from "../../services/group/GetGroups";
import Cookies from "js-cookie";
import Tooltip from "@mui/material/Tooltip";
import CurrencyLabel from "../../components/symbols";
import getExchangesRates from "../../utils/currencyUtils";

import { Modal } from "react-bootstrap";
import { Box, Typography } from "@mui/material";
import {
  WhatsappShareButton,
  EmailShareButton,
  LinkedinShareButton,
} from "react-share";
import { FaWhatsapp, FaEnvelope, FaLinkedin, FaShare } from "react-icons/fa";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import LetterAvatars from "../../components/avator";
import "./dashboard.css";
import AvatarGroup from "@mui/material/AvatarGroup";
import logo from "../../assest/new-logo.png";

function Dashboard() {
  //  Fetch Base Currency
  const baseCurrency = useSelector((state) => state.app.baseCurrency);

  // Initialize hooks and state variables
  const navigate = useNavigate();
  const user = useSelector((state) => state.app.user);
  const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // State for Share Link Modal
  const [shareModal, setShareModal] = useState(false);

  // Fetch groups data when the component mounts or when navigation changes
  useEffect(() => {
    document.title = "Group";
    fetchData();
  }, [navigate]);

  // Function to fetch groups data using the GetGroups service
  const fetchData = async () => {
    setLoading(true);
    console.log(user);
    const res = await GetGroups.userGroups(user._id);
    if (res && res.status === "success") {
      // Simulating a delay to demonstrate the loader
      setTimeout(() => {
        setGroups(res.data);
        setLoading(false);
      }, 2000);
    } 
  
  };



  // Calculate Group Total Ammount Summary

  const calculateGroupTotalAmount = (expensesArray) => {
    let groupBalance = 0;
    for (let i = 0; i < expensesArray.length; i++) {
      let expenseAmount = parseFloat(
        getExchangesRates(
          expensesArray[i].currency,
          expensesArray[i].totalAmount
        )
      );
      groupBalance += expenseAmount;
    }

    return Math.round(groupBalance).toLocaleString();
  };

  // Method for set current group object in group State
  const CurrentGroup = (name, id) => {
    let group = {
      name: name,
      _id: id,
    };

    setCurrentGroup(group);
    setShareModal(true);
  };



    //Method for capitalise String
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // method for sidebar toggle
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };
  return (
    <>
      <div
        className="d-flex"
        style={{ backgroundColor: "#eef3fd", minHeight: "100vh" }}
      >
        <SideBar isOpen={isSidebarOpen} />
        <div style={{ width: "100%" }}>
          <NewNavbar toggleSidebar={toggleSidebar}  pageName = {"Home"}  />
          <div className="container-fluid px-4">
            <div className="row g-3 my-2  justify-content-center   ">
              {groups && groups.length > 0 ? (
                groups.map((group) => (
                  <div
                    className="col-md-3 mx-2   rounded  p-3 bg-white shadow-sm "
                    key={group._id}
                  >
                    <div className="py-1  d-flex justify-content-between">
                    
                      
                      <div className="fw-bold  fs-5 ">
                        <a
                          href={`http://localhost:3000/group/${group._id}`}
                          className="text-decoration-none"
                        >
                          {" "}
                          {capitalizeFirstLetter(group.name)}
                        </a>
                      </div>

                      {group.isActive ? (
                        <div className="active">● Active</div>
                      ) : (
                        <div className="inactive">● InActive</div>
                      )}
                    

                    </div>

                    <div className=" d-flex justify-content-between ">

                    <small>
                      {moment(
                        group.createdAt,
                        "MMM D, YYYY h:mm:ss A"
                      ).fromNow()}
                    </small>
                    
                      {group.expenses && group.expenses.length > 0 ? (
                        <div className="fw-bold">
                          {" "}
                          {calculateGroupTotalAmount(group.expenses)}{" "}
                          <CurrencyLabel currencyCode={baseCurrency} />{" "}
                        </div>
                      ) : (
                        <div className="fw-bold"> 0</div>
                      )}
                    </div>
                  

                    <div className="d-flex justify-content-between mt-3">
                    <div
                        onClick={() => {
                          CurrentGroup(group.name, group._id);
                        }}
                      >
                        <Tooltip title="Share">
                          <div>
                            <FaShare size={18} />
                          </div>
                        </Tooltip>
                      </div>

                      <AvatarGroup sx={{ float: "right" }} max={3}>
                        {group.participants.map((participant) => (
                          <LetterAvatars
                            key={participant._id}
                            name={participant.name}
                          />
                        ))}
                      </AvatarGroup>
                    
                    </div>
                  </div>
                ))
              ) : (
                <div className="display-3 col  text-center text-black fw-bold">
                  {loading ? null : <span>No Group Found</span>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/*  Share Link Modal */}

      <Modal show={shareModal}>
        <Modal.Header
          closeButton
          onClick={() => setShareModal(false)}
        ></Modal.Header>
        <Modal.Body>
          <Box textAlign="center" mb={3}>
            <img src={logo} alt="Logo" width={150} />
            <Typography variant="h5" component="h4">
              Share to Everyone 🙂
            </Typography>
          </Box>
          <div className="text-center">
            <WhatsappShareButton
              url={`http://localhost:3000/group/${currentGroup._id}`}
              title={`${currentGroup.name}`}
            >
              <span className="mx-3" title="Share via WhatsApp">
                {" "}
                <FaWhatsapp size={32} style={{ color: "green" }} />
              </span>
            </WhatsappShareButton>

            <EmailShareButton
              subject={`${currentGroup.name}`}
              body={`http://localhost:3000/group/${currentGroup._id}`}
            >
              <span className="mx-3" title="Share via Email">
                {" "}
                <FaEnvelope size={32} style={{ color: "#4285f4" }} />{" "}
              </span>
            </EmailShareButton>

            <LinkedinShareButton
              url={`http://localhost:3000/group/${currentGroup._id}`}
            >
              <span className="mx-3" title="Share via Linkedin">
                {" "}
                <FaLinkedin size={32} style={{ color: "blue" }} />{" "}
              </span>
            </LinkedinShareButton>
          </div>
        </Modal.Body>
      </Modal>

      {loading && <Loader />}
      <Footer />
    </>
  );
}

export default Dashboard;
