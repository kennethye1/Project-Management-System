import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ProjectProvider from "./context/ProjectContext";
import Home from "./routes/Home";
import Project from "./routes/Project";
import Register from "./routes/Register";
import Login from "./routes/Login";
import UserAPI from "./api/UserAPI";
function App() {
  const [isAuth, setAuth] = useState(false);

  const hasToken = async () => {
    try {
      const response = await UserAPI.get("/is-auth", {
        headers: { token: localStorage.token },
      });
      response.data === true ? setAuth(true) : setAuth(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    hasToken();
  }, []);
  return (
    <ProjectProvider>
      <div>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) =>
                isAuth ? (
                  <Home {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/projects/:id"
              render={(props) =>
                isAuth ? (
                  <Project {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/login"
              render={(props) =>
                !isAuth ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={(props) =>
                !isAuth ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </Router>
      </div>
    </ProjectProvider>
  );
}

export default App;
