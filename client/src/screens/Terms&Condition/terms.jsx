import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TermsServices from "../../services/terms/Terms";
import moment from "moment";
import {FaPencilAlt} from "react-icons/fa";
import Loader from "../../components/loader";
import { ToastContainer, toast } from "react-toastify";


function Terms() {

    const [value, setValue] = useState({});
    const [newValue, setNewValue] = useState("");
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);


    let user = null;
    try {
      const userString = localStorage.getItem("user");
      if (userString) {
        user = JSON.parse(userString);
      }
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
    }



  useEffect(() => {
    document.title = "Terms & Condition";
    fetch();
  }, []);


  const fetch = async() => {
    setLoading(true)
  const res = await TermsServices.getTerms();
   setValue(res.data[0]);
   setTimeout(() => {
    setLoading(false)
   }, 500);

  }


  const updateTerms = async () => {
    const res = await TermsServices.updateTerms(newValue,value._id);
    toast.success(`Updated!`);
    setEdit(false);
    fetch();
  }



  const scrollbarStyles = `
  ::-webkit-scrollbar {
    width: 5px;

  }

  ::-webkit-scrollbar-thumb {
    background-color: blue;
    border-radius: 6px; 
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: darkblue;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-button {
    display: none;
  }
`;

  const fadingTextStyle = {
    height: "60%",
    overflow: "auto",
    width: "100%",
    WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
    maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
    color: "#6c757d",
    marginTop: "10px",
  };

  return (
    // Main Container
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#eef3fd", height: " 100vh " }}
    >
      <style>{scrollbarStyles}</style>
      {/*  Login Box */}
      <div
        className="col-12 col-md-7 rounded bg-white shadow-md px-4"
        style={{ height: "80%", position: "relative" }}
      >
        <h5 className="text-primary text-center my-4">
          {" "}
          Terms and Conditions{" "}
        </h5>
        {edit ? (
          <>
            <ReactQuill
              theme="snow"
              defaultValue={value.content}
              onChange={(e) => {
                setNewValue(e)
              }}
              className="mt-3"
              style={{ height: "75%", paddingBottom: "70px" }}
            />
            <div className="text-end ">
              <button type="button"     onClick={()=>{setEdit(false)}} class="btn   mx-2 btn-outline-secondary">
                Cancel
              </button>
              <button type="button"  onClick={updateTerms}  class="btn    mx-2 btn-primary">
                Save Changes
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="px-3 d-flex justify-content-between" >  
            <span
              style={{ color: "#6c757d", fontSize: "1rem" }}
         
            >
            
              Last Updated : {moment(value.updatedAt).format('MMM D, YYYY')}
            </span>

          {user && user.role === "admin" ? ( <span className="text-muted"  onClick={()=>{setEdit(true)}} > <FaPencilAlt/> </span>) : null  }   
            </div>
            {value && <div style={fadingTextStyle}  dangerouslySetInnerHTML={{ __html: value.content }} className="px-3"  >      
            </div>}
            <div className="text-center mt-3">
              <button
                type="button"
                class="btn  px-5 mx-2 btn-outline-secondary"
              >
                Decline
              </button>
              <button type="button" class="btn  px-5 mx-2 btn-primary">
                Accept
              </button>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
      {loading && <Loader />}
    </div>
  );
}

export default Terms;
