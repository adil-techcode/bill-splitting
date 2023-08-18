import React, { useState } from "react";
import "./sidebar.css";
import logo from "../assest/new-logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { FaUsers, FaReceipt, FaCog   } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import SelectCurrency from "react-select-currency";
import { Modal, Form, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBaseCurrency } from "../reduxStore/userSlice";
import CurrencyConversion from "../services/currencyExchange/CurrencyConversion";
import { FiShield } from 'react-icons/fi';



const SideBar = ({ isOpen }) => {
  const dispatch = useDispatch(); // For Update Redux State

  // States
  const defaultCurrency = localStorage.getItem("baseCurrency"); 
  const [currencyModal, setCurrencyModal] = useState(false);
  const [currency, setCurrency] = useState(defaultCurrency);
  const [newBaseCurrency, setNewBaseCurrency] = useState("");

  useEffect(() => {
    const currency = localStorage.getItem("baseCurrency");
    if (!currency) {
      // set default Currency
      localStorage.setItem("baseCurrency", "PKR");
    }
          // call api to get default currency Exchange Rates
          fetchExchangeseRates(localStorage.getItem("baseCurrency"));

  }, []);

  const fetchExchangeseRates = async (value) => {
    const res = await CurrencyConversion.getExchangeRate(value);
    if(res){
      localStorage.setItem("exchangesRates", JSON.stringify(res));
    }
  };

  const updateBaseCurrency = (value) => {
    fetchExchangeseRates(newBaseCurrency);
    localStorage.setItem("baseCurrency", newBaseCurrency);
    dispatch(setBaseCurrency(newBaseCurrency));
    setCurrencyModal(false);
    window.location.reload();
  };

  const sidebarVariants = {
    open: { width: 250 },
    closed: { width: 0 },
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="bg-white d-flex flex-column max-height vh-80"
            id="sidebar-wrapper"
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            exit="closed"
            variants={sidebarVariants}
            transition={{ duration: 0.3 }}
          >
            <div className="sidebar-heading  py-2     justify-content-center d-flex ">
              <img src={logo} width={80} alt="Go-split-logo" />
            </div>
            <div className={`list-group list-group-flush my-1 ${window.location.pathname === "/user/groups" ? "nav-active" : ""} ${window.location.pathname === "/admin/dashboard" ? "d-none" : ""} `}  >
              <a
                href="http://localhost:3000/user/groups"
                className="list-group-item list-group-item-action  bg-transparent  fw-bold"
              >
                <AiFillHome size={20} />
                <span className="mx-1"> Home </span>
              </a>
            </div>
            <div className={`list-group list-group-flush  my-1 ${window.location.pathname === "/admin/dashboard" ? "nav-active" : ""} ${window.location.pathname === "/admin/dashboard" ? "d-block" : "d-none"} `}  >
              <a
                href="http://localhost:3000/user/groups"
                className="list-group-item list-group-item-action  bg-transparent  fw-bold"
              >
                <AiFillHome size={20} />
                <span className="mx-1"> Dashobard </span>
              </a>
            </div>



            <div className={`list-group list-group-flush my-1 ${window.location.pathname === "/create/group" ? "nav-active" : ""}  ${window.location.pathname === "/admin/dashboard" ? "d-none" : ""} `}  >
              <a
                href="http://localhost:3000/create/group"
                className="list-group-item list-group-item-action  bg-transparent  fw-bold"
              >
                <FaUsers size={20} />
                <span className="mx-1"> Create Group </span>
              </a>
            </div>
            <div className={`list-group list-group-flush my-1 ${window.location.pathname === "/user/expense" ? "nav-active" : ""}   ${window.location.pathname === "/admin/dashboard" ? "d-none" : ""} `}>
              <a
                href="http://localhost:3000/user/expense"
                className="list-group-item list-group-item-action  bg-transparent  fw-bold"
              >
                <FaReceipt size={20} />
                <span className="mx-1"> Expenses </span>
              </a>
            </div>

            <div className={`list-group list-group-flush my-1 ${window.location.pathname === "/user/expense" ? "nav-active" : ""} `}>
              <a
                href="http://localhost:3000/privacy-and-policy"
                className="list-group-item list-group-item-action  bg-transparent  fw-bold"
              >
                <FiShield size={20} style={{ fill: 'black' }} />
                <span className="mx-1"> Privacy Policy </span>
              </a>
            </div>

            <div className="list-group list-group-flush my-1 ">
              <a
                onClick={() => setCurrencyModal(true)}
                className="list-group-item list-group-item-action  bg-transparent  fw-bold"
              >
                <FaCog size={20} />
                <span className="mx-1"> Setting </span>
              </a>
            </div>


          </motion.div>
        )}
      </AnimatePresence>

      <Modal show={currencyModal}>
        <Modal.Header closeButton onClick={() => setCurrencyModal(false)}>
          <Modal.Title> Settings </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group id="currency-dropdown" className="my-2">
              <Form.Label className="fw-bold"> Currency</Form.Label>
              <SelectCurrency
                style={{ backgroundColor: "#e9ecef", border: "none" }}
                value={currency}
                onChange={(e) => {
                  setNewBaseCurrency(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setCurrencyModal(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              updateBaseCurrency();
            }}
          >
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SideBar;
