import React from "react";
import Signup from "./Signup";
//import { Container } from "react-bootstrap";
import { AuthContextProvider } from "../contexts/AuthContext";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
//import ReactDOM from "react-dom/client";
import Dashboard from "./Dashboard";
import Login from "./Login";
import ReadTasks from "./ReadTasks";
import Navbar from "./Navbar";
import Calendar from "./Calendar";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
//import { db } from "../firebase";
//import { collection, getDocs } from "firebase/firestore";
//import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import "./App.css";
//import { auth } from "../firebase";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  return (
    <>
      <Router>
        <Navbar />
        <AuthContextProvider>
          <Switch>
            <div
              // class="container"
              className="container d-flex align-items-center justify-content-center"
              style={{ minHeight: "80vh", maxWidth: "500px" }}
            >
              <div className="w-100">
                <PrivateRoute path="/addTask" component={TaskList} />
                <PrivateRoute path="/tasks" component={ReadTasks} />
                <PrivateRoute path="/calendar" component={Calendar} />
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute
                  path="/update-profile"
                  component={UpdateProfile}
                />

                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                ></Route>
              </div>
            </div>
          </Switch>
        </AuthContextProvider>
      </Router>
    </>
  );
}

export default App;
// export default function PrivateRoute({ children }) {
//   const { currentUser } = useAuth();

//   return currentUser ? children : <Navigate to="/login" />;
// }
