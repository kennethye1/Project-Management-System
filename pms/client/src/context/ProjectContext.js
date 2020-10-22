import React, { useState } from "react";

export const ProjectContext = React.createContext();

export const ProjectProvider = (props) => {
  const [projects, setProjects] = useState([]);
  const [selectedProj, setSelectedProj] = useState(null);

  const createProject = (proj) => {
    setProjects([...projects, proj]);
  };
  return (
    <ProjectContext.Provider
      value={{
        projects,
        setProjects,
        createProject,
        selectedProj,
        setSelectedProj,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;
