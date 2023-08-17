import SideBar from "../../components/sidebar";
import NewNavbar from "../../components/newNavbar";

import React, { useState, useEffect } from "react";
import expensesImage from "../../assest/Investment data-amico.png";
import logo from "../../assest/new-logo.png";
import { Container, Row, Col, Form } from "react-bootstrap";
import VerifyingUser from "../../services/auth/userAuth/VerifyingUser";
import GroupRegistration from "../../services/group/GroupRegistration";
import { FaTimes, FaUserPlus } from "react-icons/fa";
import Loader from "../../components/loader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../../components/Footer";

function NewGroup() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [participants, setParticipants] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.app.user);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "New Group";
    setParticipants([user.email]);
  }, []);

    // method for sidebar toggle
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };


// function for add partcupant in array
  const handleAddParticipant = async (event) => {
    event.preventDefault();
    setMsg("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMsg(" Invalid:  Email format is incorrect");
      return;
    }

    // Checking Duplicate participant
    for (let i = 0; i < participants.length; i++) {
      if (participants[i] === email) {
        setMsg(" Invalid:  Participant Already Added");
        return;
      }
    }

    // Checking User is Registered or Not

    const isUser = await VerifyingUser.isUser(email);
    console.log(isUser);
    if (isUser &&  isUser.status == "failed") {
      console.log("failed");
      setMsg(" Invalid:  User Not Registered");
      return;
    }
    else if(isUser &&  isUser.status == "success"){
      // Add Participant to array
    const newparticipant = [...participants];
    newparticipant.push(email);
    setParticipants(newparticipant);

    setEmail("");
    setMsg("");
    }

  
  };

  // function for remove participant in array
  const handleRemoveParticipant = (index) => {
    const updatedParticipants = [...participants];
    updatedParticipants.splice(index, 1);
    setParticipants(updatedParticipants);
  };

  //function  for create Group
  const handleCreateParticipants = async (event) => {
    event.preventDefault();

   
    if (name === "") {
      console.log("name");
      setMsg(" Please Enter Name");
      return;
    }

    if (participants.length < 2) {
      console.log("particpant");
      setMsg(" The participants  should not be less than 2");
      return;
    }

  

  

    setLoading(true);
    const res = await GroupRegistration.groupRegistration(
      name,
      user._id,
      participants
    );
    if (res &&  res.status === "success") {
      toast.success(`Group Created!`);
      setTimeout(() => {
        setLoading(false);
        navigate("/user/groups");
      }, 2000);
    }
  };

  return (
    <>
      <div
        className="d-flex"
        style={{ backgroundColor: "#eef3fd", minHeight: "100vh" }}
      >
        <SideBar isOpen={isSidebarOpen} />
        <div style={{ width: "100%" }}>
          <NewNavbar toggleSidebar={toggleSidebar}  pageName = {"Create Group"}  />
          <Container>
            <Row
              className="gap-5  bg-white rounded shadow my-4 mx-4 "
              style={{ minHeight: "100vh", border: "1px solid #ccc" }}
            >
              {/* Expense Image Col */}
              <Col md={6} lg={6} className="d-none d-sm-block m-3 ">
                <div>
                  <img
                    src={expensesImage}
                    alt="expenses-img"
                    className="img-fluid p-5"
                    style={{ height: "500px" }}
                  />
                </div>
              </Col>

              {/* Create Group Form Col */}
              <Col md={5} className="" lg={5}>
                <div className="px-4 mt-2  py-4 ">
                  {/* Header with Logo or Title */}
                  <div className="text-center  mb-3 ">
                    <img src={logo} alt="logo" width={150} />
                    <h3> New Group </h3>
                      {msg &&        
                      <div class="alert alert-danger" role="alert">
                      {msg}
                      </div>  }
              
                    
                  </div>

                  {/* Form */}
                  <Form>
                    <Form.Group id="name" className="mt-5">
                      <Form.Label> Name: </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Roommates"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </Form.Group>

                    {/* Add participants */}
                    <Form.Group id="participant" className="mt-2">
                      <Form.Label> Participant: </Form.Label>
                      <br />
                      <div>
                        <input
                          type="email"
                          value={email}
                          style={{ width: "80%", display: "inline" }}
                          className="py-1 px-2  form-control  mb-3"
                          placeholder="example@gmail.com"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                        <button
                          onClick={handleAddParticipant}
                          className="btn py-1 mx-1 px-3 btn-primary  mb-2"
                        >
                          {" "}
                          <FaUserPlus />{" "}
                        </button>
                      </div>

                      {/*  List Participant Using Map Method */}
                      {participants &&
                        participants.map((participant, index) => (
                          <div key={index}>
                            <input
                              readOnly
                              type="text"
                              value={participant}
                              style={{ width: "80%", display: "inline" }}
                              className="py-1 px-2  my-2 form-control "
                            />
                            {participants.length > 0 && (
                              <button
                                type="button"
                                className="btn py-1  mx-1 px-3 btn-secondary"
                                onClick={() => handleRemoveParticipant(index)}
                              >
                                <FaTimes />
                              </button>
                            )}
                          </div>
                        ))}
                    </Form.Group>

                    <button
                      onClick={handleCreateParticipants}
                      className="btn btn-primary w-100 mt-3  "
                    >
                      {" "}
                      Create{" "}
                    </button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <ToastContainer />
      {loading && <Loader />}
      <Footer />
    </>
  );
}

export default NewGroup;
