import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProjectProvider from "./context/ProjectContext";
import Home from "./routes/Home";
import Project from "./routes/Project";

function App() {
  return (
    <ProjectProvider>
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/projects/:id" component={Project} />
          </Switch>
        </Router>
      </div>
    </ProjectProvider>
  );
}

export default App;
