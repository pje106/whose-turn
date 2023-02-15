import React from "react";
import Signup from "./Signup";
import { AuthContextProvider } from "../contexts/AuthContext";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Navbar from "./Navbar";
import Calendar from "./Calendar";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import TaskList from "./TaskList";
import "./App.css";
import { useState } from "react";
//import MusicPlayer from "./MusicPlayer";

const App = () => {
  const [backgroundImage, setBackgroundImage] = useState(
    "https://img.freepik.com/free-vector/white-abstract-background_23-2148810113.jpg?size=626&ext=jpg&ga=GA1.2.271233852.1672961310&semt=ais"
  );

  const handleChange = (event) => {
    setBackgroundImage(event.target.value);
  };


  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: '100%',
    
        }}
      >
        <Router>
          <Navbar />
          <div  className="backgroudImage">
            <h6>Change the Background Image</h6>
            <input type="text" onChange={handleChange} style={{}} />
          </div>

          <AuthContextProvider>
            <Switch>
              <div
                // class="container"
                className="container d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh", maxWidth: "500px" }}
              >
                <div className="w-100" style={{ minHeight: "80vh" }}>
                  <PrivateRoute path="/addTask" component={TaskList} />
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
                        <TaskList />
                        <Dashboard />
                      </PrivateRoute>
                    }
                  ></Route>
                </div>
              </div>
            </Switch>
          </AuthContextProvider>
        </Router>
      </div>
    </>
  );
};

export default App;
