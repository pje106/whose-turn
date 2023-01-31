import React from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthContextProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Tasks from "./Tasks";
import Navbar from "./Navbar";
import Calendar from "./Calendar";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import BoardForm from "./TaskForm";

function App() {
  return (
    <>
      <Navbar />
      {/* <Calendar /> */}
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Router>
            <AuthContextProvider>
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute
                  path="/update-profile"
                  component={UpdateProfile}
                />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/addTask" component={BoardForm} />
                <Route path="/tasks" component={Tasks} />
                <Route path="/calendar" component={Calendar} />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                ></Route>
              </Switch>
            </AuthContextProvider>
          </Router>
        </div>
      </Container>
    </>
  );
}

export default App;
// export default function PrivateRoute({ children }) {
//   const { currentUser } = useAuth();

//   return currentUser ? children : <Navigate to="/login" />;
// }
