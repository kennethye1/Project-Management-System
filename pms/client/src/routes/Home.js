import React from "react";
import CreateProject from "../components/CreateProject";
import Header from "../components/Header";
import ProjectList from "../components/ProjectList";

const Home = () => {
  return (
    <div>
      <Header />
      <CreateProject />
      <ProjectList />
    </div>
  );
};

export default Home;
