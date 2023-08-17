// Importing necessary libraries and components
import React from "react";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material"; // Importing Material UI Components
import { Button, Modal, Form } from "react-bootstrap"; // Importing React Components
import LetterAvatars from "../../components/avator"; // Letter Avatar
import Multiselect from "multiselect-react-dropdown"; // Multi-Select with checkbox
import SelectCurrency from "react-select-currency"; // Currency Dropdown
import logo from "../../assest/new-logo.png"; // Logo
import Loader from "../../components/loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import CurrencyLabel from "../../components/symbols";
import getExchangesRates from "../../utils/currencyUtils";

// Import Group-related services
import GetGroups from "../../services/group/GetGroups";
import Participant from "../../services/group/Partcipant";
import UpdateGroup from "../../services/group/UpdateGroup";
import Expense from "../../services/expense/Expense";

import { useSelector } from "react-redux";

// Importing React Share Buttons for sharing
import {
  WhatsappShareButton,
  EmailShareButton,
  LinkedinShareButton,
} from "react-share";

import { FaWhatsapp, FaEnvelope, FaLinkedin } from "react-icons/fa";

import { useParams } from "react-router-dom";

import SideBar from "../../components/sidebar";
import NewNavbar from "../../components/newNavbar";
import "./expenses.css";
import Tooltip from "@mui/material/Tooltip";

import {
  FaShare,
  FaBars,
  FaPencilAlt,
  FaTimes,
  FaUserPlus,
  FaUserShield,
  FaPlus,
  FaInfo,
} from "react-icons/fa";
import { MdGroup } from "react-icons/md";

