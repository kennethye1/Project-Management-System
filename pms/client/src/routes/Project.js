import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ProjectAPI from "../api/ProjectAPI";
import { ProjectContext } from "../context/ProjectContext";
import ProgressBars from "../components/ProgressBars";
import TaskCards from "../components/TaskCards";
import AddTask from "../components/AddTask";
const Project = () => {
  const { id } = useParams();
  const { selectedProj, setSelectedProj } = useContext(ProjectContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProjectAPI.get(`/${id}`);
        setSelectedProj(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(error, error.stack);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="display-1 text-center font-weight-light">
        {selectedProj && selectedProj.project && selectedProj.project.name}
      </h1>
      <div className="m-2">
        {selectedProj && <ProgressBars value={{ total: 5, finished: 4 }} />}
      </div>

      <div className="container p-6 text-center">
        <AddTask />
      </div>

      <div className="container">
        <div className="row row-cols-3">
          <div className="col">
            <TaskCards task={{ title: "TODOs" }} />
          </div>
          <div className="col">
            <TaskCards task={{ title: "Bugs" }} />
          </div>
          <div className="col">
            <TaskCards task={{ title: "Completed" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
