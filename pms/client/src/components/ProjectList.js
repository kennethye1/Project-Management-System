import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import ProjectAPI from "../api/ProjectAPI";
import { ProjectContext } from "../context/ProjectContext";
import Update from "./Update";

const ProjectList = (props) => {
  const { projects, setProjects } = useContext(ProjectContext);
  let history = useHistory();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await ProjectAPI.get("/");
        setProjects(response.data.data.project);
        console.log(response);
      } catch (error) {
        console.error(error, error.stack);
      }
    };
    getData();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await ProjectAPI.delete(`/${id}`);
      setProjects(
        projects.filter((proj) => {
          return proj.id !== id;
        })
      );
    } catch (error) {
      console.error(error, error.stack);
    }
  };

  const handleProjectPage = (id) => {
    history.push(`/projects/${id}`);
  };
  return (
    <div className="list-group container">
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Project</th>
            <th scope="col">Description</th>
            <th scope="col">Progress</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>

        <tbody>
          {projects &&
            projects.map((proj) => {
              return (
                <tr onClick={() => handleProjectPage(proj.id)} key={proj.id}>
                  <td>{proj.name}</td>
                  <td>{proj.description}</td>
                  <td>{proj.progress}</td>
                  <td>
                    <Update proj={proj} />
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(e, proj.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
