import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login";
import UserContext from "./contexts/userContext.js";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="app">
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          {!user ? (
            <React.Fragment>
              {/* Redirect for sake of persistent URL -> it showed the last room id when logging in */}
              <Redirect to="/" />
              <Login /> {/*couldve just sent "setUser" as a prop here*/}
            </React.Fragment>
          ) : (
            <div className="app__body">
              <Sidebar />
              <Switch>
                <Route path="/room/:roomId">
                  {/* roomId is a wildcard */}
                  <Chat />
                </Route>

                <Route path="/">
                  {/*Default route - empty chat window */}

                  <Chat />
                  {console.log("Default Match")}
                </Route>
              </Switch>
            </div>
          )}
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
