import { BrowserRouter, Route, Routes } from "react-router-dom";

import React from "react";
import { Provider } from "react-redux";
import store from "../reduxStore/store";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";






// Auth
import Login from "../screens/auth/SignIn";
import SignUp from "../screens/auth/SignUp";
import ForgetPassword from "../screens/auth/ForgetPassword";
import NewPassword from "../screens/auth/NewPassword";
import Googleauthredirect from "../components/googleAuthRedirect";

// Group Private Route
import Dashboard from "../screens/groups/dashboard";

// Expeses
import Expenses from "../screens/expense/expenses";
import ExpenseDetail from "../screens/expense/expenseDetail";
import PartcipantSummary from "../screens/expense/participantSummary";

//UserExpenses
import UserExpense from "../screens/userExpenses/userExpenses";

import AdminDashboard from "../screens/admins/adminDashboard";

import NewGroup from "../screens/groups/newGroup";


//Error Screens
import NotFoundPage from "../screens/errroPages/pageNotFound";
import ServiceUnavailable from "../screens/errroPages/serviceUnavailable";
import ServerError500 from "../screens/errroPages/serverError";
import ErrorEmailTimeoutPage from "../screens/errroPages/timeout419";
import Error401Page from "../screens/errroPages/unauthorized401";



//App info
import Terms from "../screens/Terms&Condition/terms";

function Router() {
  const ProtectedRoute = ({ children }) => {
    const token = Cookies.get("token");
    if (!token) {
      return <Navigate to="/signin" />;
    }
    return children;
  };

  const AuthRoute = ({ children }) => {
    const token = Cookies.get("token");
    if (token) {
      return <Navigate to="/user/groups" />;
    }
    return children;
  };

  

  return (

    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route
            path="/signup"
            element={
              <AuthRoute>
                {" "}
                <SignUp />{" "}
              </AuthRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <AuthRoute>
                {" "}
                <Login />{" "}
              </AuthRoute>
            }
          />
          <Route
            path="/forget-password"
            element={
              <AuthRoute>
                {" "}
                <ForgetPassword />{" "}
              </AuthRoute>
            }
          />
          <Route path="/new-password/:id/:token" element={<NewPassword />} />
          <Route path="/google/auth" element={<Googleauthredirect />} />

          {/* Group Routes */}
          <Route
            path="/user/groups"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create/group"
            element={
              <ProtectedRoute>
                <NewGroup />
              </ProtectedRoute>
            }
          />

          {/* UserEXpenses */}
          <Route
            path="/user/expense"
            element={
              <ProtectedRoute>
                <UserExpense />
              </ProtectedRoute>
            }
          />

          {/* Expense Routes */}
          <Route path="/group/:id" element={<Expenses />} />
          <Route
            path="participantsummary/:groupId/:participantId"
            element={<PartcipantSummary />}
          />
          <Route path="group/:groupId/:expenseId" element={<ExpenseDetail />} />

          {/* Admin */}
          <Route path="/admin/dashboard" element={    <ProtectedRoute> <AdminDashboard /> </ProtectedRoute>    } />
      




              
          {/* {Error UI } */}
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/service-unavailable" element={<ServiceUnavailable />} />
          <Route path="/internal-server-error" element={<ServerError500 />} />
          <Route path="/email-timeout" element={<ErrorEmailTimeoutPage />} />
          <Route path="/unauthorized" element={<Error401Page />} />



         {/* Website Information pages */}
         <Route path="/terms-and-conditions" element={<Terms />} />

        </Routes>
      </BrowserRouter>
    </Provider>

  );
}

export default Router;
