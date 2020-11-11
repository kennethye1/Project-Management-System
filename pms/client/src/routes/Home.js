import React from "react";
import CreateProject from "../components/CreateProject";
import Header from "../components/Header";
import ProjectList from "../components/ProjectList";

const Home = ({ setAuth }) => {
  return (
    <div>
      <Header setAuth={setAuth} />
      <CreateProject />
      <ProjectList />
    </div>
  );
};

export default Home;