function Expenses() {
  // Get the group ID from route parameters for fetching the group
  const { id } = useParams();

  // Get the user and baseCurrency from Redux store
  const user = useSelector((state) => state.app.user);
  const baseCurrency = useSelector((state) => state.app.baseCurrency);

  // States to save data after fetching group data
  const [group, setGroup] = useState({});

  // SideBar Open or Close
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // States for controlling various modals

  const [loading, setLoading] = useState(false); // State for loading
  const [CreateModal, setCreateModal] = useState(false); // State for Create Expenses modal
  const [expenseTitle, setExpenseTitle] = useState(""); // State for expense title
  const [expenseDesc, setExpenseDesc] = useState(""); // State for expense description
  const [expenseCurrency, setExpenseCurrency] = useState(""); // State for currency
  const [wpaidby, setwpaidby] = useState(""); // State for "who paid by" participant
  const [expensesPartcipant, setExpensesPartcipant] = useState(); // State for rendering participants in Create Expenses Participant Multi-Select Options
  const [groupParticiant, setGroupParticipant] = useState(); // State for storing participants in Create Expenses Participant Multi-Select Options
  const [totalBill, setTotalBill] = useState(""); // State for total bill
  const [perHead, setPerHead] = useState(""); // State for per head amount
  const [expenseMsg, SetExpenseMsg] = useState(""); // State for displaying error messages related to expenses

  // State for Share Link Modal
  const [shareModal, setShareModal] = useState(false);

  // State for Update Group Name Edit Modal
  const [editModal, setEditModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [editmsg, setEditMsg] = useState("");

  // State for Add Participants Modal
  const [addPartiModal, setaddPartiModal] = useState(false);
  const [addPartiEmail, setaddPartiEmail] = useState("");
  const [addPartiMsg, setaddPartiMsg] = useState("");



  // Fetch group data when the component mounts
  useEffect(() => {
    document.title = "Group";
    fetchGroup();
  }, []);

  // Function to fetch the group data
  const fetchGroup = async () => {
    setLoading(true);
    const res = await GetGroups.getGroup(id);
    if(res && res.status == "success"){
      setGroup(res.data);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Function to remove a participant from the group
  const removeParticipant = async (participantid) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this participant?"
    );
    if (confirmation) {
    const res =   await Participant.removeParticipant(participantid, group._id);
     if(res && res.status == "success"){
      fetchGroup();
      toast.success(`Participant Deleted`);
     }
    }
  };

  // Function to add a participant to the group
  const addParticipant = async () => {
    setaddPartiMsg("");
    const res = await Participant.addParticipant(addPartiEmail, group._id);
    if (res && res.status === "success") {
      fetchGroup();
      setaddPartiModal(false);
      setaddPartiMsg("");
      toast.success(`Participant Added`);
    } else {
      if(res){
        setLoading(true);
        setTimeout(() => {
          setaddPartiMsg(res.message);
          setLoading(false);
        }, 500);
      }
    }
  };

  // Function to update the group name
  const updateGroupName = async () => {
    if (newName === "") {
      setEditMsg("Please Enter Correct Name");
      return;
    }

     const res = await UpdateGroup.updateGroupName(newName, group._id);
     if(res && res.status === "success"){
      setEditModal(false);
      fetchGroup();
      toast.success(`Group Name Updated`);
     }

  };

  // Function to update the group status (active/inactive)
  const updateGroupStatus = async (e) => {
    const res =   await UpdateGroup.updateGroupStatus(e.target.checked, group._id);
    if(res && res.status === "success"){
    fetchGroup();
    toast.success(`Group Status Updated`);
    }
  };

  // Function to calculate the per head amount based on the total bill and number of participants
  const calculateBill = (e, groupLength) => {
    setTotalBill(e);
    if (groupLength) {
      const perHeadBill = e / (groupLength + 1);
      const bill = Math.floor(perHeadBill);
      setPerHead(bill);
    } else {
      if (groupParticiant) {
        const perHeadBill = e / (groupParticiant.length + 1);
        const bill = Math.floor(perHeadBill);
        setPerHead(bill);
      }
    }
  };

  // Function to handle participant selection for creating an expense
  const handleParticipant = (e) => {
    if (e.length < 1) {
      SetExpenseMsg("Enter at least one Participant");
      setTotalBill("");
      setPerHead("");
      setGroupParticipant("");
      return;
    }
    setGroupParticipant(e);
    calculateBill(totalBill, e.length);
  };

  // function for Create Expenses
  const handleCreateExpense = async (e) => {
    // Check if the expense title is empty
    if (expenseTitle === "") {
      SetExpenseMsg("Please enter a name for the expense.");
      return;
    }

    // Check if the expense description is empty
    if (expenseDesc === "") {
      SetExpenseMsg("Please enter a description for the expense.");
      return;
    }

    // Check if the participant who paid for the expense is selected
    if (!wpaidby) {
      SetExpenseMsg("Please select who paid for the expense.");
      return;
    }

    // Check if at least one participant is selected
    if (groupParticiant === undefined || groupParticiant.length < 1) {
      SetExpenseMsg("Please select at least one participant.");
      return;
    }

    // Check if the expense currency is selected
    if (expenseCurrency === "") {
      SetExpenseMsg("Please select a currency.");
      return;
    }

    // Check if the total bill amount is empty or not a number
    if (totalBill === "" || isNaN(totalBill)) {
      SetExpenseMsg("Please enter a valid total bill amount.");
      return;
    }

    // Add the participant who paid for the expense to the selected participants
    setGroupParticipant([...groupParticiant, wpaidby]);

    // Create an array to store the details of each participant and their respective per head amount
    var updatedParticipant = [];

    // Iterate through the selected participants and create an object for each participant
    for (let i = 0; i < groupParticiant.length; i++) {
      const participant = {
        _id: groupParticiant[i]._id,
        name: groupParticiant[i].name,
        email: groupParticiant[i].email,
        perHead: perHead,
      };
      updatedParticipant.push(participant);
    }

    // Add the participant who paid for the expense to the updated participants array
    updatedParticipant = [
      ...updatedParticipant,
      {
        _id: wpaidby._id,
        name: wpaidby.name,
        email: wpaidby.email,
        perHead: perHead,
      },
    ];


    // Create an object with all the information for the new expense
    const data = {
      title: expenseTitle,
      description: expenseDesc,
      currency: expenseCurrency,
      paidBy: wpaidby.name,
      participants: updatedParticipant,
      totalAmount: totalBill,
      perHead: perHead,
      groupId: group._id,
    };

    console.log(data); // Log the expense data for debugging purposes

    // Call the API to create the new expense
    const res = await Expense.createExpense(data);
    if(res && res.status === "success"){
      setCreateModal(false); // Close the expense creation modal

      // Fetch the updated group data to refresh the view
      fetchGroup();
      toast.success(`Expenses Log Created!`); // Show a success toast message
  
      // Clear the form fields and states related to expense creation
      setExpenseCurrency("");
      setExpenseTitle("");
      setExpenseDesc("");
      setwpaidby("");
      setGroupParticipant("");
      setExpensesPartcipant("");
      setTotalBill("");
      setPerHead("");
    }
  };

  // function for set who paid by 
  const handlepaidBy = async (e) => {
    if (e == "") {
      setExpensesPartcipant("");
      return;
    }
    // Filter the selected participant who paid for the expense
    let PaidByparticipant = group.participants.filter((part) => part._id == e);

    // Filter the participants excluding the one who paid for the expense
    let previousparticipant = group.participants.filter(
      (part) => part._id != e
    );

    // Set the state for expenses participants to exclude the one who paid for the expense
    setExpensesPartcipant(previousparticipant);

    // Set the state for the participant who paid for the expense
    setwpaidby({ ...PaidByparticipant[0] });
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
    console.log(value);
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
          <NewNavbar toggleSidebar={toggleSidebar}  pageName = {"Group"}  />
          <div className="d-flex row m-5">
            <main className="col-12 col-md-12 col-lg-9 ">
              <div className="card card-flush pt-3 mx-2 mb-5 mb-lg-10  shadow-sm ">
                <div className="card-header  bg-white d-flex justify-content-between mb-3 ">
                  <div>
                    <h5 className="fw-bold"> {group.name} </h5>
                  </div>
                  <div className="d-flex">
                    <div className=" mx-2 mt-1 text-muted  ">
                      <Tooltip title="Share">
                        <span
                          className="icon text-muted"
                          onClick={() => {
                            setShareModal(true);
                          }}
                        >
                          <FaShare size={20} />
                        </span>
                      </Tooltip>
                    </div>
                    {user && user._id === group.creatorId && (
                      <>
                        <div className="icon mx-3  mt-1 text-muted  ">
                          <Tooltip title="Edit">
                            <span
                              className="icon text-muted"
                              onClick={() => {
                                setEditModal(true);
                              }}
                            >
                              <FaPencilAlt size={20} />
                            </span>
                          </Tooltip>
                        </div>

                        <div className="active-switch text-muted    ">
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={group.isActive}
                                  onChange={(e) => {
                                    updateGroupStatus(e);
                                  }}
                                />
                              }
                              label={group.isActive ? "Active" : "Inactive"}
                            />
                          </FormGroup>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="card-body pt-0  ">
                  <div className="d-flex row  justify-content-between mb-3">
                    <div className="col-12 col-md-6 col-lg-6">
                      <h5> Expenses Log </h5>
                    </div>
                    <div className="col-12 col-md-6 col-lg-6  text-end ">
                      {user && user._id === group.creatorId ? (
                        <button
                          type="button"
                          class="btn btn-outline-primary"
                          onClick={() => {
                            setCreateModal(true);
                          }}
                        >
                          {" "}
                          <FaPlus /> Add Expense{" "}
                        </button>
                      ) : (
                        <div className="  fw-bold  text-center bg-white rounded  ">
                          <h4> Only Admin Add Expenses </h4>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="table-responsive">
                    {group.expenses && group.expenses.length > 0 ? (
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
                              Participants
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
                          {group.expenses.map((expense) => (
                            <tr>
                              <td> {capitalizeFirstLetter(expense.title)} </td>
                              <td> {expense.paidBy} </td>
                              <td> {expense.participants.length} </td>
                              <td>
                                {" "}
                                <span>
                                  {convertAmount(
                                    expense.currency,
                                    expense.perHead
                                  )}{" "}
                                </span>
                                <CurrencyLabel currencyCode={baseCurrency} />{" "}
                              </td>
                              <td className="text-end">
                                <a
                                  href={`http://localhost:3000/group/${group._id}/${expense._id}`}
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
                    ) : (
                      <h3 className="text-center fw-bold  mt-5 ">
                        {loading ? null : <span>No Expenses Found</span>}
                      </h3>
                    )}
                  </div>
                </div>
              </div>
            </main>
            <aside className="col-12 col-md-12 col-lg-3 ">
              <div className="card card-flush pt-3    mb-0">
                <div className="card-header mt-1 bg-white  d-flex justify-content-between ">
                  <div className="card-title">
                    <h5>
                      {" "}
                      <span>
                        {" "}
                        <MdGroup />{" "}
                      </span>{" "}
                      Participants{" "}
                    </h5>
                  </div>

                  <div className="text-end  mx-2 fs-5  text-muted">
                    {user && user._id === group.creatorId && (
                      <span
                        className="icon"
                        onClick={() => {
                          setaddPartiModal(true);
                        }}
                      >
                        <Tooltip title={"Add Participant"}>
                          <span>
                            {" "}
                            <FaUserPlus />{" "}
                          </span>
                        </Tooltip>{" "}
                      </span>
                    )}
                  </div>
                </div>
                <div className="card-body p-0  fs-6">
                  <ul className="p-0">
                    {group.participants &&
                      group.participants.map((particiant) => (
                        <li
                          className="participant-list-item my-3"
                          key={particiant._id}
                        >
                          <div className="d-flex">
                            <div className="mx-2 mt-2">
                              <LetterAvatars name={particiant.name} />
                            </div>

                            <div>
                              <span className="partcipant-name ">
                                <a
                                  href={`http://localhost:3000/participantsummary/${group._id}/${particiant._id}`}
                                >
                                  {" "}
                                  {capitalizeFirstLetter(particiant.name)}{" "}
                                </a>
                                {particiant._id === group.creatorId ? (
                                  <FaUserShield />
                                ) : null}{" "}
                              </span>
                              <br />
                              <small className="text-muted">
                                {particiant.email}
                              </small>
                            </div>
                          </div>
                          {user && user._id === group.creatorId && (
                            <div>
                              <span
                                className="remove-participant-icon"
                                id={particiant._id}
                                onClick={() =>
                                  removeParticipant(particiant._id)
                                }
                              >
                                <FaTimes />
                              </span>
                            </div>
                          )}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* ---------------------Modals--------------------*/}

      {/*  Addd Expenses Modal */}

      <Modal show={CreateModal}>
        <Modal.Header
          closeButton
          onClick={() => setCreateModal(false)}
          className="px-5"
        >
          <Modal.Title> Create Expense </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-5">
          <Form>
            {expenseMsg && (
              <div class="alert alert-danger" role="alert">
                {expenseMsg}
              </div>
            )}

            <Form.Group id="title" className="my-2">
              <Form.Label className=" fw-bold">
                {" "}
                Title <span className="text-danger">*</span>{" "}
              </Form.Label>
              <Form.Control
                style={{ backgroundColor: "#e9ecef" }}
                id="title"
                type="text"
                placeholder="Enter title"
                onChange={(e) => {
                  setExpenseTitle(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group id="desc" className="my-2">
              <Form.Label className=" fw-bold">
                {" "}
                Description <span className="text-danger">*</span>{" "}
              </Form.Label>
              <textarea
                style={{ backgroundColor: "#e9ecef" }}
                id="desc"
                className="form-control"
                placeholder="Enter description"
                value={expenseDesc}
                onChange={(e) => {
                  setExpenseDesc(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group id="who-paid-by" className="my-2">
              <Form.Label className="fw-bold">
                {" "}
                Who Paid By <span className="text-danger">*</span>{" "}
              </Form.Label>
              <Form.Control
                style={{ backgroundColor: "#e9ecef" }}
                id="who-paid-by"
                as="select"
                onChange={(e) => {
                  handlepaidBy(e.target.value);
                }}
              >
                <option value="">-- Select --</option>
                {group.participants &&
                  group.participants.map((part) => (
                    <option value={part._id}> {part.name} </option>
                  ))}
              </Form.Control>
            </Form.Group>

            <Form.Group id="participants" className="my-2">
              <Form.Label className="fw-bold">
                {" "}
                Select Participant <span className="text-danger">*</span>{" "}
              </Form.Label>
              {expensesPartcipant ? (
                <Multiselect
                  style={{ backgroundColor: "#e9ecef" }}
                  displayValue="name"
                  placeholder={
                    groupParticiant && groupParticiant.length > 0
                      ? ""
                      : "--- Select Participant---"
                  }
                  onRemove={(e) => handleParticipant(e)}
                  // onSearch={function noRefCheck() { }}
                  onSelect={(e) => handleParticipant(e)}
                  options={expensesPartcipant && expensesPartcipant}
                />
              ) : (
                <Form.Control
                  id="participant"
                  type="text"
                  disabled
                  value={"Loading......"}
                  readOnly
                />
              )}
            </Form.Group>

            <Form.Group id="currency-dropdown" className="my-2">
              <Form.Label className="fw-bold">
                {" "}
                Currency <span className="text-danger">*</span>{" "}
              </Form.Label>
              <SelectCurrency
                style={{ backgroundColor: "#e9ecef", border: "none" }}
                onChange={(e) => {
                  setExpenseCurrency(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group id="bill" className="my-2">
              <Form.Label className="fw-bold">
                {" "}
                Total Bill <span className="text-danger">*</span>{" "}
              </Form.Label>
              <Form.Control
                id="bill"
                type="number"
                value={totalBill}
                disabled={!groupParticiant || groupParticiant.length < 0}
                readOnly={!groupParticiant || groupParticiant.length < 0}
                onChange={(e) => {
                  calculateBill(e.target.value);
                }}
                placeholder="Enter total bill"
              />
            </Form.Group>

            <Form.Group id="perhead" className="my-2">
              <Form.Label className="fw-bold">
                {" "}
                Per Head <span className="text-danger">*</span>{" "}
              </Form.Label>
              <Form.Control
                id="perhead"
                type="text"
                disabled
                value={perHead}
                readOnly
                placeholder="Per head amount"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setCreateModal(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleCreateExpense();
            }}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>

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
              url={`http://localhost:3000/group/${group._id}`}
              title={`${group.name}`}
            >
              <span className="mx-3" title="Share via WhatsApp">
                {" "}
                <FaWhatsapp size={32} style={{ color: "green" }} />
              </span>
            </WhatsappShareButton>

            <EmailShareButton
              subject={`${group.name}`}
              body={`http://localhost:3000/group/${group._id}`}
            >
              <span className="mx-3" title="Share via Email">
                {" "}
                <FaEnvelope size={32} style={{ color: "#4285f4" }} />{" "}
              </span>
            </EmailShareButton>

            <LinkedinShareButton
              url={`http://localhost:3000/group/${group._id}`}
            >
              <span className="mx-3" title="Share via Linkedin">
                {" "}
                <FaLinkedin size={32} style={{ color: "blue" }} />{" "}
              </span>
            </LinkedinShareButton>
          </div>
        </Modal.Body>
      </Modal>

      {/* Edit GroupName Modal*/}

      <Modal show={editModal}>
        <Modal.Header closeButton onClick={() => setEditModal(false)}>
          <Modal.Title> Update Group Name </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editmsg && (
            <div class="alert alert-danger" role="alert">
              {editmsg}
            </div>
          )}
          <Form>
            <Form.Group controlId="title">
              <Form.Label className="fw-bold"> Group Name </Form.Label>
              <Form.Control
                type="text"
                defaultValue={group.name}
                onChange={(e) => {
                  setNewName(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => updateGroupName()}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Participant Modal */}

      <Modal show={addPartiModal}>
        <Modal.Header closeButton onClick={() => setaddPartiModal(false)}>
          <Modal.Title> Add Participants </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {addPartiMsg && (
            <div class="alert alert-danger" role="alert">
              {addPartiMsg}
            </div>
          )}
          <Form>
            <Form.Group controlId="title">
              <Form.Label className="fw-bold">
                {" "}
                Email <span className="text-danger">*</span>{" "}
              </Form.Label>
              <Form.Control
                style={{ backgroundColor: "#e9ecef" }}
                type="email"
                placeholder="example@gmail.com"
                onChange={(e) => {
                  setaddPartiEmail(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setaddPartiModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => addParticipant()}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Loader */}
      {loading && <Loader />}
      <ToastContainer />
    </>
  );
}

export default Expenses;
