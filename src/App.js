import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Sidebar from "./components/navigation/Sidebar";
import Chat from "./components/chat/Chat";
import Login from "./components/Login";
import {useStateValue} from "./context/StateProvider";

function App() {
  const [{ user }] = useStateValue();

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login/>
        ) : (
          <>
            <Header/>
            <div className="app__body">
              <Sidebar/>
              <Switch>
                <Route path="/room/:roomId">
                  <Chat/>
                </Route>
                <Route path="/">
                  <Redirect to="/room/dHGaidvCoT5Joakos3gD" />
                </Route>
              </Switch>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
